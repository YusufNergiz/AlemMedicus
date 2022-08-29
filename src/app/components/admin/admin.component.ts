import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  archiveLinkToggled: boolean = false;
  activeLinkToggled: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toggleArchiveLink() {
    this.archiveLinkToggled = true
    this.activeLinkToggled = false
  }

  toggleActiveLink() {
    this.activeLinkToggled = true
    this.archiveLinkToggled = false
  }
  
  createNewsPage() {
    this.router.navigateByUrl('/create-news')
  }

}
