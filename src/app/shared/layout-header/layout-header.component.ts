import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/_model/user.model';
import { AuthService } from 'src/app/_service/auth.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.css']
})
export class LayoutHeaderComponent implements OnInit, OnDestroy {
  is_logged_in: boolean;
  authState_subscription: Subscription;

  user: User;
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    this.user = {} as User;
    this.getUser();
    this.getAuthState();
  }

  ngOnInit(): void { }

  getUser() {
    this.userService.getUser().subscribe(res => {
      this.user = res.user;
    })
  }

  // get auth state
  getAuthState() {
    this.authState_subscription = this.authService.logged_in$.subscribe(res => this.is_logged_in = res)
  }

  ngOnDestroy() {
    this.authState_subscription.unsubscribe();
  }
}
