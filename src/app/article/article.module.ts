import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { SharedModule } from '../shared/shared.module';
import { ArticleRoutingModule } from './article-routing.module';

@NgModule({
  declarations: [ArticlesListComponent],
  imports: [
    CommonModule,
    SharedModule,
    ArticleRoutingModule
  ],
  exports: [
    ArticlesListComponent
  ]
})
export class ArticleModule { }
