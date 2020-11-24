import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ArticleComment } from 'src/app/_model/article.model';
import { Profile } from 'src/app/_model/profile.model';
import { ArticleService } from 'src/app/_service/article.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.css']
})
export class ArticleCommentComponent implements OnChanges {
  @Input() slug: string;
  comments: ArticleComment[];
  current_user: Profile;

  constructor(
    private articleService: ArticleService,
    private userService: UserService
  ) { }

  ngOnChanges(): void {
    if (this.slug) {
      this.getComments(this.slug);
      this.getCurrentUser();
    }
  }

  getComments(slug: string) {
    this.articleService.getComments(slug).subscribe(
      res => this.comments = res.comments
    )
  }

  getCurrentUser() {
    this.userService.getProfile(localStorage.getItem('username')).subscribe(
      res => this.current_user = res
    )
  }

  deleteComment(id: string) {
    this.articleService.deleteComment(id, this.slug).subscribe(
      res => this.getComments(this.slug)
    );
  }
}
