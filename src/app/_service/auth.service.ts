import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginModel, RegisterModel } from '../_model/auth.model';
import { catchError } from 'rxjs/operators';
import { CommonService } from './common.service';
import { UserResponse } from '../_model/response.model';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private commonService: CommonService
  ) { }

  // request header
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'charset': 'utf-8'
  });

  // login
  login(data: LoginModel) {
    const body = {
      'user': data
    };
    return this.http.post<UserResponse>(`${environment.api_url}/users/login`, JSON.stringify(body), { headers: this.headers })
      .pipe(
        catchError(err => this.commonService.handleError(err))
      );
  }

  // register
  register(data: RegisterModel) {
    const body = {
      'user': data
    };
    return this.http.post<UserResponse>(`${environment.api_url}/users`, JSON.stringify(body), { headers: this.headers })
      .pipe(
        catchError(err => this.commonService.handleError(err))
      );
  }

  // check if user is logged in
  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}