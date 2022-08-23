import { Component, OnInit } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private newsService: NewsService, private toast: ToastService) { }

  ngOnInit(): void {
  }

  register() {
    if (this.email === '') {
      this.toast.error('Please enter Email')
      return
    }
    if (this.password === '') {
      this.toast.error('Please enter Password')
      return
    }

    this.newsService.register(this.email, this.password)

    this.email = ''
    this.password = ''
  }

}
