import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Article } from 'src/app/Model/article';
import { ArticleService } from 'src/app/service/article.service';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  @Input() totalCount: number;
  @Input() articles: Article[];
  @Input() page: number;
  @Input() pageSize: number;
  @Input() loadingItem: number;

  default_article: string = "assets/default_article.jpg";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public articleService: ArticleService
  ) { }


  createRange() {
    var items: number[] = [];
    for (let i = 1; i <= this.loadingItem; i++) {
      items.push(i);
    }
    return items;
  }

  ngOnInit(): void {
  }

  pageChanged(event) {
    this.articleService.loading = true;
    this.page = event;
    this.router.navigateByUrl(`/page/${this.page}`)
  }



}
