import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: any;

  constructor(private apiService: ApiService, private router: Router) {

     this.apiService.terminateSession();      // The /login/ route automatically logs out the current User
     this.user = new User();

  }

  login() {

    this.apiService.loginUser(this.user).subscribe(
      success => {
        // this.user = success.body;
        this.apiService.setCurrentUser(success.body);
        this.apiService.updateJwt(success.headers);

        this.router.navigate(['/jee103/']);
      },
      error => this.apiService.handleError(error)
    );
  }


}
