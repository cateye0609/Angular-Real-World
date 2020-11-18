import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/_model/article.model';

@Component({
  selector: 'app-profile-articles',
  templateUrl: './profile-articles.component.html',
  styleUrls: ['./profile-articles.component.css']
})
export class ProfileArticlesComponent implements OnInit {
  @Input() max: number;
  @Input() articles: Article[];
  constructor() { }

  ngOnInit(): void { }

}
