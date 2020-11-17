import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsModel } from 'src/app/_model/setting.model';
import { AuthService } from 'src/app/_service/auth.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  settingSubmit(data: SettingsModel) {
    this.userService.updateSettings(data).subscribe(res => {
      this.router.navigate(['/profile'])
    })
  }

  logout() {
    this.authService.logout();
  }
}
