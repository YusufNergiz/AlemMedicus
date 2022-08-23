import { Component, OnInit } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private newsService: NewsService, private toast: ToastService) { }

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

    this.newsService.login(this.email, this.password)

    this.email = ''
    this.password = ''
  }

}
