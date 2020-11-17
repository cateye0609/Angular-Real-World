import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../_model/response.model';
import { SettingsModel } from '../_model/setting.model';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private commonService: CommonService
  ) { }

  // update user
  updateSettings(data: SettingsModel) {
    const authenticated_headers = new HttpHeaders({
      'Authorization': `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
      'charset': 'utf-8'
    });
    const body = {
      'user': data
    };
    return this.http.put<UserResponse>(`${environment}/user`, body, { headers: authenticated_headers })
      .pipe(
        catchError(err => this.commonService.handleError(err))
      );
  }
}
