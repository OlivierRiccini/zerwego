import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { UserInterfaceService } from './user-interface.service';

@Injectable()

// https://github.com/bartosz-io/jwt-auth-angular/blob/master/src/app/auth/token.interceptor.ts
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;

  constructor(private authService: AuthService, private userInterfaceService: UserInterfaceService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken());
    }

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        if (error.error.name === 'TokenExpiredError') {
          return this.handle401TokenExpiredError(request, next);
        } else if (error.error.message === 'Refresh token is no longer valid, user has to login') {
          return this.handle401RefreshTokenExpired(next);
        } else {
          return this.handle401Errors(next);
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

  private handle401TokenExpiredError(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      return this.authService.refreshToken().pipe(
        switchMap((response: any) => {
          const jwt = response.headers.get('jwt');
          this.isRefreshing = false;
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }

  private handle401RefreshTokenExpired(next: HttpHandler) {
    this.authService.autoLogout();
    this.isRefreshing = false;
    return next.handle(null);
  }

  private handle401Errors(next: HttpHandler) {
    this.userInterfaceService.error(`
      Something went wrong during security process, for security purposes you'll be logged out in 8 seconds.
      Then you'll be able to loggin again, thans for your understanding`
    );
    setTimeout(() => {
      this.authService.autoLogout();
      this.isRefreshing = false;
    }, 8000);
    return next.handle(null);
  }
}
