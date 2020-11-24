import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ArticleService } from '../_service/article.service';

@Injectable()
export class ArticleResolver {

  constructor(
    private router: Router,
    private articleService: ArticleService
  ) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.articleService.getArticle(route.params['slug'])
      .pipe(catchError((err) => this.router.navigate(['/'])));
  }
}