import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  archive: any[] = []

  constructor(private afs: AngularFirestore, private firestore: Firestore, private router: Router, private spinner: NgxSpinnerService) { 
    spinner.show()
  }

  ngOnInit(): void {
    this.fetchArchiveData()
  }

  fetchArchiveData() {
    this.afs.collection('archive').valueChanges()
    .subscribe(item => {
      this.archive = item
      this.spinner.hide()
    })
  }

  navigateToNews(newsId: String) {
    this.router.navigate([`/archive/${newsId}`])
  }

  navigateToArchive() {
    this.router.navigate(['/all-news'])
  }

}
