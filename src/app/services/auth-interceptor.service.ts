import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthService) { 
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken());
    }

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        if (!this.isRefreshing && error.error.message === 'Refresh token is no longer valid, user has to login') {
          this.authService.autoLogout();
          return next.handle(null);
        } else {
          return this.handle401Error(request, next);
        }
      } else {
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.refreshToken().pipe(
      switchMap((response: any) => {
        const jwt = response.headers.get('jwt');
        // this.isRefreshing = false;
        this.refreshTokenSubject.next(jwt);
        return next.handle(this.addToken(request, jwt));
      }));
  //   if (!this.isRefreshing) {
  //     this.isRefreshing = true;
  //     this.refreshTokenSubject.next(null);

  //     return this.authService.refreshToken().pipe(
  //       switchMap((response: any) => {
  //         const jwt = response.headers.get('jwt');
  //         this.isRefreshing = false;
  //         this.refreshTokenSubject.next(jwt);
  //         return next.handle(this.addToken(request, jwt));
  //       }));

  //   } else {
  //     return this.refreshTokenSubject.pipe(
  //       filter(token => token != null),
  //       take(1),
  //       switchMap(jwt => {
  //         return next.handle(this.addToken(request, jwt));
  //       }));
  //   }
  }
}
