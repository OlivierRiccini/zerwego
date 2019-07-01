import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanLoad, CanActivate, UrlSegment, Route, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
 
@Injectable()
export class AuthGuardLoad implements CanLoad {
    
    constructor(private authService: AuthService, private router: Router) {}

    canLoad(
        route: Route,
        segments: UrlSegment[]
      ): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.authService.isLoggedIn()) {
          this.router.navigate(['/auth/signin']);
        }
        return this.authService.isLoggedIn();
      }
 
}

@Injectable()
export class AuthGuardActivate implements CanActivate {
    
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!this.authService.isLoggedIn()) {
        this.router.navigate(['/auth/signin']);
      }
      return this.authService.isLoggedIn();
    }
 
}