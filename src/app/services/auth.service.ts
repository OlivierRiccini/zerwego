import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';

const baseUrl = 'http://localhost:3000/users';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user: IUser): Observable<HttpResponse<Object>> {
    return this.http.post<any>(`${baseUrl}/register`, user, { observe: 'response' })
      .pipe(map(response => {
        const user = response.body;
        console.log(response.headers);
        const token = response.headers.get('x-auth');
        // login successful if there's a jwt token in the response
        if (user && token) {
          localStorage.setItem('x-auth', token);
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }));
  }

  login(username: string, password: string): Observable<HttpResponse<Object>> {
    return this.http.post<any>(`${baseUrl}/login`, { username, password })
      .pipe(map(response => {
        const user = response.body;
        const token = response.headers['x-auth'];
        // login successful if there's a jwt token in the response
        if (user && token) {
          localStorage.setItem('x-auth', token);
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    return this.http.delete<any>(`${baseUrl}/logout`)
      .pipe(map(() => {
          localStorage.removeItem('x-auth');
          localStorage.removeItem('currentUser');
      }));
  }

  getTokenFromLocalStorage(): string {
    return localStorage.getItem('x-auth');
  }
}
