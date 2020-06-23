import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Book } from 'src/app/model/book';
import { User, USER_ROLE  } from 'src/app/model/user';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-jee103',
  templateUrl: './jee103.component.html',
  styleUrls: ['./jee103.component.css']
})
export class Jee103Component {

  books: any;
  book: any;
  users: any;
  user: any;
  USER_ROLE = USER_ROLE;
  userRoleNames = User.getUserRoleNames();
  loggedIn = false;
  isAdmin = true;
  showLogin = false;

  currentUser: any;

  constructor(private apiService: ApiService) {

    this.books = this.getBooks();
    this.users = this.getUsers();

    this.currentUser = apiService.getCurrentUser();
  }

  isLoggedIn() {
    return (this.apiService.getCurrentUser() != null);
  }

  getUserRoleKeys() {
    return Array.from(this.userRoleNames.keys());
  }

  getBooks() {
    this.apiService.readBooks103().subscribe(
      success => {
        this.books = success.body;
        this.apiService.updateJwt(success.headers);
      },
      error => this.apiService.handleError(error)
    );
  }

  getUsers() {
    this.apiService.readUsers103().subscribe(
      success => {
        this.users = success.body;
        this.apiService.updateJwt(success.headers);
      },
      error => this.apiService.handleError(error)
    );
  }

  showAddBook() {
    this.book = new Book();
  }
  showEditBook(id: number) {
    console.log('Showing edit bookID: ' + id);
    this.apiService.readBook103(id).subscribe(
      success => {
        this.book = success.body;
        this.apiService.updateJwt(success.headers);
      },
      error => this.apiService.handleError(error)
    );
  }


  showAddUser() {
    this.user = new User();
    this.user.role = USER_ROLE.PUBLIC;    // Set default option
  }
  showEditUser(id: number) {
    console.log('Showing edit bookID: ' + id);
    this.apiService.readUser103(id).subscribe(
      success => {
        this.user = success.body;
        this.apiService.updateJwt(success.headers);
      },
      error => this.apiService.handleError(error)
    );
  }


  upsertBook() {
    let apiServiceRequest;
    if (this.book.id) {
      apiServiceRequest = this.apiService.updateBook103(this.book);
    } else {
      apiServiceRequest = this.apiService.createBook103(this.book);
    }

    apiServiceRequest.subscribe(
      success => {
        this.getBooks();
        this.book = null;
      },
      error => this.apiService.handleError(error)
    );
  }

  deleteBook(id: number) {
    if (confirm('Are you sure you want to delete the book?')) {
      this.apiService.deleteBook103(id).subscribe(
        success => {
          this.getBooks();
        },
        error => this.apiService.handleError(error)
      );
    }
  }

  upsertUser() {
    let apiServiceRequest;
    if (this.user.id) {
      apiServiceRequest = this.apiService.updateUser103(this.user);
    } else {
      apiServiceRequest = this.apiService.createUser103(this.user);
    }

    apiServiceRequest.subscribe(
      success => {
        this.getUsers();
        this.user = null;
      },
      error => this.apiService.handleError(error)
    );
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete the user?')) {
      this.apiService.deleteUser103(id).subscribe(
        success => {
          this.getUsers();
        },
        error => this.apiService.handleError(error)
      );
    }
  }
}
