import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CombineLatestOperator } from 'rxjs/internal/observable/combineLatest';

@Component({
  selector: 'app-jee101',
  templateUrl: './jee101.component.html',
  styleUrls: ['./jee101.component.css']
})
export class Jee101Component implements OnInit {

  greeting: any;

  // tslint:disable-next-line:variable-name
  constructor(private _apiService: ApiService,
              private route: ActivatedRoute, private router: Router) {
   }

  getGreeting() {
    this._apiService.readGreeting101().subscribe(
      success => {
         this.greeting = success;
      },
      error => {
        alert('This greeting failed.');
      }
    );
  }

  ngOnInit() {
  }

}
