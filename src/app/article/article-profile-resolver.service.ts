import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../_service/user.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleProfileResolver {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.userService.getProfile(localStorage.getItem('username'))
      .pipe(catchError((err) => this.router.navigate(['/'])));
  }
}
