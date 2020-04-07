import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/service/article.service';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/Model/article';
import { Category } from 'src/app/Model/category';

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
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      let id = Number(this.route.snapshot.paramMap.get("id"));

      this.articleService.getArticle(id).subscribe(data => {
        console.log(data);
        this.article = data;
        this.category = data.category;
      });


    });

  }

}
