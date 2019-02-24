import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanLoad, CanActivate, UrlSegment, Route, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, tap, switchMap } from 'rxjs/operators';
 
@Injectable()
export class AuthGuardLoad implements CanLoad {
    
    constructor(private authService: AuthService, private router: Router) {}

    canLoad(
        route: Route,
        segments: UrlSegment[]
      ): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isLoggedIn().pipe(
          take(1),
          switchMap(isLogged => {
            if (!isLogged) {
                return of(false);
            }
            return of(true);
          }),
          tap(isAuth => {
            if (!isAuth) {
              this.authService.openAuthDialog('signin');
              this.router.navigate(['/signin']);
            }
          })
        );
      }
 
}

@Injectable()
export class AuthGuardActivate implements CanActivate {
    
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isLoggedIn().pipe(
          take(1),
          switchMap(isLogged => {
            if (!isLogged) {
                return of(false);
            }
            return of(true);
          }),
          tap(isAuth => {
            if (!isAuth) {
              this.router.navigate(['/signin']);
            }
          })
        );
    }
 
}