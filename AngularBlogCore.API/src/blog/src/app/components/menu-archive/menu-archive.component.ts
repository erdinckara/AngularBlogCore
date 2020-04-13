import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/service/article.service';
import { Archive } from 'src/app/Model/archive';

@Component({
  selector: 'app-menu-archive',
  templateUrl: './menu-archive.component.html',
  styleUrls: ['./menu-archive.component.css']
})
export class MenuArchiveComponent implements OnInit {

  archives:Archive[]=[];

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {

    this.articleService.getArticlesArchive().subscribe(data => {

      this.archives = data;
    });

  }

}
