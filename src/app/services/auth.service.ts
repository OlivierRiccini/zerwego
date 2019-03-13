import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { UserInterfaceService } from './user-interface.service';

const baseUrl = 'http://localhost:3000/users';

@Injectable()
export class AuthService {

  public loggedObs = new EventEmitter<IUser>();
  public switchDialogEvent = new EventEmitter<boolean>();
  // public endOfSessionEvent = new EventEmitter<boolean>();
  private tokenExpirationTimer: number;

  constructor(private http: HttpClient, private router: Router, private userInterfaceService: UserInterfaceService) { }

  register(user: IUser): Observable<HttpResponse<Object>> {
    return this.http.post<any>(`${baseUrl}/register`, user, { observe: 'response' })
      .pipe(map(response => {
        let user;
        const token = response.headers.get('authorization');
        const refreshToken = response.headers.get('refresh_token');
        if (token) {
          var decoded = jwt_decode(token);
          user = decoded.payload;
          localStorage.setItem('Authorization', token);
          localStorage.setItem('Refresh_token', refreshToken);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.loggedObs.emit(user);
        }
        return user;
      }));
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${baseUrl}/login`, { email, password }, { observe: 'response' })
      .pipe(map(response => {
        let user;
        const accesToken = response.headers.get('authorization');
        const refreshToken = response.headers.get('refresh_token');
        // login successful if there's a jwt accesToken in the response
        if (accesToken) {
          var decoded = jwt_decode(accesToken);
          user = decoded.payload;
          localStorage.setItem('Authorization', accesToken);
          localStorage.setItem('Refresh_token', refreshToken);
          localStorage.setItem('currentUser', JSON.stringify(user));
          if (decoded.hasOwnProperty('exp')) {
            const accesTokenDurationTime: number = (decoded.exp - decoded.iat) * 1000;
            // this.autoLogout(tokenDurationTime);
          }
        }
        this.loggedObs.emit(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('Refresh_token');
    localStorage.removeItem('currentUser');
    this.loggedObs.emit(null);
    clearTimeout(this.tokenExpirationTimer);
    this.router.navigate(['/']);
    this.userInterfaceService.success('Successfully logedOut');
  }

  autoLogout(tokenDurationTime: number) {
    this.tokenExpirationTimer = <any>setTimeout(() => {
      this.logout();
      this.userInterfaceService.confirm({
        message: 'Session expired, let\'s login!',
        trueLabel: 'Let\'s login',
        falseLabel: 'No thanks'
      }).subscribe(
        response => response ? this.router.navigate(['/', 'signin']) : this.router.navigate(['./'])
      );
    }, tokenDurationTime);
  }

  getToken(): string {
    return localStorage.getItem('Authorization');
  }

  getTokens() {
    return {
      accessToken: localStorage.getItem('Authorization'),
      refreshToken: localStorage.getItem('Refresh_token')
    }
  }

  getUser(): IUser {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : false;
  }

  isLoggedIn(): Observable<boolean> {
    return (this.getToken() && this.getToken() !== 'undefined' && this.getUser()) ? of(true) : of(false);
  }

  switchDialog(isAModeChange: boolean) {
    this.switchDialogEvent.emit(isAModeChange);
  }

}
