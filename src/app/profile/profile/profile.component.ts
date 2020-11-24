import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/_model/article.model';
import { Profile } from 'src/app/_model/profile.model';
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
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.profile = {} as Profile;
    this.activatedRoute.data.subscribe(data => this.profile = data['profile'])
  }

  followClicked(username: string, followed: boolean) {
    if (followed) {
      this.userService.unfollowUser(username).subscribe(
        res => this.profile.following = false
      );
    } else {
      this.userService.followUser(username).subscribe(
        res => this.profile.following = true
      );
    }
  }
}