import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css']
})
export class StudentsTableComponent implements OnInit {

  students: Observable<any>

  constructor(private afs: AngularFirestore) { 
    this.students = afs.collection('students').valueChanges()
  }

  ngOnInit(): void {
  }

}
