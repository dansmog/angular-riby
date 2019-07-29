import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class GlobalHttpInterceptorService implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error("Error Event");
          } else {
            console.log(`error status : ${error.status} ${error.statusText}`);
            switch (error.status) {
              case 401:      //login
                console.log(error)
                break;
              case 403:     //forbidden
                console.log(error)
                break;
              case 400:
                return throwError(error.error.responseText)
              case 500:
                return throwError(error.error.responseText)
              case 0:
                return throwError(error)
            }
          }
        } else {
          console.error("some thing else happened");
        }
        return throwError(error);

      })
    )
  }
}

