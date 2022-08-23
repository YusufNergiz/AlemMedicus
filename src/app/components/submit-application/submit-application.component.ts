import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-submit-application',
  templateUrl: './submit-application.component.html',
  styleUrls: ['./submit-application.component.css']
})
export class SubmitApplicationComponent implements OnInit {

  studentFormToggled: boolean = true; 

  doctorFormToggled: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  studentFormToggle() {
    this.studentFormToggled = true
    this.doctorFormToggled = false
  }

  doctorFormToggle() {
    this.doctorFormToggled = true
    this.studentFormToggled = false
  }

}
