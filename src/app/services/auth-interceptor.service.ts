import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 
  constructor(private auth: AuthService) {}
  
  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.auth.getTokens();
    if (token) {
      const cloned = req.clone({
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
          // 'Refresh_token': tokens.refreshToken
        })
      });

      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}