import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/book';

@Component({
  selector: 'app-jee102',
  templateUrl: './jee102.component.html',
  styleUrls: ['./jee102.component.css']
})
export class Jee102Component {

  books: any;
  book: any;

  constructor(private apiService: ApiService) {

    this.books = this.getBooks();

  }


    // newBook() { this.router.navigate(['book', PAGE_TYPE.NEW_BOOK]); }

     getBooks() {
        this.apiService.readBooks().subscribe(
            success => {
                this.books = success;
                console.log('Got Books: ' + this.books);
            },
            error => this.apiService.handleError(error)
        );
    }

  showAdd() {
    this.book = new Book();
  }
  showEdit(id: number) {
    console.log('Showing edit bookID: ' + id);
    this.apiService.readBook(id).subscribe(
      success => {
        this.book = success;
      },
      error => this.apiService.handleError(error)
    );
  }


  upsertBook() {
    let apiServieRequest;
    if (this.book.id) { apiServieRequest = this.apiService.updateBook(this.book); }
    else { apiServieRequest = this.apiService.createBook(this.book); }

    apiServieRequest.subscribe(
      success => {
        this.getBooks();
        this.book = null;
      },
      error => this.apiService.handleError(error)
    );
  }

  deleteBook(id: number) {
    if (confirm('Are you sure you want to delete the book?')) {
      this.apiService.deleteBook(id).subscribe(
        success => {
          this.getBooks();
        },
        error => this.apiService.handleError(error)
      );
    }
}

}
