import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/_model/article.model';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {
  @Input() max: number;
  @Input() articles: Article[];
  
  constructor() { }

  ngOnInit(): void { }

}
