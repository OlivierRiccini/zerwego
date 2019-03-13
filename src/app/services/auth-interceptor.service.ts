import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 
  constructor(private auth: AuthService) {}
  
  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    const tokens = this.auth.getTokens();
    if (tokens.accessToken && tokens.refreshToken) {
      const cloned = req.clone({
        headers: new HttpHeaders({
          'Authorization': `Bearer ${tokens.accessToken}`,
          'Refresh_token': tokens.refreshToken
        })
      });

      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}