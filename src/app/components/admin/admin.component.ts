import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { StudentsTableComponent } from '../students-table/students-table.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminComponent implements OnInit {

  archiveLinkToggled: boolean = false;
  activeLinkToggled: boolean = true;

  studentsDataPageEnabled: boolean = false
  newsDataPageEnabled: boolean = true

  searchBarValue: any;

  constructor(private router: Router, private user: UserService) {
   }

  ngOnInit(): void {
  }

  toggleArchiveLink() {
    this.archiveLinkToggled = true
    this.activeLinkToggled = false
  }

  toggleActiveLink() {
    this.activeLinkToggled = true
    this.archiveLinkToggled = false
  }
  
  createNewsPage() {
    this.router.navigateByUrl('/create-news')
  }
  
  newDataPageToggle() {
    this.newsDataPageEnabled = true
    this.studentsDataPageEnabled = false
  }

  studentsDataPageToggle() {
    this.studentsDataPageEnabled = true
    this.newsDataPageEnabled = false  
  }

  @ViewChild(StudentsTableComponent) studentTableChild:StudentsTableComponent | undefined;

  exportStudentDataAsExcel() {
    this.studentTableChild?.exportAsXLSX()
  }

  logOut() {
    this.user.logout()
  }

}
