import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { SharedModule } from '../shared/shared.module';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleCommentComponent } from './article-comment/article-comment.component';
import { ArticleResolver } from './article-resolver.service';
import { ArticleProfileResolver } from './article-profile-resolver.service';

@NgModule({
  declarations: [
    ArticlesListComponent,
    ArticleDetailComponent,
    ArticleCommentComponent],
  imports: [
    CommonModule,
    SharedModule,
    ArticleRoutingModule
  ],
  exports: [
    ArticlesListComponent
  ],
  providers: [ArticleResolver, ArticleProfileResolver]
})
export class ArticleModule { }
