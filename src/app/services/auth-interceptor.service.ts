import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 
  constructor(private auth: AuthService) {}
  
  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    const authToken = this.auth.getToken();

    if (authToken) {
      const cloned = req.clone({
          headers: req.headers.set('x-auth', authToken)
        });

      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}