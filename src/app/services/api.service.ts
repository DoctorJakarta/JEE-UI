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
let service104: string;


const headers102 = new HttpHeaders()
                        . set('Content-Type', 'application/json' );


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  user: User;

  JWT_ACCESS_HEADER = 'Jwt-Access';
  TIMEOUT_HEADER = 'Timeout-Seconds';

  jwtAccess;
  timeoutSeconds;

  warnSecondsRemain = 60;
  expSecondsRemain = this.warnSecondsRemain;
  interval;


  constructor( private router: Router, private http: HttpClient) {

    service101 = 'http://localhost:8080/JEE-101/api/v1.0/';
    service102 = 'http://localhost:8080/JEE-102/api/v1.0/';
    service103 = 'http://localhost:8080/JEE-103/api/v1.0/';
    service104 = 'http://localhost:8080/JEE-104/api/v1.0/';
  }

  //
  // JEE-103 JWT Authentication services
  // Note: Tried to move this to a JwtService, but that caused a circular dependency that broke initialization
  //      ApiService called JwtService to get header
  //      JwtService called ApiService to refresh jwt when called by the js prompt
  //

  setCurrentUser(user: any) { this.user = user; }
  getCurrentUser() { return this.user; }
  isLoggedIn() {
    if (this.jwtAccess) {
      return true;
    } else {
      return false;
    }
  }

  getAuthzHeaders() {

        return new HttpHeaders()
          // .set('Content-Type', 'POST')  // This was necessary for OPTIONS request with HttpClient for CORS to avoid 403
          .set('Authorization', 'Bearer ' + this.getJwtAccess())
          .set('Content-Type', 'application/json');

  }

  handleError(error: any) {
    console.log('Got API error status: ' + error.status);
    // Do something like this.router.navigate(['/error']);
  }



  getJwtAccess() {
    if (!this.jwtAccess) { this.jwtAccess = localStorage.getItem(KEY_JWT_ACCESS); }
    return this.jwtAccess;
  }

  setJwtAccess(jwt: string) {
    //console.log('>>>>>>>>>> ApiService.setJwtAccess with: ' + jwt);
    this.jwtAccess = jwt;
    localStorage.setItem(KEY_JWT_ACCESS, jwt);
  }


  getSecondsRemaining() { return this.expSecondsRemain; }

  updateJwt(headers: HttpHeaders) {
    let expSeconds = null;
    let jwtAccess = null;
    if (headers != null) {
      expSeconds = headers.get(this.TIMEOUT_HEADER);
      jwtAccess = headers.get(this.JWT_ACCESS_HEADER);
    }

    this.setJwtAccess(jwtAccess);

    // console.log("Restarting Timer with expSeconds: " + expSeconds + " and jwtAccess: " + jwtAccess);

    clearInterval(this.interval);
    this.expSecondsRemain = 0;          // Clear time remaining for rest interval
    this.interval = setInterval(() => {
      if (this.expSecondsRemain > 0) {
        this.expSecondsRemain--;
        if ( this.expSecondsRemain%10 === 0 ) console.log( this.getSecondsRemaining() + ' seconds remaining.');
      } else {
        this.expSecondsRemain = expSeconds;
      }
      if (this.expSecondsRemain === this.warnSecondsRemain) {
        const keepSession = confirm('Session timing out in ' + this.warnSecondsRemain + ' seconds.  Keep session alive?');

        if (keepSession === true) {
          console.log('Extending session...');
          this.continueSession();
        } else {
          console.log('Not extending session...');
          this.terminateSession();
        }
      }
    }, 1000);
  }

  continueSession() {
    this.refreshUser104().subscribe(
      success => {
        this.updateJwt(success.headers);
      },
      err => this.handleError(err)
    );
  }

  terminateSession() {
      this.user = null;
      this.updateJwt(null);
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
  // JEE-103 User Services
  //

  readUsers103() {
    return this.http.get<Array<string>>(service103 + 'user', {headers: headers102} );
  }

  readUser103(id: number) {
    return this.http.get<Array<string>>(service103 + 'user/' + id, {headers: headers102} );
  }

  createUser103(user: User) {
    return this.http.post<Array<string>>(service103 + 'user', JSON.stringify(user), {headers: headers102} );
  }


  //
  //  JEE-103 Login/Logout/Refresh Services
  //
  loginUser103(user: User) {
    return this.http.post<Array<string>>(service103 + 'auth/login', JSON.stringify(user), { observe: 'response', headers: this.getAuthzHeaders() } );
  }



  //
  //  JEE-104 Login/Logout/Refresh Services
  //
  loginUser104(user: User) {
    return this.http.post<Array<string>>(service104 + 'auth/login', JSON.stringify(user), { observe: 'response', headers: this.getAuthzHeaders() } );
  }
  refreshUser104() {
    return this.http.get<Array<string>>(service104 + 'auth/refresh', { observe: 'response', headers: this.getAuthzHeaders() } );
  }

  //
  // JEE-104 Authorized Book Services
  //         Services now 'observe' which requires pulling the success.body and success.headers
  //

  readBooks104() {
    return this.http.get<Array<string>>(service104 + 'book', { observe: 'response', headers: this.getAuthzHeaders() });
  }

  readBook104(id: number) {
    return this.http.get<Array<string>>(service104 + 'book/' + id, { observe: 'response', headers: this.getAuthzHeaders() });
  }

  createBook104(book: Book) {
    return this.http.post<Array<string>>(service104 + 'authz/book', JSON.stringify(book), { observe: 'response', headers: this.getAuthzHeaders() } );
  }

  updateBook104(book: Book) {
    return this.http.put<Array<string>>(service104 + 'authz/book', JSON.stringify(book), { observe: 'response', headers: this.getAuthzHeaders()} );
  }

  deleteBook104(id: number) {
    return this.http.delete<Array<string>>(service104 + 'authz/book/' + id, { observe: 'response', headers:  this.getAuthzHeaders()} );
  }


  //
  // JEE-104 Authorized User Services
  //

  readUsers104() {
    return this.http.get<Array<string>>(service104 + 'authz/user', { observe: 'response', headers: this.getAuthzHeaders() });
  }

  readUser104(id: number) {
    return this.http.get<Array<string>>(service104 + 'authz/user/' + id, { observe: 'response', headers: this.getAuthzHeaders() });
  }

  createUser104(user: User) {
    return this.http.post<Array<string>>(service104 + 'authz/user', JSON.stringify(user), { observe: 'response', headers: this.getAuthzHeaders() } );
  }

  updateUser104(user: User) {
    return this.http.put<Array<string>>(service104 + 'authz/user', JSON.stringify(user), { observe: 'response', headers: this.getAuthzHeaders()} );
  }

  deleteUser104(id: number) {
    return this.http.delete<Array<string>>(service104 + 'authz/user/' + id, { observe: 'response', headers:  this.getAuthzHeaders()} );
  }
}
