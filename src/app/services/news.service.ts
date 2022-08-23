import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(public fireauth: AngularFireAuth, private router: Router, private toast: ToastService) { }

  login(email: string, password: string){
    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      this.toast.success("Successfully Logged In!")
      this.router.navigate(['/'])
    }, error => {
      this.toast.error("Incorrect Credentials!")
      this.router.navigate(['/login'])
    })
  }

  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {
      this.toast.success("Registration is successfull!")
      this.router.navigate(['/login'])
    }, error => {
      this.toast.error("Can't Register!")
      this.router.navigate(['/register'])
    })
  }

  logout() {
    this.fireauth.signOut().then(() => {
      this.router.navigate(['/login'])
    }, error => {
      this.toast.error("Something went wrong!")
    })
  }

}
