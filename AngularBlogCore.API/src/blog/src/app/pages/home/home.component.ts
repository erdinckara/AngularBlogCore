import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/Model/article';
import { ArticleService } from 'src/app/service/article.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  page: number = 1;
  articles: Article[];
  totalCount: number;
  pageSize: number = 5


  constructor(private articleService: ArticleService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      if (params.get("page")) {
        this.page = Number(params.get("page"));
      }
      this.articles = [];
      this.totalCount = 0;
      this.articleService.getArticle(this.page, this.pageSize)
        .subscribe(data => {
          this.articles = data.articles;
          this.totalCount = data.totalCount;
        });
    });
  }

}
