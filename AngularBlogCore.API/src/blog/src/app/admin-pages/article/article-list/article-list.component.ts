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

  displayedColumns: string[] = ["picture", "title", "category", "commentCount", "publishDate", "viewCount", "actions"];
  dataSource;
  articles: Article[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {

    this.articleService.getArticlesWithoutPg().subscribe(data => {
      this.articles = data;
      this.dataSource = new MatTableDataSource<Article>(data);
      this.dataSource.paginator = this.paginator;
    });

  }

  deleteArticle(id: number) {
    this.articleService.deleteArticle(id).subscribe(data => {

      let article = this.articles.filter(x => x.id == id)[0];
      let index = this.articles.indexOf(article);

      this.articles.splice(index, 1);
      this.dataSource = new MatTableDataSource<Article>(this.articles);
      this.dataSource.paginator = this.paginator;

    });
  }


}
