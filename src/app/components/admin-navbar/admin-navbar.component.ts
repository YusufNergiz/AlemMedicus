import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  studentsDataPageEnabled: boolean = false
  newsDataPageEnabled: boolean = true

  constructor() { }

  @Output() newsDataEnabled: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() studentsDataEnabled: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  // Student Data Logo
  studentDataPageEnabledForNavbar: boolean = false
  studentDataPageEnabledImage = "assets/images/studentPageEnabled.png"
  studentDataPageDisabledImage = "assets/images/adminNavbarStudentsLogo.png"
  //

  // News Data Logo
  newsDataPageEnabledForNavbar: boolean = true
  newsDataPageEnabledImage = "assets/images/adminNavbarNewsLogo.png"
  newsDataPageDisabledImage = "assets/images/newsPageDisabled.png"
  //

  ngOnInit(): void {
  }

  toggleStudentsDataPage() {
    this.studentsDataEnabled.emit()
  }

  toggleStudentDataPageInNavbar() {
    this.studentDataPageEnabledForNavbar = true
    this.newsDataPageEnabledForNavbar = false
  }

  toggleNewsDataPageInNavbar() {
    this.newsDataPageEnabledForNavbar = true
    this.studentDataPageEnabledForNavbar = false
  }

  toggleNewsDataPage() {
    this.newsDataEnabled.emit()
  }

}
