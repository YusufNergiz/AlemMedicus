import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  date!: string;

  countries = [
    { code: "+7", name: "Kazakhstan" },
    { code: "+12", name: "United States" },
    { code: "+13", name: "Australia" },
    { code: "+14", name: "Canada" },
    { code: "+15", name: "Brazil" },
    { code: "+16", name: "England" }
  ];
  selectedValue: any;

  constructor() { }

  ngOnInit(): void {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.date = dd + '/' + mm + '/' + yyyy;
  }

}
