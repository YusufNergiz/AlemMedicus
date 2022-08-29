import { Component, OnInit } from '@angular/core';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  genders = [{value: 'male', label: 'Ep'}, {value: 'female', label: 'Қыз'}]

  date!: string;
// First Page Input Values
  firstName!: string;
  lastName!: string;
  fatherName!: string;
  gender!: string;
  iin!: number;
  idImage: any;
  
//
  countries = [
    { code: "+7", name: "Kazakhstan" },
    { code: "+12", name: "United States" },
    { code: "+13", name: "Australia" },
    { code: "+14", name: "Canada" },
    { code: "+15", name: "Brazil" },
    { code: "+16", name: "England" }
  ];
  selectedValue: any;

  constructor(private msg: NzMessageService) { }

  ngOnInit(): void {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.date = dd + '/' + mm + '/' + yyyy;
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file);
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }


}
