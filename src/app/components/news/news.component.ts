import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { doc, getDoc } from "firebase/firestore";


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

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
      this.fetchNewsData()
  }

  async fetchNewsData() {
    this.currentNewsId = this.activatedRoute.snapshot.paramMap.get('newsId');
    await this.afs.collection('news').doc(this.currentNewsId).ref.get().then((doc) => {
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

  navigateToNews(newsId: String) {
    this.router.navigate([`/archive/${newsId}`])
  }

  navigateToArchive() {
    this.router.navigate(['/all-news'])
  }

}
