import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router, CanLoad, UrlSegment, Route } from '@angular/router';
import { Observable } from 'rxjs';
 
@Injectable()
export class AuthGuard implements CanLoad {
    
    constructor(private authService: AuthService, private router: Router) {}

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        console.log(this.authService.isLoggedIn());
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/signin'])
        }
        return this.authService.isLoggedIn();
    }

    // canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //     if (!this.authService.isLoggedIn()) {
    //         this.router.navigate(['/signin'])
    //     }
    //     return this.authService.isLoggedIn();
    // }
 
}