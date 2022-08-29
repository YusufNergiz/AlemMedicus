import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private fbs: AngularFirestore) {
    
   }

  getNews() {
    return this.fbs.collection('news').snapshotChanges();
  }

}
