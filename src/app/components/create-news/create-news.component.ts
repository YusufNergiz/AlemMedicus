import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { ref, uploadBytesResumable, getDownloadURL } from "@angular/fire/storage";
import { Storage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { News } from 'src/app/news';
import { serverTimestamp } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {

  canPublish: boolean = false;
  newsImage = []
  newsTitle: string = '';
  newsContent: string = '';

  url: any;
  replaceImage: boolean = false;

  defaultImage: string = 'assets/images/imageUploadTab.png'

  file: any = {}

  constructor(private router: Router, private toast: ToastService, public storage: Storage, private afs: AngularFirestore) { }

  ngOnInit(): void {
  }

  chooseFile(event: any) {
    this.file = event.target.files[0];
  }

  allowPublish() {
    if (this.newsImage.length > 0 && this.newsTitle !== '' && this.newsContent !== '') {
      this.canPublish = true
    }
    else {
      this.canPublish = false
    }
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

  goBack() {
    this.router.navigateByUrl('/admin')
  }

  cancelNewsPublish() {
    this.router.navigate(['/admin'])
  }

  uploadNewsToFirestore(news: News) {
    return this.afs.collection('news').doc(news.newsId).set(news);
  }

  uploadImage() {
    const storageRef = ref(this.storage, `images/${this.file.name}`);
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
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        this.toast.error("User doesn't have permission to access the object")
        break;
      case 'storage/canceled':
        this.toast.error("User canceled the upload")
        break;

      // ...

      case 'storage/unknown':
        this.toast.error("Unknown error occurred, inspect error.serverResponse")
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      const newsObject = {
        title: this.newsTitle,
        content: this.newsContent,
        imageUrls: downloadURL,
        date: serverTimestamp(),
        newsId: uuid()
      }
      this.uploadNewsToFirestore(newsObject)
      this.router.navigate(['/'])
      this.toast.success("News successfully has been uploaded!")
    });
  }
);

  }

}
