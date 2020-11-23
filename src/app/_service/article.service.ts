import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ArticleQueryOption } from '../_model/article-list-config.model';
import { Article } from '../_model/article.model';
import { ArticleListResponse, ArticleResponse, CommentResponse, TagListResponse } from '../_model/response.model';
import { AuthService } from './auth.service';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(
    private commonService: CommonService,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) { }

  // get articles list
  getArticlesList(options: ArticleQueryOption) {
    let api_url = new URL(`${environment.api_url}/articles`);
    Object.keys(options.option)
      .forEach((key) => {
        api_url.searchParams.append(key, options.option[key])
      });

    return this.http.get<ArticleListResponse>(api_url.href)
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

    return this.http.get<ArticleListResponse>(api_url.href)
      .pipe(
        catchError(err => this.commonService.handleError(err))
      );
  }

  // get article
  getArticle(slug: string) {
    return this.http.get<ArticleResponse>(`${environment.api_url}/articles/${slug}`)
      .pipe(
        catchError(err => this.commonService.handleError(err))
      );
  }

  // get tags
  getTags() {
    return this.http.get<TagListResponse>(`${environment.api_url}/tags`)
      .pipe(
        catchError(err => this.commonService.handleError(err))
      );
  }

  // get article comments
  getComments(slug: string) {
    return this.http.get<CommentResponse>(`${environment.api_url}/articles/${slug}/comments`)
      .pipe(
        catchError(err => this.commonService.handleError(err))
      );
  }

  favoriteArticle(slug: string) {
    return this.http.post<ArticleResponse>(`${environment.api_url}/articles/${slug}/favorite`, null)
      .pipe(
        catchError(err => this.commonService.handleError(err))
      );
  }

  unfavoriteArticle(slug: string) {
    return this.http.delete<ArticleResponse>(`${environment.api_url}/articles/${slug}/favorite`)
      .pipe(
        catchError(err => this.commonService.handleError(err))
      );
  }

  addComment(slug: string, comment: string) {
    const body = {
      'comment': { 'body': comment }
    }
    return this.http.post<CommentResponse>(`${environment.api_url}/articles/${slug}/comments`, body)
      .pipe(
        catchError(err => this.commonService.handleError(err))
      );
  }

  deleteComment(id: string, slug: string) {
    return this.http.delete<ArticleResponse>(`${environment.api_url}/articles/${slug}/comments/${id}`)
      .pipe(
        catchError(err => this.commonService.handleError(err))
      );
  }

  // create new article
  createArticle(article: Article) {
    let body: ArticleResponse = {
      article: article
    };
    return this.http.post<ArticleResponse>(`${environment.api_url}/articles`, body)
      .pipe(
        catchError(err => this.commonService.handleError(err))
      );
  }

  // update article
  updateArticle(article: Article) {
    let body: ArticleResponse = {
      article: article
    };
    return this.http.put<ArticleResponse>(`${environment.api_url}/articles/${article.slug}`, body)
      .pipe(
        catchError(err => this.commonService.handleError(err))
      );
  }

  // delete article
  deleteArticle(slug: string) {
    return this.http.delete(`${environment.api_url}/articles/${slug}`)
      .pipe(
        map(res => {
          this.router.navigate(['/']);
          return res;
        }),
        catchError(err => this.commonService.handleError(err))
      );
  }
}
