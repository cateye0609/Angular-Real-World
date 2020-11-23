import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor/editor.component';
import { SharedModule } from '../shared/shared.module';
import { EditorRoutingModule } from './editor-routing.module';

@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    SharedModule,
    EditorRoutingModule
  ]
})
export class EditorModule { }
