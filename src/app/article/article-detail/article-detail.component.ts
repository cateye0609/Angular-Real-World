import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/_model/article.model';
import { Profile } from 'src/app/_model/profile.model';
import { ArticleService } from 'src/app/_service/article.service';
import { UserService } from 'src/app/_service/user.service';
import { ArticleCommentComponent } from '../article-comment/article-comment.component';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  @ViewChild(ArticleCommentComponent, { static: false }) articleCommentC: ArticleCommentComponent
  article: Article;
  current_user: Profile;
  comment_body: string = "";
  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad() {
    this.article = {} as Article;
    this.getArticle();
    this.getCurrentUser()
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
      res => this.current_user = res.profile
    )
  }

  favoriteClicked(slug: string, favorited: boolean) {
    if (favorited) {
      this.articleService.unfavoriteArticle(slug).subscribe(
        res => this.onLoad()
      )
    } else {
      this.articleService.favoriteArticle(slug).subscribe(
        res => this.onLoad()
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
}
