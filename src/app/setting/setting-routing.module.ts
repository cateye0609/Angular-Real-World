import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_guard/auth.guard';
import { SettingResolver } from './setting-resolver.service';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
    {
        path: 'settings',
        component: SettingComponent,
        canActivate: [AuthGuard],
        resolve: {
            user: SettingResolver
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingRoutingModule { }
