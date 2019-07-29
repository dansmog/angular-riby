import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import {  retry, catchError  } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }

  /**
   * @param type the type of resource either a contribution| loans | cooperative
   * @param limit the total number of result to be returned
   * @param page the current page
   */
  getAllResoureBy(type: string, limit: number, page: number): Observable<any> {
    if(type === 'investments'){
      return this.http.get<any>(`${environment.devUrl}/rcb/cm/v1/contribution-type?limit=${limit}&page=${page}`);
    }
    if( type === 'loans'){
      return this.http.get<any>(`${environment.devUrl}/rcb/lm/v1/loan-type?limit=${limit}&page=${page}`).pipe(retry(1), catchError(this.handleError))
    }
    if(type === 'cooperatives'){
      return this.http.get<any>(`${environment.devUrl}/rcb/cp/v1/cooperative?limit=${limit}&page=${page}`)
    }
  }

  //get a single loans, corporatives or investment by id
  getById(id: any, type: string): Observable<any> {
    if (type === 'investments') {
      return this.http.get<any>(`${environment.devUrl}/rcb/cm/v1/contribution-type/${id}`);
    }
    if (type === 'loans') {
      return this.http.get<any>(`${environment.devUrl}/rcb/lm/v1/loan-type/${id}`);
    }
    if (type === 'cooporatives') {
      return this.http.get<any>(`${environment.devUrl}/rcb/cp/v1/cooperative/${id}`);
    }
  }

  //perform member join request to a cooperative
  postMemberRequest(user): Observable<any> {
    let headers = new HttpHeaders().set("Authorization", "Bearer " + environment.token);
    return this.http.post<any>(`${environment.devUrl}/rcb/cp/v1/member-join-request`, user).pipe(retry(1), catchError(this.handleError))
  }


  /**
   * @param query the search query string
   * @param type type is a string of the properties being searched, if its "investments, loans or cooperatives"
   */
  filterResults(query: string, type: string): Observable<any> {
    if (type === 'investments') {
      return this.http.get<any>(`${environment.devUrl}/rcb/cm/v1/contribution-type?filter=${query}`).pipe(retry(1), catchError(this.handleError));
    }
    if (type === 'loans') {
      return this.http.get<any>(`${environment.devUrl}/rcb/lm/v1/loan-type?filter=${query}`);
    }
    if (type === 'cooporatives') {
      return this.http.get<any>(`${environment.devUrl}/rcb/cp/v1/cooperative?filter=${query}`);
    }
  }


  /**
   * @param cId the cooperative id 
   * @param limit the number of resources to fetch per request
   */
  fetchCooperativeLoans(cId: string, limit: number): Observable<any>{
    return this.http.get<any>(`${environment.devUrl}/rcb/lm/v1/loan-type?owner_id=${cId}&&limit=${limit}`);
  }

  /**
   * @param cId the cooperative id
   * @param limit the number of resources to fetch per request
   */
  fetchCooperativeInvestments(cId: string, limit: number): Observable<any>{
    return this.http.get<any>(`${environment.devUrl}/rcb/cm/v1/contribution-type?owner_id=${cId}&&limit=${limit}`);
  }


handleError(error) {
  let errorMessage = '';
  if(error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else if(error.status === 400){
    // Get server-side error
    errorMessage = `${error.responseText}`;
  }
  window.alert(errorMessage);
  return throwError(errorMessage);
}

}



