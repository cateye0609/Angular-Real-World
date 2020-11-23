import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ArticleQueryOption } from 'src/app/_model/article-list-config.model';
import { Article } from 'src/app/_model/article.model';
import { ArticleService } from 'src/app/_service/article.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnChanges {
  @Input() options: ArticleQueryOption;
  @Input() limit: number;

  articles: Article[];
  loading = false;
  total_pages: number = 0;

  constructor(
    private articleService: ArticleService
  ) { }

  ngOnChanges(): void {
    this.onLoad();
  }
  onLoad() {
    if (this.limit) {
      this.options.option.limit = this.limit;
      this.options.option.offset = 0;
    }
    this.getArticles(this.options);
  }

  getArticles(options: ArticleQueryOption) {
    this.loading = true;
    this.articleService.getArticlesList(options).subscribe(
      res => {
        this.loading = false;
        this.articles = res.articles;
        this.total_pages = Math.ceil(res.articlesCount / this.limit);
      }
    )
  }

  changePage(page: number) {
    this.options.option.offset = (page - 1) * this.limit;
    this.getArticles(this.options);
  }

  favoriteClicked(article: Article) {
    if (article.favorited) {
      this.articleService.unfavoriteArticle(article.slug).subscribe(
        res => {
          article.favorited = false;
          article.favoritesCount--;
        }
      )
    } else {
      this.articleService.favoriteArticle(article.slug).subscribe(
        res => {
          article.favorited = true;
          article.favoritesCount++;
        }
      )
    }
  }
}
