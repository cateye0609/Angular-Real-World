import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { SettingModule } from './setting/setting.module';
import { ProfileModule } from './profile/profile.module';
import { EditorModule } from './editor/editor.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AuthModule,
    HomeModule,
    SettingModule,
    ProfileModule,
    EditorModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
