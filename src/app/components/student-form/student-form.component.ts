import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ToastService } from 'angular-toastify';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { uuidv4 } from '@firebase/util';
import { Router } from '@angular/router';


@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  // Student Form all Fields
  studentForm = new FormGroup({
    // Page 1
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    fatherName: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    iin: new FormControl('', [Validators.required]),
    idImage: new FormControl('', [Validators.required]),
    idImageSource: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    // Page 2
    university: new FormControl('', [Validators.required]),
    occupation: new FormControl('', [Validators.required]),
    course: new FormControl('', [Validators.required]),
    gpa: new FormControl('', [Validators.required]),
    transcriptImage: new FormControl('', [Validators.required]),
    transcriptImageSource: new FormControl('', [Validators.required]),
    achievementsImage: new FormControl('', [Validators.required]),
    achievementsImageSource: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    school: new FormControl('', [Validators.required]),
    // Page 3
    englishLevel: new FormControl('', [Validators.required]),
    englishCertificateImage: new FormControl('', [Validators.required]),
    englishCertificateImageSource: new FormControl('', [Validators.required]),
    socialStatusImage: new FormControl(''),
    socialStatusImageSource: new FormControl(''),
    essayImage: new FormControl('', [Validators.required]),
    essayImageSource: new FormControl('', [Validators.required]),
    additionalQuestion: new FormControl('')
  })
  //

  // Image Names for displaying it under the input boxes
  idImageName!: string;
  transcriptImageName!: string;
  achievementsImageName!: string;
  englishCertificateImageName!: string;
  socialStatusImageName!: string;
  essayImageName!: string;
  //

  genders = ['Ep', 'Қыз']
  universities = ['Al-Farabi Kazakh National University', 'Nazarbayev University', 'L.N. Gumilyov Eurasian National University', 'Karaganda State Technical University', 'Satbayev University']
  occupations = ['Student', 'Doctor', 'Nurse', 'Proffessor', 'Unemployed']
  courses = [1, 2, 3, 4, 5]

  selectedValue: any;

  // Conditionally rendering form pages --- Enabled/Disabled
  firstPageEnabled: boolean = true;
  secondPageEnabled: boolean = false;
  thirdPageEnabled: boolean = false;
  fourthPageEnabled: boolean = false;
  //

  ////////////////////
  allImageUrls: any[] = []
  ///////////////////

  constructor(private msg: NzMessageService, private toast: ToastService, private afs: AngularFirestore, private router: Router) { }

  @Output() studentFormFirstPageData: EventEmitter<object> = new EventEmitter()

  ngOnInit(): void { 
  }

  // Conditionally rendering form pages --- Change Form Page
  enableStudentFormPage2() {  // <-- Turning into the second form page
    this.firstPageEnabled = false
    this.secondPageEnabled = true
    this.thirdPageEnabled = false
  }

  enableStudentFormPage1() {
    this.firstPageEnabled = true
    this.secondPageEnabled = false  
  }

  enableStudentFormPage3() {
    this.secondPageEnabled = false
    this.thirdPageEnabled = true
  }

  enableStudentFormPage4() {
    this.firstPageEnabled = false
    this.secondPageEnabled = false
    this.thirdPageEnabled = false
    this.fourthPageEnabled = true
  }
  //

  get f(){
    return this.studentForm.controls;
  }

  navigateToMainPage() {
    this.router.navigate(['/'])
  }

  // Gets the inputted file
  chooseIdImageFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.studentForm.patchValue({
        idImageSource: file
      })
      this.idImageName = file.name
    }
  }
  chooseTranscriptImageFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.studentForm.patchValue({
        transcriptImageSource: file
      })
      this.transcriptImageName = file.name
    }
  }

  chooseAchievementsImageFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.studentForm.patchValue({
        achievementsImageSource: file
      })
      this.achievementsImageName = file.name
    }
  }

  chooseEnglishCertificateImageFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.studentForm.patchValue({
        englishCertificateImageSource: file
      })
      this.englishCertificateImageName = file.name
    }
  }

  chooseSocialStatusImageFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.studentForm.patchValue({
        socialStatusImageSource: file
      })
      this.socialStatusImageName = file.name
    }
  }

  chooseEssayImageFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.studentForm.patchValue({
        essayImageSource: file
      })
      this.essayImageName = file.name
    }
  }
  //
  
  /// These Functions assign the values of the select fields to studentForm FormGroup
  chooseGender(event: any) {
    this.studentForm.patchValue({
      gender: event.target.value
    })
  }

  chooseUniversity(event: any) {
    this.studentForm.patchValue({
      university: event.target.value
    })
  }

  chooseOccupation(event: any) {
    this.studentForm.patchValue({
      occupation: event.target.value
    })
  }

  chooseCourse(event: any) {
    this.studentForm.patchValue({
      course: event.target.value
    })
  }
  //////

  // Function To Upload files to Firebase Storage and get the DownloadUrl
  ////////////////////////////////
  async uplaodImage(fileName: string, file: any) {
    return new Promise((resolve, reject) => {
      const storage = getStorage()

      const storageRef = ref(storage, 'studentData/' + file.name + this.studentForm.get('firstName')?.value)

      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          reject(error)
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              this.toast.error("User doesn't have permission to access the object")
              break;
            case 'storage/canceled':
              this.toast.error("User canceled the upload")
              break;

            // ...

            case 'storage/unknown':
              this.toast.error("Unknown error occurred, inspect error.serverResponse")
              break;
          }
        }, 
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve({fileName: fileName, url: downloadURL})
          });
        }
      );
    })
  }
  ////////////////////////////////

  sendStudentDataToFirestore(id: any, studentData: any) {
    this.afs.collection('students').doc(id).set(studentData)
    this.enableStudentFormPage4()
  }

  // Student Form Submittion
  async onStudentFormSubmit() {
    const allFiles = [{fileName: 'idImage', file: this.studentForm.get('idImageSource')?.value},
     {fileName: "transcriptImage", file: this.studentForm.get('transcriptImageSource')?.value},
      {fileName: "achievementsImage", file: this.studentForm.get('achievementsImageSource')?.value},
       {fileName: "englishCertificateImage", file: this.studentForm.get("englishCertificateImageSource")?.value},
        {fileName: "socialStatusImage", file: this.studentForm.get('socialStatusImageSource')?.value},
         {fileName: "essayImage", file: this.studentForm.get('essayImageSource')?.value,}]
    const fileUrls = await Promise.all([...allFiles].map((file) => this.uplaodImage(file.fileName, file.file)))
    const randomId = uuidv4()

    const studentDataClone = {
      studentId: randomId,
      firstName: this.studentForm.get('firstName')?.value,
      lastname: this.studentForm.get('lastName')?.value,
      fatherName: this.studentForm.get('fatherName')?.value,
      gender: this.studentForm.get('gender')?.value,
      iin: this.studentForm.get('iin')?.value,
      email: this.studentForm.get('email')?.value,
      phoneNumber: this.studentForm.get('phoneNumber')?.value,
      university: this.studentForm.get('university')?.value,
      occupation: this.studentForm.get('occupation')?.value,
      course: this.studentForm.get('course')?.value,
      gpa: this.studentForm.get('gpa')?.value,
      city: this.studentForm.get('city')?.value,
      school: this.studentForm.get('school')?.value,
      englishLevel: this.studentForm.get('englishLevel')?.value,
      additionalQuestion: this.studentForm.get('additionalQuestion')?.value,
      allFiles: fileUrls,
    }

    await this.sendStudentDataToFirestore(randomId, studentDataClone)
  }
  //
  consoleLog() { 
  }

}
