import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/_model/article.model';
import { Profile } from 'src/app/_model/profile.model';
import { ArticleService } from 'src/app/_service/article.service';
import { AuthService } from 'src/app/_service/auth.service';
import { UserService } from 'src/app/_service/user.service';
import { ArticleCommentComponent } from '../article-comment/article-comment.component';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  @ViewChild(ArticleCommentComponent, { static: false }) articleCommentC: ArticleCommentComponent
  is_logged_in: boolean;
  authState_subscription: Subscription;
  article: Article;
  current_user: Profile;
  comment_body: string = "";
  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad() {
    this.article = {} as Article;
    this.getArticle();
    this.getCurrentUser();
    this.getAuthState();
  }

  getArticle() {
    this.activatedRoute.params.subscribe(params => {
      let slug: string = params['slug'];
      this.articleService.getArticle(slug).subscribe(
        res => this.article = res.article
      )
    })
  }

  getCurrentUser() {
    this.userService.getProfile(localStorage.getItem('username')).subscribe(
      res => this.current_user = res
    )
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

  followClicked(username: string, followed: boolean) {
    if (followed) {
      this.userService.unfollowUser(username).subscribe(
        res => this.article.author.following = false
      );
    } else {
      this.userService.followUser(username).subscribe(
        res => this.article.author.following = true
      );
    }
  }

  addComment(slug: string) {
    this.articleService.addComment(slug, this.comment_body).subscribe(
      res => {
        this.articleCommentC.getComments(slug);
        this.comment_body = '';
      }
    );
  }

  deleteArticle(slug: string) {
    this.articleService.deleteArticle(slug).subscribe();
  }

  // get auth state
  getAuthState() {
    this.authState_subscription = this.authService.logged_in$.subscribe(
      auth => this.is_logged_in = auth
    );
  }

  ngOnDestroy() {
    this.authState_subscription.unsubscribe();
  }
}
