import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:3000/users';

@Injectable()
export class AuthService {


  constructor(private http: HttpClient) { }

  signup(user) {
    const newUser = user;
    return this.http.post( baseUrl, newUser);
  }
}
