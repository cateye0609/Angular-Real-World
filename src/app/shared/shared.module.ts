import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LayoutHeaderComponent } from './layout-header/layout-header.component';
import { LayoutFooterComponent } from './layout-footer/layout-footer.component';
import { ErrorsListComponent } from './errors-list/errors-list.component';
import { PaginationComponent } from './pagination/pagination.component';
import { MarkdownPipe } from '../_pipe/markdown.pipe';
import { HttpTokenInterceptor } from '../_interceptor/http.interceptor';

@NgModule({
  declarations: [
    LayoutHeaderComponent,
    LayoutFooterComponent,
    ErrorsListComponent,
    PaginationComponent,
    MarkdownPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    LayoutHeaderComponent,
    LayoutFooterComponent,
    ErrorsListComponent,
    PaginationComponent,
    MarkdownPipe,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
  ]
})
export class SharedModule { }
