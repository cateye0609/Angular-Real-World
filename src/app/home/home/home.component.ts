import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticleQueryOption } from 'src/app/_model/article-list-config.model';
import { ArticleService } from 'src/app/_service/article.service';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tags: string[];
  loading_tags = false;
  list_query_options: ArticleQueryOption;
  is_logged_in: boolean;
  authState_subscription: Subscription;

  constructor(
    private articleService: ArticleService,
    private authService: AuthService,
    private router: Router
  ) {
    this.tags = [];
    this.list_query_options = {
      type: 'all',
      option: {}
    } as ArticleQueryOption;
  }

  ngOnInit(): void {
    this.getAuthState();
    this.getTags();
  }

  getTags() {
    this.loading_tags = true;
    this.articleService.getTags().subscribe(
      res => {
        this.tags = res.tags;
        this.loading_tags = false;
      }
    )
  }

  // get articles
  getArticles(type: string = '', options: Object = {}) {
    if (type === 'feed' && !this.is_logged_in) {
      this.router.navigate(['/login']);
      return;
    }

    this.list_query_options = {
      type: type,
      option: options
    }
  }

  // get auth state
  getAuthState() {
    this.authState_subscription = this.authService.logged_in$.subscribe(
      auth => {
        this.is_logged_in = auth;

        if (auth) {
          this.getArticles('feed');
        } else {
          this.getArticles('all');
        }
      }
    );
  }

  ngOnDestroy() {
    this.authState_subscription.unsubscribe();
  }
}
