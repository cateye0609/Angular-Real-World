import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArticleService } from 'src/app/_service/article.service';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tags: string[];
  is_logged_in: boolean;
  authState_subscription: Subscription;

  constructor(
    private articleService: ArticleService,
    private authService: AuthService
  ) {
    this.tags = [];
  }

  ngOnInit(): void {
    this.getAuthState();
    this.getTags();
  }

  getTags() {
    this.articleService.getTags().subscribe(
      res => this.tags = res.tags
    )
  }

  // get auth state
  getAuthState() {
    this.authState_subscription = this.authService.logged_in$.subscribe(res => this.is_logged_in = res)
  }

  ngOnDestroy() {
    this.authState_subscription.unsubscribe();
  }
}
