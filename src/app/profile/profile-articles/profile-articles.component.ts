import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/_model/article.model';
import { ArticleService } from 'src/app/_service/article.service';

@Component({
  selector: 'app-profile-articles',
  templateUrl: './profile-articles.component.html',
  styleUrls: ['./profile-articles.component.css']
})
export class ProfileArticlesComponent implements OnInit {
  articles: Article[];

  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.getProfileArticles();
  }

  getProfileArticles() {
    this.articleService.getArticlesList(null, localStorage.getItem('username')).subscribe(
      res => this.articles = res.articles
    )
  }
}
