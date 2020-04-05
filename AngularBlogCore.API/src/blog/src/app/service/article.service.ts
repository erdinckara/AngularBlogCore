import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticlePg } from '../Model/article-pg';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient: HttpClient) { }

  public loading: boolean = true;
  private apiUrl: string = "http://localhost:5000/api/articles"

  getArticle(page: number, pageSize: number) {
    let api = `${this.apiUrl}/${page}/${pageSize}`

    return this.httpClient.get<ArticlePg>(api).pipe(
      tap(x => {
        this.loading = false;
      }));
  }

}
