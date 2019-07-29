import { Injectable } from '@angular/core';
import { HttpEvent,  HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import {Observable} from "rxjs";

import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${environment.token}`
      }
    });

    return next.handle(req);
  }

}
