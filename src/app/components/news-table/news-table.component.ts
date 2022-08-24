import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-news-table',
  templateUrl: './news-table.component.html',
  styleUrls: ['./news-table.component.css']
})
export class NewsTableComponent implements OnInit {

  news: Observable<any>

  constructor(private fbs: AngularFirestore) { 
    this.news = fbs.collection('news').valueChanges()
  }

  ngOnInit(): void {
  }

}
