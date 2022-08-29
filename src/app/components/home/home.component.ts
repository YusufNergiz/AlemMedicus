import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import { doc, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  archive: any[] = []

  constructor(private afs: AngularFirestore, private firestore: Firestore, private router: Router) { 
    afs.collection('archive').valueChanges()
    .subscribe(item => {
      this.archive = item
    })
  }

  ngOnInit(): void {
  }

  navigateToNews(newsId: String) {
    this.router.navigate([`/archive/${newsId}`])
  }

  navigateToArchive() {
    this.router.navigate(['/all-news'])
  }

}
