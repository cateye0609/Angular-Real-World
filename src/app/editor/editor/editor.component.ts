import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/_model/article.model';
import { Errors } from 'src/app/_model/error.model';
import { ArticleService } from 'src/app/_service/article.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  article: Article;
  editor_errors: Errors;

  constructor(
    private activatedRoute: ActivatedRoute,
    private acticleService: ArticleService,
    private router: Router
  ) {
    this.article = { tagList: [] } as Article;
  }

  ngOnInit(): void {
    this.getArticle();
  }

  addTag(event: any) {
    console.log(event.target.value, this.article);
    const tag = event.target.value;
    if (!this.article.tagList.includes(tag)) {
      this.article.tagList.push(tag);
    }
    event.target.value = '';
  }

  removeTag(tagName: string) {
    this.article.tagList = this.article.tagList.filter(tag => tag !== tagName);
  }

  getArticle() {
    this.activatedRoute.params.subscribe(params => {
      const slug = params['slug'];
      const username = localStorage.getItem('username');
      this.acticleService.getArticle(slug).subscribe(res => {
        if (res.article.author.username === username) {
          this.article = res.article;
        } else {
          this.router.navigate(['/']);
        }
      });
    });
  }

  formSubmit() {
    console.log(this.article)
    if (this.article.slug) {
      this.acticleService.updateArticle(this.article).subscribe(
        res => this.router.navigate([`/article/${res.article.slug}`]),
        err => this.editor_errors = err.error.errors
      );
      console.log('update')
    } else {
      this.acticleService.createArticle(this.article).subscribe(
        res => this.router.navigate([`/article/${res.article.slug}`]),
        err => this.editor_errors = err.error.errors
      );
      console.log('publish');
    }
  }
}