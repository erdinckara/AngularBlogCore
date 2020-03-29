import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from "../Model/category"

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl: string = "https://localhost:44385/api/Categories";

  constructor(private httpClient: HttpClient) { }

  public getCategories() {
    return this.httpClient.get<Category[]>(this.apiUrl)
  }

  public getCategoryById(id: number) {
    let url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<Category>(url)
  }

}
