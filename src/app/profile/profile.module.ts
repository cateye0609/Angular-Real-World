import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileArticlesComponent } from './profile-articles/profile-articles.component';
import { ProfileFavoritesComponent } from './profile-favorites/profile-favorites.component';
import { ArticleModule } from '../article/article.module';
import { ProfileResolver } from './profile-resolver.service';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileArticlesComponent,
    ProfileFavoritesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ArticleModule,
    ProfileRoutingModule
  ],
  providers: [ProfileResolver]
})
export class ProfileModule { }
