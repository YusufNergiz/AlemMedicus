import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.css']
})
export class AllNewsComponent implements OnInit {

archive: Observable<any>

  constructor(private afs: AngularFirestore, private router: Router) {
    this.archive = afs.collection('archive').valueChanges()
   }

  ngOnInit(): void {
  }

  navigateToArchiveNews(newsId: string) {
    this.router.navigate([`/archive/${newsId}`])
  }

}
