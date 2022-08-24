import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder, private toast: ToastService) { }



  frmPasswordReset: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]]
  })  

  sendPasswordResetEmail() {

    const email = this.frmPasswordReset.controls['email'].value;

    this.afAuth.sendPasswordResetEmail(email).then(
      () => {
        this.toast.success(`Password reset link has been sent to ${email}`)
      },
      error => {
        this.toast.error("Cannot send Password reset link!")
      }
    )

  }

  



  ngOnInit(): void {
  }

}
