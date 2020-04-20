import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../Model/comment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl: string = "http://localhost:5000/api/comments";
  loading: boolean;

  constructor(private httpClient: HttpClient) { }

  addComment(comment: Comment) {
    this.loading = true;
    return this.httpClient.post<Comment>(this.apiUrl, comment).pipe(tap(x => {
      this.loading = false;
    }));
  }

  commentList(id:number){

    return this.httpClient.get<Comment[]>(`${this.apiUrl}/${id}`);

  }

}
