import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  // Define API
  private readonly prodBaseURL = 'https://apis.riby.ng';
  private readonly devBaseUrl: "https://testapis.riby.ng"


  constructor(private http: HttpClient) { }

  // HttpClient API get() method => Fetch corporatives list
  getInvestments(): Observable<any> {
    let headers = new HttpHeaders().set("Authorization", "Bearer 515c7c62174d50bc2be192b623e3effb372bd49a")
    return this.http.get<any>('https://testapis.riby.ng/rcb/cm/v1/contribution-type', { headers });
  }

  getLoans(): Observable<any> {
    let headers = new HttpHeaders().set("Authorization", "Bearer 515c7c62174d50bc2be192b623e3effb372bd49a")
    return this.http.get<any>('https://testapis.riby.ng/rcb/lm/v1/loan-type', { headers })
  }

  getCorporatives(): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', "Bearer 515c7c62174d50bc2be192b623e3effb372bd49a")
    return this.http.get<any>('https://testapis.riby.ng/rcb/cp/v1/cooperative', { headers })
  }
  
  //get a single loans, corporatives or investment by id
  getById(id: number, type: string): Observable<any> {
    let headers = new HttpHeaders().set("Authorization", "Bearer 515c7c62174d50bc2be192b623e3effb372bd49a");
    if (type === 'investments') {
      return this.http.get<any>(`https://testapis.riby.ng/rcb/cm/v1/contribution-type/${id}`, { headers });
    }
    if (type === 'loans') {
      return this.http.get<any>(`https://testapis.riby.ng/rcb/lm/v1/loan-type/${id}`, { headers });
    }
    if (type === 'cooporatives') {
      return this.http.get<any>(`https://testapis.riby.ng/rcb/cp/v1/cooperative/${id}`, { headers });
    }
  }

  //perform member join request to a cooperative
  postMemberRequest(user): Observable<any> {
    let headers = new HttpHeaders().set("Authorization", "Bearer 515c7c62174d50bc2be192b623e3effb372bd49a");
    return this.http.post<any>('https://testapis.riby.ng/rcb/cp/v1/member-join-request', user, { headers })
  }
}
