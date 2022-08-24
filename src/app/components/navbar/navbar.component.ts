import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { Event } from '@angular/router';
import { onAuthStateChanged } from "firebase/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastService } from 'angular-toastify';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentRoute!: string; 

  constructor(private newsService: NewsService, private router: Router, private afs: AngularFireAuth, private toast: ToastService, private user: UserService) { 
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) { 
        this.currentRoute = event.url
      }
    })
  }

  ngOnInit(): void {
  }

  logOut() {
    this.user.logout()
  }

}

//  Getting the currently logged in User

// this.afs.onAuthStateChanged((user) => {
//   if (user) {
//     this.toast.success(`${user.displayName}`)
//   }
//   else {
//     this.toast.error(`User not found`)
//   }
// })