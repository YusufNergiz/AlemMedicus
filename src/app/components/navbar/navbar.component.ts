import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { Event } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentRoute!: string;

  constructor(private newsService: NewsService, private router: Router) { 
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) { 
        this.currentRoute = event.url
      }
    })
  }

  ngOnInit(): void {
  }

}
