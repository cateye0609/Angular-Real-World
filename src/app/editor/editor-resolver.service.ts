import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ArticleService } from '../_service/article.service';

@Injectable()
export class EditorResolver {

  constructor(
    private router: Router,
    private articleService: ArticleService
  ) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const username = localStorage.getItem('username');
    return this.articleService.getArticle(route.params['slug'])
      .pipe(
        map(res => {
          if (res.author.username === username) {
            return res;
          } else {
            this.router.navigate(['/']);
          }
        }),
        catchError((err) => this.router.navigate(['/'])));
  }
}
