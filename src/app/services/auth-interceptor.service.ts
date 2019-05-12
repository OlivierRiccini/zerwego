import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken());
    }

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(request, next);
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
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((response: any) => {
          const jwt = response.headers.get('jwt');
          this.isRefreshing = false;
          this.refreshTokenSubject.next(jwt);
          return next.handle(this.addToken(request, jwt));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }
}


// import { AuthService } from './auth.service';
// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
 
// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
 
//   constructor(private auth: AuthService) {
//     console.log('AuthInterceptor');
//     console.log(this.auth);
//   }
  
//   intercept(req: HttpRequest<any>,
//     next: HttpHandler): Observable<HttpEvent<any>> {

//     const token = this.auth.getTokens();
//     if (token) {
//       const cloned = req.clone({
//         headers: new HttpHeaders({
//           'Authorization': `Bearer ${token}`
//         })
//       });


//       return next.handle(cloned).pipe(
//         tap((ev: HttpEvent<any>) => {
//           if (ev instanceof HttpResponse) {
//             const token: string = ev.headers.get('authorization');
//             if (token) {
//               this.auth.refreshAccessToken(token);
//             }
//           }
//         }, err => {
//           if (err.error.name === 'TokenExpiredError'
//               || err.error.message === 'Refresh token is expired, user has to login') {
//             this.auth.autoLogout();
//           }
//         }))
//     }
//     else {
//       return next.handle(req);
//     }
//   }
// }