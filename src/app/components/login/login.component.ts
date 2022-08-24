import { Component, OnInit } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  showPassword: boolean = false;

  constructor(private userService : UserService, private toast: ToastService) { }

  ngOnInit(): void {
  }

  login() {

    if (this.email === '') {
      this.toast.error('Please enter Email')
      return
    }
    if (this.password === '') {
      this.toast.error('Please enter Password')
      return
    }

    this.userService.login(this.email, this.password)

    this.email = ''
    this.password = ''
  }

  showPasswordToggle() {
    this.showPassword = !this.showPassword
  }

}
