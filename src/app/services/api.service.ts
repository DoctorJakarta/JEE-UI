import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Book } from '../model/book';
import { User } from '../model/user';

const KEY_JWT_ACCESS = 'jwt_access';
const KEY_USER_ID = 'user_id';
const KEY_USER_ROLE = 'user_role';
const KEY_USERNAME = 'username';

let service101: string;
let service102: string;
let service103: string;

const headers102 = new HttpHeaders()
                        . set('Content-Type', 'application/json' );


@Injectable({
  providedIn: 'root'
})
export class ApiService {

    jwtAccess: string;

    constructor(private router: Router, private http: HttpClient) {

    service101 = 'http://localhost:8080/JEE-101/api/v1.0/';
    service102 = 'http://localhost:8080/JEE-102/api/v1.0/';
    service103 = 'http://localhost:8080/JEE-103/api/v1.0/';
  }

  isLoggedIn() {
    if (this.jwtAccess) { return true; }
    else { return false; }
  }

  getJwtAccess() {
    if (!this.jwtAccess) { this.jwtAccess = localStorage.getItem(KEY_JWT_ACCESS); }
    return this.jwtAccess;
  }
  
  setJwtAccess(jwt: string) {
    // console.log(">>>>>>>>>> ApiService.setJwtAccess with: " + jwt);
    this.jwtAccess = jwt;
    localStorage.setItem(KEY_JWT_ACCESS, jwt);
  }

  getAuthzHeaders() {

        return new HttpHeaders()
          // .set('Content-Type', 'POST')  // This was necessary for OPTIONS request with HttpClient for CORS to avoid 403
          .set('Authorization', 'Bearer ' + this.jwtAccess)
          .set('Content-Type', 'application/json');

  }

  handleError(error: any) {
    console.log('Got API error status: ' + error.status);
    // Do something like this.router.navigate(['/error']);
  }

  //
  // JEE-101 Services
  //

  readGreeting101() {
    return this.http.get<Array<string>>(service101 + 'hello');
  }

  //
  // JEE-102 Book Services
  //

  readBooks102() {
    return this.http.get<Array<string>>(service102 + 'book');
  }

  readBook102(id: number) {
    return this.http.get<Array<string>>(service102 + 'book/' + id);
  }

  createBook102(book: Book) {
    return this.http.post<Array<string>>(service102 + 'book', JSON.stringify(book), {headers: headers102} );
  }

  updateBook102(book: Book) {
    return this.http.put<Array<string>>(service102 + 'book', JSON.stringify(book), {headers: headers102} );
  }

  deleteBook102(id: number) {
    return this.http.delete<Array<string>>(service102 + 'book/' + id, {headers: headers102} );
  }


  
  //
  // Login/Logout/Refresh Services
  //
  login(user: User) {
    return this.http.post<Array<string>>(service103 + 'auth/login', JSON.stringify(user), { observe: 'response', headers: this.getAuthzHeaders() } );
  }


  //
  // JEE-103 Authorized Book Services
  //

  readBooks103() {
    return this.http.get<Array<string>>(service103 + 'book');
  }

  readBook103(id: number) {
    return this.http.get<Array<string>>(service103 + 'book/' + id);
  }

  createBook103(book: Book) {
    return this.http.post<Array<string>>(service103 + 'authz/book', JSON.stringify(book), { observe: 'response', headers: this.getAuthzHeaders() } );
  }

  updateBook103(book: Book) {
    return this.http.put<Array<string>>(service103 + 'authz/book', JSON.stringify(book), { observe: 'response', headers: this.getAuthzHeaders()} );
  }

  deleteBook103(id: number) {
    return this.http.delete<Array<string>>(service103 + 'authz/book/' + id, { observe: 'response', headers:  this.getAuthzHeaders()} );
  }

  
  //
  // JEE-103 Authorized User Services
  //

  readUsers103() {
    return this.http.get<Array<string>>(service103 + 'authz/user');
  }

  readUser103(id: number) {
    return this.http.get<Array<string>>(service103 + 'authz/user/' + id);
  }

  createUser103(user: User) {
    return this.http.post<Array<string>>(service103 + 'authz/user', JSON.stringify(user), { observe: 'response', headers: this.getAuthzHeaders() } );
  }

  updateUser103(user: User) {
    return this.http.put<Array<string>>(service103 + 'authz/user', JSON.stringify(user), { observe: 'response', headers: this.getAuthzHeaders()} );
  }

  deleteUser103(id: number) {
    return this.http.delete<Array<string>>(service103 + 'authz/user/' + id, { observe: 'response', headers:  this.getAuthzHeaders()} );
  }
}
