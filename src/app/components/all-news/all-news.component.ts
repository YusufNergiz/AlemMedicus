import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.css']
})
export class AllNewsComponent implements OnInit {

archive!: Observable<any>

  constructor(private afs: AngularFirestore, private router: Router, private spinner: NgxSpinnerService) {
    spinner.show()
   }

  ngOnInit(): void {
    this.fetchArchiveData()
  }

  async fetchArchiveData() {
    this.archive = this.afs.collection('archive').valueChanges()
    await this.spinner.hide()
  }

  navigateToArchiveNews(newsId: string) {
    this.router.navigate([`/archive/${newsId}`])
  }

}
