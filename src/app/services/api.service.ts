import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Book } from '../model/book';

const KEY_JWT_ACCESS = 'jwt_access';
const KEY_USER_ID = 'user_id';
const KEY_USER_ROLE = 'user_role';
const KEY_USERNAME = 'username';

let service101: string;
let service102: string;
let service103: string;

const myHeaders = new HttpHeaders()
//                      . set('Authorization', 'Bearer ' + jwt )
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

  getJwtAccess() {
    if (!this.jwtAccess) { this.jwtAccess = localStorage.getItem(KEY_JWT_ACCESS); }
    return this.jwtAccess;
  }
  setJwtAccess(jwt: string) {
    // console.log(">>>>>>>>>> ApiService.setJwtAccess with: " + jwt);
    this.jwtAccess = jwt;
    localStorage.setItem(KEY_JWT_ACCESS, jwt);
  }

  jeeHeaders(jwt: any) {

        return new HttpHeaders()
          // .set('Content-Type', 'POST')  // This was necessary for OPTIONS request with HttpClient for CORS to avoid 403
          .set('Authorization', 'Bearer ' + jwt)
          .set('Content-Type', 'application/json');

  }

  handleError(error: any) {
    console.log('Got API error status: ' + error.status);
    // Do something like this.router.navigate(['/error']);
  }

  //
  // JEE-101 Services
  //

  readGreeting() {
    return this.http.get<Array<string>>(service101 + 'hello' , {observe: 'response', headers: this.jeeHeaders(this.getJwtAccess())});
  }

  //
  // JEE-102 Book Services
  //

  readBooks() {
    return this.http.get<Array<string>>(service102 + 'book');
  }

  readBook(id: number) {
    return this.http.get<Array<string>>(service102 + 'book/' + id);
  }

  createBook(book: Book) {
    return this.http.post<Array<string>>(service102 + 'book', JSON.stringify(book), {headers: myHeaders} );
  }

  updateBook(book: Book) {
    return this.http.put<Array<string>>(service102 + 'book', JSON.stringify(book), {headers: myHeaders} );
  }

  deleteBook(id: number) {
    return this.http.delete<Array<string>>(service102 + 'book/' + id, {headers: myHeaders} );
  }


}
