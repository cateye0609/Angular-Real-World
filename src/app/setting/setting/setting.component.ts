import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Errors } from 'src/app/_model/error.model';
import { SettingsModel } from 'src/app/_model/setting.model';
import { User } from 'src/app/_model/user.model';
import { AuthService } from 'src/app/_service/auth.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  user: User;
  setting_errors: Errors;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.user = {} as User;
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.user = data['user'];
    })
  }

  // update settings
  settingSubmit(data: SettingsModel) {
    this.userService.updateSettings(data).subscribe(
      res => {
        this.router.navigate(['/profile', res.username]);
      },
      err => this.setting_errors = err.error.errors);
  }

  // logout
  logout() {
    this.authService.logout();
  }
}
