import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticleService } from 'src/app/service/article.service';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/model/article';
import { Category } from 'src/app/model/category';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: Article;
  category: Category;

  constructor(
    public articleService: ArticleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.articleService.loading = true;

      // www.mysite.com/makale/asp.net core'gelen yenilikler/4
      let id = Number(this.route.snapshot.paramMap.get('id'));

      this.articleService.getArticle(id).subscribe(data => {
        this.article = data;
        this.category = data.category;

        this.articleService.articleViewCountUp(this.article.id).subscribe();
      });
    });
  }


}
