import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private apiUrl: string = `http://localhost:5000/api/Auth/IsAuthenticated`

  constructor(private httpClient: HttpClient) { }

  isAuthenticated(email: string, password: string) {
    let adminUser = { email: email, password: password }

    return this.httpClient.post<any>(this.apiUrl, adminUser);
  }

}


