import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-login103',
  templateUrl: './login103.component.html',
  styleUrls: ['./login103.component.css']
})
export class Login103Component {

  user: any;
  loggedIn = false;


  constructor(private apiService: ApiService, private router: Router) {

     this.apiService.terminateSession();      // The /login/ route automatically logs out the current User
     this.user = new User();

  }

  login() {

    this.apiService.loginUser103(this.user).subscribe(
      success => {
        this.user = success.body;
        this.loggedIn = true;

        this.router.navigate(['/login103/']);
      },
      error => this.apiService.handleError(error)
    );
  }

}
