import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';

const baseUrl = 'http://localhost:3000/users';

@Injectable()
export class AuthService {

  dirty = new EventEmitter<IUser>();

  constructor(private http: HttpClient) { }

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

  login(email: string, password: string): Observable<HttpResponse<Object>> {
    console.log({ email, password });
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
  }

  logout() {
    // remove user from local storage to log user out
    console.log('service');
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

  isLoggedIn(): boolean {
    return (this.getToken() && this.getUser()) ? true : false;
  }

}
