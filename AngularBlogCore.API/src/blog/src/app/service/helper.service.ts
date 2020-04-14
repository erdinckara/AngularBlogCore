import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../Model/contact';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private httpClient: HttpClient
  ) { }

 private apiUrl: string = "http://localhost:5000/api/helper";

  sendContactMail(contact: Contact) {

    return this.httpClient.post(`${this.apiUrl}/SendContactEmail`, contact);
  }

}
