import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-login104',
  templateUrl: './login104.component.html',
  styleUrls: ['./login104.component.css']
})
export class Login104Component {

  user: any;

  constructor(private apiService: ApiService, private router: Router) {

     this.apiService.terminateSession();      // The /login/ route automatically logs out the current User
     this.user = new User();

  }

  login() {

    this.apiService.loginUser104(this.user).subscribe(
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
