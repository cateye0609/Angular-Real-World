import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting/setting.component';
import { SettingRoutingModule } from './setting-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SettingResolver } from './setting-resolver.service';

@NgModule({
  declarations: [SettingComponent],
  imports: [
    CommonModule,
    SharedModule,
    SettingRoutingModule
  ],
  providers: [SettingResolver]
})
export class SettingModule { }
