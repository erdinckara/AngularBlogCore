import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticlePg } from '../Model/article-pg';
import { tap } from 'rxjs/operators';
import { Article } from '../Model/article';
import { Archive } from '../Model/archive';


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
    return this.httpClient.get<Article>(api).pipe(
      tap(x => {
        this.loading = false;
      }));
  }

  getArticlesWithCategory(cateogryId: number, page: number, pageSize: number) {
    let api = `${this.apiUrl}/getArticlesWithCategory/${cateogryId}/${page}/${pageSize}`;
    return this.httpClient.get<ArticlePg>(api).pipe(
      tap(x => {
        this.loading = false;
      }));
  }

  getSearchArticle(searchText: string, page: number, pageSize: number) {
    let api = `${this.apiUrl}/searchArticle/${searchText}/${page}/${pageSize}`;
    return this.httpClient.get<ArticlePg>(api).pipe(
      tap(x => {
        this.loading = false;
      }));
  }

  getArticlesByMostView() {
    let api = `${this.apiUrl}/GetArticlesByMostView`;

    return this.httpClient.get<Article[]>(api).pipe(
      tap(x => {
        this.loading = false;
      }));
  }

  getArticlesArchive() {
    let api = `${this.apiUrl}/GetArticlesArchive`;

    return this.httpClient.get<Archive[]>(api).pipe(
      tap(x => {
        this.loading = false;
      }));
  }

  getArticlesArchiveList(year: number, month: number, page: number, pageSize: number) {
    let api = `${this.apiUrl}/GetArticlesArchiveList/${year}/${month}/${page}/${pageSize}`;

    return this.httpClient.get<ArticlePg>(api).pipe(
      tap(x => {
        this.loading = false;
      }));
  }

  articleViewCountUp(id: number) {

    let api = `${this.apiUrl}/ArticleViewCountUp/${id}`;

    return this.httpClient.get(api);

  }

  getArticlesWithoutPg() {

    return this.httpClient.get<Article[]>(this.apiUrl);

  }

  saveArticlePicture(image) {

    let api = `${this.apiUrl}/SaveArticlePicture`;
    return this.httpClient.post<any>(api, image);

  }

  addArticle(article: Article) {

    return this.httpClient.post(this.apiUrl, article);

  }

}
