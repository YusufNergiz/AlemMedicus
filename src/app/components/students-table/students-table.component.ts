import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ExcelServiceService } from 'src/app/services/excel-service.service';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css']
})
export class StudentsTableComponent implements OnInit {

  selectNumber1: string = "firstName"
  selectNumber2: string = "lastname"
  selectNumber3: string = "fatherName"
  selectNumber4: string = "gender"
  selectNumber5: string = "iin"
  selectNumber6: number = 0

  students: Observable<any>

  allStudents: any[] = []

  // Serach Bar
  inputValue?: string;
  filteredOptions: any[] = [];
  options: any[] = [];
  //

  studentDataFields = [{label: "Имя", value: "firstName"},
   {label: "Фамилия", value: "lastname"},
   {label: "Отчество", value: "fatherName"},
   {label: "Пол", value: "gender"},
   {label: "ИИН", value: "iin"},
   {label: "Университет", value: "university"},
   {label: "Специальность", value: "occupation"},
   {label: "Курс", value: "course"},
   {label: "GPA", value: "gpa"},
   {label: "Город", value: "city"},
   {label: "Школа", value: "school"},
   {label: "Уровень английского", value: "englishLevel"},
   {label: "Номер телефона", value: "phoneNumber"},
   {label: "Электронная почта", value: "email"},
   {label: "Дополнительная информация", value: "additionalQuestion"}
  ]

  studentFileDataFields = [
    {label: "Удост. личности", value: 0},
    {label: "Транскрипт", value: 1},
    {label: "Достижения за последние 3 года", value: 2},
    {label: "Сертификат английского языка", value: 3},
    {label: "Социальное положение", value: 4},
    {label: "Эссе", value: 5},
  ]

  firstValue!: any;

  constructor(private afs: AngularFirestore, private excelService:ExcelServiceService) { 
    this.students = afs.collection('students').valueChanges()
    this.students.subscribe((students) => {
      students.map((student: any) => {
        this.options.push(student.iin)
        this.allStudents.push({
          "Имя": student.firstName,
          "Фамилия": student.lastname,
          "Отчество": student.fatherName,
          "Пол": student.gender,
          "ИИН": student.iin,
          "Университет": student.university,
          "Специальность": student.occupation,
          "Курс": student.course,
          "GPA": student.gpa,
          "Город": student.city,
          "Школа": student.school,
          "Уровень английского": student.englishLevel,
          "Номер телефона": student.phoneNumber,
          "Электронная почта": student.email,
        })
      })
    })
    this.filteredOptions = this.options;
    }

  ngOnInit(): void {
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.allStudents, 'students_data');
  }

  onChange(value: string): void {
    this.filteredOptions = this.options.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

}
