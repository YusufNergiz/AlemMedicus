import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-archive-table',
  templateUrl: './archive-table.component.html',
  styleUrls: ['./archive-table.component.css']
})
export class ArchiveTableComponent implements OnInit {

  news: Observable<any>
  inputValue?: string;
  filteredOptions: string[] = [];
  options: any[] = [];

  constructor(private afs: AngularFirestore, private router: Router) {
    this.news = afs.collection('archive').valueChanges()
    this.news.subscribe((news) => {
      news.map((n: any) => {
        this.options.push(n.title)
      })
    })
    this.filteredOptions = this.options;
   }

  ngOnInit(): void {
  }

  navigateToUpdateArchive(newsId: string) {
    this.router.navigate([`update-archive/${newsId}`])
  }

  onChange(value: string): void {
    this.filteredOptions = this.options.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

}
