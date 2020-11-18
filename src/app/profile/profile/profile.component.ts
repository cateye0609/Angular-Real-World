import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/_model/profile.model';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: Profile;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.profile = {} as Profile;
    this.getUsername();
  }

  getUsername() {
    this.activatedRoute.params.subscribe(params => {
      let username = params['username'];
      this.getProfile(username);
    });
  }

  getProfile(username: string) {
    this.userService.getProfile(username).subscribe(res => {
      this.profile = res.profile;
    })
  }
}
