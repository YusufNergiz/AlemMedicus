import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { StudentsTableComponent } from '../students-table/students-table.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  archiveLinkToggled: boolean = false;
  activeLinkToggled: boolean = true;

  studentsDataPageEnabled: boolean = false
  newsDataPageEnabled: boolean = true

  constructor(private router: Router, private user: UserService) { }

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

  @ViewChild(StudentsTableComponent) child:StudentsTableComponent | undefined;

  exportStudentDataAsExcel() {
    this.child?.exportAsXLSX()
  }

  logOut() {
    this.user.logout()
  }

}
