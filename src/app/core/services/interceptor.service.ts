import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { AuthService } from './auth.service';
import { LoaderService } from './loader.service';
export const InterceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {

  constructor(private loaderService: LoaderService,private router:Router,private authService:AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    let request = null;
    if (req.headers.has(InterceptorSkipHeader)) {

      const headers = req.headers.delete(InterceptorSkipHeader);
      request = next.handle(req.clone({ headers }));

    } else {

      let userData: any = JSON.parse(localStorage.getItem('userData'));
      const authReq = req.clone({
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + userData.token,
        }),
      });
      request = next.handle(authReq);
    }
    // return request


    return request.pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
          this.loaderService.hide();
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('error--->>>', error);
        this.loaderService.hide();
        if(error.status==401){
          this.authService.tokenExpire();
        }
        return throwError(error);
      }));
  }
}
