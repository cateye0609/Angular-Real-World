import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Article } from '../_model/article.model';
import { ArticleListResponse, ArticleResponse } from '../_model/response.model';
import { AuthService } from './auth.service';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private commonService: CommonService,
    private authService: AuthService,
    private http: HttpClient
  ) { }

  // get articles list
  getArticlesList(tag?: string, author?: string, favorited?: string, limit?: string, offset?: string) {
    let api_url = new URL(`${environment.api_url}/articles`);
    let params = this.commonService.getParams(this.getArticlesList); // get params name
    for (let i = 0; i < arguments.length; i++) {
      if (arguments[i]) {
        api_url.searchParams.append(params[i], arguments[i]);
      }
    }
    let headers = this.commonService.headers;
    if (this.authService.isLoggedIn()) {
      headers = this.commonService.createAuthorizedHeader(headers);
    }
    return this.http.get<ArticleListResponse>(api_url.href, { headers: headers })
      .pipe(
        catchError(err => this.commonService.handleError(err))
      );
  }

  // get feed articles
  getFeed(limit?: string, offset?: string) {
    let api_url = new URL(`${environment.api_url}/articles/feed`);
    let params = this.commonService.getParams(this.getArticlesList); // get params name
    for (let i = 0; i < arguments.length; i++) {
      api_url.searchParams.append(params[i], arguments[i]);
    }
    let headers = this.commonService.headers;
    return this.http.get<ArticleListResponse>(api_url.href, { headers: this.commonService.createAuthorizedHeader(headers) })
      .pipe(
        catchError(err => this.commonService.handleError(err))
      );
  }

  // get article
  getArticle(slug: string) {
    let headers = this.commonService.headers;
    return this.http.get<ArticleResponse>(`${environment.api_url}/articles/${slug}`, { headers: headers })
      .pipe(
        catchError(err => this.commonService.handleError(err))
      );
  }

  // create new article
  createArticle(article: Article) {
    let headers = this.commonService.headers;
    let body: ArticleResponse = {
      article: article
    };
    return this.http.post<ArticleResponse>(`${environment.api_url}/articles`, { headers: this.commonService.createAuthorizedHeader(headers) })
      .pipe(
        catchError(err => this.commonService.handleError(err))
      );
  }

  // update article
  updateArticle(slug: string) {

  }
}
