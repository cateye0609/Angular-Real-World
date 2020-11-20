import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_guard/auth.guard';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

const routes: Routes = [
    { path: 'article/:slug', component: ArticleDetailComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArticleRoutingModule { }
