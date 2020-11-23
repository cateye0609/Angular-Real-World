import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';

import { SettingsModel } from '../_model/setting.model';
import { ProfileResponse, UserResponse } from '../_model/response.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private commonService: CommonService,
    private authService: AuthService
  ) { }

  // get current user
  getUser() {
    return this.http.get<UserResponse>(`${environment.api_url}/user`)
      .pipe(
        map(res => {
          localStorage.setItem('username', res.user.username);
          return res;
        }),
        catchError(err => this.commonService.handleError(err))
      );
  }

  // update user
  updateSettings(data: SettingsModel) {
    const body = {
      'user': data
    };
    return this.http.put<UserResponse>(`${environment.api_url}/user`, body)
      .pipe(
        catchError(err => this.commonService.handleError(err))
      );
  }

  // get user's profile
  getProfile(username: string) {
    return this.http.get<ProfileResponse>(`${environment.api_url}/profiles/${username}`)
      .pipe(
        catchError(err => this.commonService.handleError(err))
      );
  }

  // follow user
  followUser(username: string) {
    return this.http.post<ProfileResponse>(`${environment.api_url}/profiles/${username}/follow`, null)
      .pipe(
        catchError(err => this.commonService.handleError(err))
      );
  }

  // unfollow user
  unfollowUser(username: string) {
    return this.http.delete<ProfileResponse>(`${environment.api_url}/profiles/${username}/follow`)
      .pipe(
        catchError(err => this.commonService.handleError(err))
      );
  }
}
