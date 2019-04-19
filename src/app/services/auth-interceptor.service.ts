import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 
  constructor(private auth: AuthService) {
  }
  
  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.auth.getTokens();
    console.log(token);
    if (token) {
      const cloned = req.clone({
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        })
      });


      return next.handle(cloned).pipe(
        tap((ev: HttpEvent<any>) => {
          if (ev instanceof HttpResponse) {
            const token: string = ev.headers.get('authorization');
            if (token) {
              this.auth.refreshToken(token);
            }
          }
        }, err => {
          if (err.error.name === 'TokenExpiredError'
              || err.error.message === 'Refresh token is expired, user has to login') {
            this.auth.autoLogout();
          }
        }))
    }
    else {
      return next.handle(req);
    }
  }
}