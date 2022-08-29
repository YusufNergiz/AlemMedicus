import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  currentNewsId: any;

  news: any;

  loading: boolean = true
  
  archive: any[] = []

  constructor(private activatedRoute: ActivatedRoute, private firestore: Firestore, private afs: AngularFirestore, private toast: ToastService, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    afs.collection('archive').valueChanges()
    .subscribe(item => {
      this.archive = item
    })
  }

  ngOnInit(): void {
    this.fetchArchiveNewsData()
  }

  navigateToNews(newsId: string) {
    this.router.navigate([`/archive/${newsId}`])
  }

  async fetchArchiveNewsData() {
    this.currentNewsId = this.activatedRoute.snapshot.paramMap.get('newsId');
    await this.afs.collection('archive').doc(this.currentNewsId).ref.get().then((doc) => {
      if (doc.exists) {
        this.news = doc.data()
        this.loading = false
      }
      else {
        this.toast.error("News Does Not Exists!!")
        this.router.navigate(['/'])
      }
    })
  }

  navigateToArchive() {
    this.router.navigate(['/all-news'])
  }

}
