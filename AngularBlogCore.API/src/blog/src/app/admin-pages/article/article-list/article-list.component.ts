import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticleService } from 'src/app/service/article.service';
import { Article } from 'src/app/Model/article';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  displayedColumns: string[] = ["picture","title", "category", "commentCount","publishDate","viewCount"];
  dataSource;
  articles: Article[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {

    this.articleService.getArticlesWithoutPg().subscribe(data => {

      this.dataSource = new MatTableDataSource<Article>(data);
      this.dataSource.paginator = this.paginator;
    });

  }

}
