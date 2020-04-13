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
  @Input() typeList: string;

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
    this.articleService.loading = true;
  }

  pageChanged(event) {
    this.articleService.loading = true;
    this.page = event;
    this.router.navigateByUrl(`/page/${this.page}`);
    switch (this.typeList) {
      case "home":
        this.router.navigateByUrl(`/page/${this.page}`);
        break;
      case "category":
        let categoryName = this.route.snapshot.paramMap.get("name");
        let categoryId = this.route.snapshot.paramMap.get("id");
        this.router.navigateByUrl(`category/${categoryName}/${categoryId}/page/${this.page}`);
        break;
        case "search":
        let searchText = this.route.snapshot.queryParamMap.get("s");
        this.router.navigateByUrl(`search/page/${this.page}?s=${searchText}`);
        break;
        case "archive":
          let year = this.route.snapshot.paramMap.get("year");
          let month = this.route.snapshot.paramMap.get("month");
          this.router.navigateByUrl(`archive/${year}/${month}/page/${this.page}`);
          break;

      default:
        break;
    }


  }



}
