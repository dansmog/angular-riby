import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RestApiService {
   // Define API
   prodBaseURL = 'https://apis.riby.ng';
   devBaseUrl: "https://testapis.riby.ng"

   
  constructor(private http: HttpClient) { }

  // HttpClient API get() method => Fetch corporatives list
  getCorporatives(): Observable<any> {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/comments');
  }

  getLoans(): Observable<any> {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/comments')
  }
}
