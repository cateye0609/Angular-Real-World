import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_guard/auth.guard';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleProfileResolver } from './article-profile-resolver.service';
import { ArticleResolver } from './article-resolver.service';

const routes: Routes = [
    {
        path: 'article/:slug',
        component: ArticleDetailComponent,
        resolve: {
            article: ArticleResolver,
            current_user: ArticleProfileResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArticleRoutingModule { }
