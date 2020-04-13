import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/service/article.service';
import { Article } from 'src/app/Model/article';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  page: number = 1;
  articles: Article[] = [];
  totalCount: number;
  pageSize: number = 5
  loadingItem: number = 5;
  ajax;


  constructor(private route: ActivatedRoute, public articleService: ArticleService) { }


  ngOnInit(): void {

    if (this.ajax != null) this.ajax.unsubscribe();

    this.route.paramMap.subscribe(params => {
      this.articleService.loading = true;
      this.articles = [];
      this.totalCount = 0;

      if (params.get("page"))
        this.page = Number(params.get("page"));

      let year = Number(params.get("year"));
      let month = Number(params.get("month"));

      this.ajax = this.articleService.getArticlesArchiveList(year, month, this.page, this.pageSize).subscribe(data => {
        this.articles = data.articles;
        this.totalCount = data.totalCount;
      });


    })

  }

}
