import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent implements OnInit {

  @Input() imagePath!: string;
  @Input() newsTitle!: string;
  @Input() uploadTime!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
