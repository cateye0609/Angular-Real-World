import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/_model/article.model';
import { ArticleService } from 'src/app/_service/article.service';

@Component({
  selector: 'app-profile-favorites',
  templateUrl: './profile-favorites.component.html',
  styleUrls: ['./profile-favorites.component.css']
})
export class ProfileFavoritesComponent implements OnInit {
  articles: Article[];

  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.getProfileFavorites();
  }

  getProfileFavorites() {
    let username = localStorage.getItem('username');
    this.articleService.getArticlesList(null, null, username).subscribe(
      res => this.articles = res.articles
    )
  }
}
