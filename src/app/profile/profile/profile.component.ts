import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/_model/article.model';
import { Profile } from 'src/app/_model/profile.model';
import { ArticleService } from 'src/app/_service/article.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: Profile;
  current_user: string = localStorage.getItem('username');
  my_articles: Article[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.profile = {} as Profile;
    this.getUsername();
  }

  getUsername() {
    this.activatedRoute.params.subscribe(params => {
      let username = params['username'];
      ////
      this.getProfile(username);
    });
  }

  getProfile(username: string) {
    this.userService.getProfile(username).subscribe(res => {
      this.profile = res.profile;
    })
  }

  getMyArticle(username: string) {
    this.articleService.getArticlesList(null, username).subscribe(
      res => this.my_articles = res.articles
    )
  }
}
