import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../_service/user.service';

@Injectable()
export class ProfileResolver {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.userService.getProfile(route.params['username'])
      .pipe(catchError((err) => this.router.navigate(['/'])));
  }
}