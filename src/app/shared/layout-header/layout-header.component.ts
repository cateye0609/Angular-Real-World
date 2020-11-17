import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.css']
})
export class LayoutHeaderComponent implements OnInit {
  is_logged_in: boolean;

  constructor(
    private authService: AuthService
  ) {
    this.is_logged_in = authService.isLoggedIn();
  }

  ngOnInit(): void {
  }

}
