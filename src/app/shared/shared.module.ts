import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutHeaderComponent } from './layout-header/layout-header.component';
import { LayoutFooterComponent } from './layout-footer/layout-footer.component';

@NgModule({
  declarations: [
    LayoutHeaderComponent,
    LayoutFooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LayoutHeaderComponent,
    LayoutFooterComponent
  ]
})
export class SharedModule { }
