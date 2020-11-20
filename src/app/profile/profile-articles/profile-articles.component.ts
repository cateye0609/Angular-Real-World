import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleQueryOption } from 'src/app/_model/article-list-config.model';
import { ArticleService } from 'src/app/_service/article.service';

@Component({
  selector: 'app-profile-articles',
  templateUrl: './profile-articles.component.html',
  styleUrls: ['./profile-articles.component.css']
})
export class ProfileArticlesComponent implements OnInit {
  query_options: ArticleQueryOption;
  private username: string;
  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute
  ) {
    this.query_options = { option: {} } as ArticleQueryOption;
  }

  ngOnInit(): void {
    this.getUsername();
  }

  getUsername() {
    this.activatedRoute.parent.params.subscribe(params => {
      this.username = params['username'];
      this.query_options.option.author = this.username;
    });
  }
}
