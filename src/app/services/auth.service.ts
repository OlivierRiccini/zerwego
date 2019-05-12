import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
// import { config } from './../../config';
import * as jwt_decode from "jwt-decode";
import { UserInterfaceService } from './user-interface.service';
import { ICredentials, IForgotPassword } from '../models/auth';
import { IUser } from '../models/user';
import { Router } from '@angular/router';

const config = { apiUrl: 'http://localhost:3000/auth'};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly CURRENT_USER = 'CURRENT_USER';

  public switchDialogEvent = new EventEmitter<boolean>();
  public userLoggedEvent = new EventEmitter<IUser>();

  constructor(private http: HttpClient, private router: Router, private userInterfaceService: UserInterfaceService) { }

  public register(user: IUser): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/register`, user, { observe: 'response' })
      .pipe(
        tap(response => {
          const jwt = response.headers.get('jwt');
          const refreshToken = response.headers.get('refreshToken');
          this.doLoginUser({jwt, refreshToken});
        }),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  public login(credentials: ICredentials): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/login`, credentials, { observe: 'response' })
      .pipe(
        tap(response => {
          const jwt = response.headers.get('jwt');
          const refreshToken = response.headers.get('refreshToken');
          this.doLoginUser({jwt, refreshToken});
        }),
        mapTo(true),
        catchError(error => {
          console.log(error);
          alert(error.error);
          return of(false);
        }));
  }

  public logout(): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'refreshToken': this.getRefreshToken() 
    });
    const options = { headers: headers };
    return this.http.post<any>(`${config.apiUrl}/logout`, null, options).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
  }

  public isLoggedIn() {
    return !!this.getJwtToken();
  }

  public refreshToken() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'refreshToken': this.getRefreshToken() 
    });
    const options = { headers: headers, observe: 'response' as 'body' };
    return this.http.post<any>(`${config.apiUrl}/refresh`, null, options,).pipe(
      tap((response: any) => {
        const jwt = response.headers.get('jwt');
        const refreshToken = response.headers.get('refreshToken'); 
        this.storeJwtToken(jwt);
    }));
  }

  public forgotPassword(contact: IForgotPassword) {
    return this.http.post<any>(`${config.apiUrl}/forgot-password`, contact);
  }

  public getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  public getCurrentUser(): IUser {
    const user = localStorage.getItem(this.CURRENT_USER);
    return user ? JSON.parse(user) : false;
  }

  public switchDialog(isAModeChange: boolean) {
    this.switchDialogEvent.emit(isAModeChange);
  }

  private doLoginUser(tokens: any) {
    const decoded = jwt_decode(tokens.jwt);
    const user = decoded.payload;
    this.storeCurrentUser(user);
    this.userLoggedEvent.emit(user);
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.removeCurrentUser();
    this.removeTokens();
    this.userLoggedEvent.emit(null);
    this.userInterfaceService.success('Successfully logedOut');
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: any) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private storeCurrentUser(user: IUser) {
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  private removeCurrentUser() {
    localStorage.removeItem(this.CURRENT_USER);  
  }

}



// import { Injectable, EventEmitter } from '@angular/core';
// import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
// import { map } from 'rxjs/operators';
// import { Observable, of } from 'rxjs';
// import { IUser } from '../models/user';
// import { Router } from '@angular/router';
// import * as jwt_decode from "jwt-decode";
// import { UserInterfaceService } from './user-interface.service';
// import { ICredentials, IForgotPassword } from '../models/auth';

// const baseUrl = 'http://localhost:3000/auth';

// @Injectable()
// export class AuthService {

//   public userLoggedEvent = new EventEmitter<IUser>();
//   public switchDialogEvent = new EventEmitter<boolean>();

//   constructor(private http: HttpClient, private router: Router, private userInterfaceService: UserInterfaceService) { }

//   register(user: IUser): Observable<HttpResponse<Object>> {
//     return this.http.post<any>(`${baseUrl}/register`, user, { observe: 'response' })
//       .pipe(map(response => {
//         let user;
//         const token = response.headers.get('authorization');
//         // const refreshToken = response.headers.get('refresh_token');
//         if (token) {
//           var decoded = jwt_decode(token);
//           user = decoded.payload;
//           localStorage.setItem('Authorization', token);
//           // localStorage.setItem('Refresh_token', refreshToken);
//           localStorage.setItem('currentUser', JSON.stringify(user));
//           this.userLoggedEvent.emit(user);
//         }
//         return user;
//       }));
//   }

//   login(credentials: ICredentials) {
//     return this.http.post<any>(`${baseUrl}/login`, credentials, { observe: 'response' })
//       .pipe(map(response => {
//         let user: IUser;
//         const accesToken = response.headers.get('authorization');
//         if (accesToken) {
//           var decoded = jwt_decode(accesToken);
//           user = decoded.payload;
//           localStorage.setItem('Authorization', accesToken);
//           localStorage.setItem('currentUser', JSON.stringify(user));
//         }
//         this.userLoggedEvent.emit(user);
//         return user;
//       }));
//   }

//   logout() {
//     this.http.delete(`${baseUrl}/logout`).subscribe(
//       () => {
//         localStorage.removeItem('Authorization');
//         localStorage.removeItem('currentUser');
//         this.userLoggedEvent.emit(null);
//         this.router.navigate(['/']);
//         this.userInterfaceService.success('Successfully logedOut');
//       },
//       err => this.userInterfaceService.error(err)
//     );
//   }

//   autoLogout() {
//     this.logout();
//     this.userInterfaceService.confirm({
//       message: 'Session expired, let\'s login!',
//       trueLabel: 'Let\'s login',
//       falseLabel: 'No thanks'
//     }).subscribe(
//       response => response ? this.router.navigate(['/', 'signin']) : this.router.navigate(['./'])
//     );
//   }

//   refreshAccessToken(token: string) {
//     console.log('Refreshing token... new token :');
//     console.log(token);
//     localStorage.setItem('Authorization', token);
//   }

//   getToken(): string {
//     return localStorage.getItem('Authorization');
//   }

//   getTokens() {
//     return localStorage.getItem('Authorization')
//   }

//   getCurrentUser(): IUser {
//     const user = localStorage.getItem('currentUser');
//     return user ? JSON.parse(user) : false;
//   }

//   isLoggedIn(): Observable<boolean> {
//     return (this.getToken() && this.getToken() !== 'undefined' && this.getCurrentUser()) ? of(true) : of(false);
//   }

//   switchDialog(isAModeChange: boolean) {
//     this.switchDialogEvent.emit(isAModeChange);
//   }

//   forgotPassword(contact: IForgotPassword) {
//     return this.http.post<any>(`${baseUrl}/forgot-password`, contact);
//   }

// }
