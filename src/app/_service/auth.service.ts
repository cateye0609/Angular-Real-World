import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { CommonService } from './common.service';

import { UserResponse } from '../_model/response.model';
import { LoginModel, RegisterModel } from '../_model/auth.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logged_in: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!localStorage.getItem('token') || null);
  logged_in$ = this.logged_in.asObservable();

  constructor(
    private http: HttpClient,
    private commonService: CommonService,
    private router: Router
  ) { }



  // login
  login(data: LoginModel) {
    const body = {
      'user': data
    };
    return this.http.post<UserResponse>(`${environment.api_url}/users/login`, JSON.stringify(body))
      .pipe(
        map(res => {
          localStorage.setItem('username', res.user.username);
          this.logged_in.next(true);
          return res;
        }),
        catchError(err => this.commonService.handleError(err))
      );
  }

  // register
  register(data: RegisterModel) {
    const body = {
      'user': data
    };
    return this.http.post<UserResponse>(`${environment.api_url}/users`, JSON.stringify(body))
      .pipe(
        catchError(err => this.commonService.handleError(err))
      );
  }

  // check if user is logged in
  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  // logout
  logout() {
    this.logged_in.next(false);
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}