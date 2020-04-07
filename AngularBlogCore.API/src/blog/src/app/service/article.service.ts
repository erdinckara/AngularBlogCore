import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticlePg } from '../Model/article-pg';
import { tap } from 'rxjs/operators';
import { Article } from '../Model/article';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient: HttpClient) { }

  public loading: boolean = true;
  private apiUrl: string = "http://localhost:5000/api/articles"

  getArticles(page: number, pageSize: number) {
    let api = `${this.apiUrl}/${page}/${pageSize}`

    return this.httpClient.get<ArticlePg>(api).pipe(
      tap(x => {
        this.loading = false;
      }));
  }

  getArticle(id: number) {
    let api = `${this.apiUrl}/${id}`;
    console.log(api);
    return this.httpClient.get<Article>(api).pipe(tap(x => {
      this.loading = false;
    }));
  }

}
