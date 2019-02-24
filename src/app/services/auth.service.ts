import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { Router } from '@angular/router';

const baseUrl = 'http://localhost:3000/users';

@Injectable()
export class AuthService {

  dirty = new EventEmitter<IUser>();
  openAuthDialogEvent = new EventEmitter<'signup' | 'signin'>();

  constructor(private http: HttpClient, private router: Router) { }

  register(user: IUser): Observable<HttpResponse<Object>> {
    return this.http.post<any>(`${baseUrl}/register`, user, { observe: 'response' })
      .pipe(map(response => {
        const user = response.body;
        const token = response.headers.get('x-auth');
        console.log(token);
        // login successful if there's a jwt token in the response
        if (user && token) {
          localStorage.setItem('x-auth', token);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.dirty.emit(user);
        }
        return user;
      }));
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${baseUrl}/login`, { email, password }, { observe: 'response' })
      .pipe(map(response => {
        const user = response.body;
        const token = response.headers.get('x-auth');
        // login successful if there's a jwt token in the response
        if (user && token) {
          localStorage.setItem('x-auth', token);
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.dirty.emit(user);
        return user;
      }));
      // .do(response => {
      //     const user = response.body;
      //     const token = response.headers.get('x-auth');
      //     // login successful if there's a jwt token in the response
      //     if (user && token) {
      //       localStorage.setItem('x-auth', token);
      //       localStorage.setItem('currentUser', JSON.stringify(user));
      //     }
      //     this.dirty.emit(user);
      //     return user;
      //   }) 
      // .shareReplay();
      
  }

  logout() {
    // remove user from local storage to log user out
    const httpOptions = {
      headers: new HttpHeaders({
        'x-auth': this.getToken()
      })
    }
    return this.http.delete<any>(`${baseUrl}/logout`, httpOptions)
      .subscribe(
        () => {
          console.log('success');
          localStorage.removeItem('x-auth');
          localStorage.removeItem('currentUser');
          this.dirty.emit(null);
          this.router.navigate(['/']);
        },
        err => console.log(err)
      )
      // .pipe(map(() => {
      //     console.log('success');
      //     localStorage.removeItem('x-auth');
      //     localStorage.removeItem('currentUser');
      // }));
  }

  getToken(): string {
    return localStorage.getItem('x-auth');
  }

  getUser(): IUser {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : false;
  }

  isLoggedIn(): Observable<boolean> {
    return (this.getToken() && this.getUser()) ? of(true) : of(false);
  }

  openAuthDialog(mode: 'signup' | 'signin') {
    this.openAuthDialogEvent.emit(mode);
  }

}
