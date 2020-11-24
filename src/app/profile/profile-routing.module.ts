import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileArticlesComponent } from './profile-articles/profile-articles.component';
import { ProfileFavoritesComponent } from './profile-favorites/profile-favorites.component';
import { ProfileResolver } from './profile-resolver.service';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
    {
        path: 'profile/:username', component: ProfileComponent, children: [
            { path: '', component: ProfileArticlesComponent },
            { path: 'favorites', component: ProfileFavoritesComponent }
        ],
        resolve: {
            profile: ProfileResolver
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }
