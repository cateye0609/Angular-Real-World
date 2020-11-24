import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/_model/auth.model';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  loginSubmit(data: LoginModel) {
    this.authService.login(data).subscribe(res => {
      // save token
      localStorage.setItem('token', res.token);
      // go to home page
      this.router.navigate(['/']);
    });
  }
}
