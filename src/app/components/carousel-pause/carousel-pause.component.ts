import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { NgbCarousel, NgbCarouselConfig, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-carousel-pause',
  templateUrl: './carousel-pause.component.html',
  styleUrls: ['./carousel-pause.component.css']
})
export class CarouselPauseComponent implements OnInit {

  news: Observable<any>

  showNavigationArrows = false;
  showNavigationIndicators = false;
  newsImages = []

  constructor(config: NgbCarouselConfig, private fbs: AngularFirestore, private router: Router) {
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
    this.news = fbs.collection('news').valueChanges()
   }

  ngOnInit(): void {
  }

  navigateToNews(newsId: string) {
    this.router.navigate([`/news/${newsId}`])
  }

}
