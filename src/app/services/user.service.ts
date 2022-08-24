import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore, private fireauth: AngularFireAuth, private router: Router, private toast: ToastService) { }


  login(email: string, password: string){
    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      this.toast.success("Successfully Logged In!")
      this.router.navigate(['/'])
    }, error => {
      this.toast.error("Incorrect Credentials!")
      this.router.navigate(['/login'])
    })
  }

  logout() {
    this.fireauth.signOut().then(() => {
      this.router.navigate(['/login'])
    }, error => {
      this.toast.error("Something went wrong!")
    })
  }

  addUser(user: User) {
    return this.afs.collection('users').doc(user.id).set(user);
  }

  // Register ||
  //          vv
  // register(username: string, email: string, password: string) {
  //   this.fireauth.createUserWithEmailAndPassword(email, password).then((user) => {
  //     this.addUserToFirestore(username, email, user.user?.uid)
  //     this.toast.success(`Registration is successfull!`)
  //     this.router.navigate(['/login'])
  //     user.user?.updateProfile({displayName: username})
  //   }, error => {
  //     this.toast.error("Can't Register!")
  //     this.router.navigate(['/register'])
  //   })
  // }

  // addUserToFirestore(username: string, email: string, id: any) {
  //   const userObject = {
  //     username: '',
  //     email: '',
  //     id: ''
  //   }

  //   userObject.username = username
  //   userObject.email = email
  //   userObject.id = id

  //   this.user.addUser(userObject)

  // }

}
