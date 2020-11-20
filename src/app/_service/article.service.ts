import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ArticleQueryOption } from '../_model/article-list-config.model';
import { Article } from '../_model/article.model';
import { ArticleListResponse, ArticleResponse, TagListResponse } from '../_model/response.model';
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
  getArticlesList(options: ArticleQueryOption) {
    let api_url = new URL(`${environment.api_url}/articles`);
    Object.keys(options.option)
      .forEach((key) => {
        api_url.searchParams.append(key, options.option[key])
      });

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
  getFeed(options: ArticleQueryOption) {
    let api_url = new URL(`${environment.api_url}/articles/feed`);
    Object.keys(options.option)
      .forEach((key) => {
        api_url.searchParams.append(key, options.option[key])
      });

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

  // get tags
  getTags() {
    let headers = this.commonService.headers;
    return this.http.get<TagListResponse>(`${environment.api_url}/tags`, { headers: headers })
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
    return this.http.post<ArticleResponse>(`${environment.api_url}/articles`, body, { headers: this.commonService.createAuthorizedHeader(headers) })
      .pipe(
        catchError(err => this.commonService.handleError(err))
      );
  }

  // update article
  updateArticle(slug: string) {

  }
}
