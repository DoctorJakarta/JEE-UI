import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ROUTES } from './app.routes';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { Jee101Component } from './components/jee101/jee101.component';
import { Jee102Component } from './components/jee102/jee102.component';
import { Jee103Component } from './components/jee103/jee103.component';
import { Jee104Component } from './components/jee104/jee104.component';

import { ApiService } from './services/api.service';
import { Login103Component } from './components/login103/login103.component';
import { Login104Component } from './components/login104/login104.component';


@NgModule({
  declarations: [
    AppComponent,
    Jee101Component,
    Jee102Component,
    Jee103Component,
    Jee104Component,
    Login103Component,
    Login104Component
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
