import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Article } from 'src/app/_model/article.model';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnChanges {
  @Input() max: number;
  @Input() articles: Article[];
  loading = true;
  constructor() { }

  ngOnChanges(): void {
    this.loading = false;
  }

}
