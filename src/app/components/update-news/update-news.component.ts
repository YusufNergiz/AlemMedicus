import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import { ToastService } from 'angular-toastify';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Storage } from '@angular/fire/storage';
import { doc, serverTimestamp, updateDoc, deleteDoc, setDoc, collection } from "firebase/firestore";
import { from } from 'rxjs';



@Component({
  selector: 'app-update-news',
  templateUrl: './update-news.component.html',
  styleUrls: ['./update-news.component.css']
})
export class UpdateNewsComponent implements OnInit {

  replaceImage: boolean = false;

  url: any;

  currentNewsId!: any;

  news: any;

  defaultImage!: string;

  file: any;

  loading: boolean = true;


  newsTitle!: string;
  newsContent!: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private afs: AngularFirestore, private firestore: Firestore, private toast: ToastService, private storage: Storage) {
   }

  ngOnInit(): void {
    this.fetchNewsData()
  }

  async fetchNewsData() {
    this.currentNewsId = this.activatedRoute.snapshot.paramMap.get('newsId');
    await this.afs.collection('news').doc(this.currentNewsId).ref.get().then((doc) => {
      if (doc.exists) {
        this.news = doc.data()
        this.defaultImage = this.news.imageUrls
        this.newsTitle = this.news.title
        this.newsContent = this.news.content
        this.loading = false
      }
      else {
        this.toast.error("No News Found!")
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  selectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.toast.error("Please Select an Image!")
      return
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.toast.error("Only Images are supported!")
			return;
		}

    var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
			this.url = reader.result; 
      this.replaceImage = true;
		}
  }

  chooseFile(event: any) {
    this.file = event.target.files[0];
  }


  goBack() {
    this.router.navigate(['/admin'])
  }

  cancelNewsUpdate() {
    this.router.navigate(['/admin'])
  }

  async deleteNews() {
    await deleteDoc(doc(this.firestore, 'news', this.news.newsId))
    this.router.navigate(['/admin'])
    this.toast.success("News Successfully Deleted!")

  }

   async sendNewsToArchive() {
    const docRef = await setDoc(doc(this.firestore, 'archive', this.news.newsId), {
      title: this.newsTitle,
      content: this.newsContent,
      imageUrl: this.defaultImage,
      date: serverTimestamp(),
      newsId: this.news.newsId
    })
    await deleteDoc(doc(this.firestore, 'news', this.news.newsId))
    this.router.navigate(['/admin'])
    this.toast.success("News Successfully added to Archive")
  }

  updateNewsImage() {

    const storageRef = ref(this.storage, 'images/' + this.file.name);
    const uploadTask = uploadBytesResumable(storageRef, this.file);

    uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    switch (error.code) {
      case 'storage/unauthorized':
        this.toast.error("User doesn't have permission to access the object")
        break;
      case 'storage/canceled':
        this.toast.error("User canceled the upload")
        break;
      case 'storage/unknown':
        this.toast.error("Unknown error occurred, inspect error.serverResponse")
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      const ref = doc(this.firestore, 'news', this.news.newsId)
      return from(updateDoc(ref, {
        imageUrls: downloadURL,
        title: this.newsTitle,
        content: this.newsContent,
        date: serverTimestamp()
      }))}
    )
    this.router.navigate(['/admin'])
    this.toast.success("News Successfully Updated")
  }
);
  }

  updateNewsButton() {

    if (this.file) {
      return this.updateNewsImage()
    }
    else {
      const ref = doc(this.firestore, 'news', this.news.newsId)
      return from(updateDoc(ref, {
        title: this.newsTitle,
        content: this.newsContent,
        date: serverTimestamp()
    }))
    }
  }

}
