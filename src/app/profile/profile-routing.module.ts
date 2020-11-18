import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_guard/auth.guard';
import { ProfileArticlesComponent } from './profile-articles/profile-articles.component';
import { ProfileFavoritesComponent } from './profile-favorites/profile-favorites.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
    {
        path: 'profile/:username', component: ProfileComponent, canActivate: [AuthGuard], children: [
            { path: '', component: ProfileArticlesComponent, canActivate: [AuthGuard] },
            { path: 'favorites', component: ProfileFavoritesComponent, canActivate: [AuthGuard] }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }
