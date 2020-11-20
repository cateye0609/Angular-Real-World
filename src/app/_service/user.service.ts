import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';

import { SettingsModel } from '../_model/setting.model';
import { ProfileResponse, UserResponse } from '../_model/response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private commonService: CommonService
  ) { }

  // get current user
  getUser() {
    let headers = this.commonService.headers;
    return this.http.get<UserResponse>(`${environment.api_url}/user`, { headers: this.commonService.createAuthorizedHeader(headers) })
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
    let headers = this.commonService.headers;
    const body = {
      'user': data
    };
    return this.http.put<UserResponse>(`${environment.api_url}/user`, body, { headers: this.commonService.createAuthorizedHeader(headers) })
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
    let headers = this.commonService.headers;
    this.http.post<ProfileResponse>(`${environment.api_url}/profiles/${username}/follow`, null, { headers: this.commonService.createAuthorizedHeader(headers) })
      .pipe(
        catchError(err => this.commonService.handleError(err))
      );
  }

  // unfollow user
  unfollowUser(username: string) {
    let headers = this.commonService.headers;
    this.http.delete<ProfileResponse>(`${environment.api_url}/profiles/${username}/follow`, { headers: this.commonService.createAuthorizedHeader(headers) })
      .pipe(
        catchError(err => this.commonService.handleError(err))
      );
  }
}
