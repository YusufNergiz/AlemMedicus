import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  news: Observable<any>

  constructor(private fbs: AngularFirestore) {
    this.news = fbs.collection('news').valueChanges()
   }

  getNews() {
    return this.fbs.collection('news').snapshotChanges();
  }

}
