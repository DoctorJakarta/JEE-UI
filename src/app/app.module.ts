import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ROUTES } from './app.routes';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { Jee101Component } from './components/jee101/jee101.component';
import { Jee102Component } from './components/jee102/jee102.component';
import { Jee103Component } from './components/jee103/jee103.component';

import { ApiService } from './services/api.service';


@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    Jee101Component,
    Jee102Component,
    Jee103Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload'}),
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
