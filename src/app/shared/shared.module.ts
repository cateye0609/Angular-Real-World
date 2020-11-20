import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LayoutHeaderComponent } from './layout-header/layout-header.component';
import { LayoutFooterComponent } from './layout-footer/layout-footer.component';
import { ErrorsListComponent } from './errors-list/errors-list.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    LayoutHeaderComponent,
    LayoutFooterComponent,
    ErrorsListComponent,
    PaginationComponent
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
    FormsModule,
    HttpClientModule
  ]
})
export class SharedModule { }
