import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: any;

  constructor(private apiService: ApiService) {

      this.user = new User();

  }

  login() {

    this.apiService.login(this.user).subscribe(
      success => {
        this.user = success;
      },
      error => this.apiService.handleError(error)
    );
  }


}
