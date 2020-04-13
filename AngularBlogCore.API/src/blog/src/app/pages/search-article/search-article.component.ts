import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/Model/article';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-search-article',
  templateUrl: './search-article.component.html',
  styleUrls: ['./search-article.component.css']
})
export class SearchArticleComponent implements OnInit {
  page: number = 1;
  articles: Article[] = [];
  totalCount: number;
  pageSize: number = 5
  loadingItem: number = 5;
  ajax;
  searchText: string;

  constructor(private route: ActivatedRoute, public articleService: ArticleService) { }

  ngOnInit(): void {

    this.route.url.subscribe(params => {

      if (this.ajax != null)
        this.ajax.unsubscribe();

      this.articleService.loading = true;
      this.articles = [];
      this.totalCount = 0;

      if (this.route.snapshot.paramMap.get("page")) {
        this.page = Number(this.route.snapshot.paramMap.get("page"));
      }


      this.searchText = this.route.snapshot.queryParamMap.get("s");

      this.ajax = this.articleService.getSearchArticle(this.searchText, this.page, this.pageSize)
        .subscribe(data => {
          this.articles = data.articles;
          this.totalCount = data.totalCount;
        });


    });
  }

}
