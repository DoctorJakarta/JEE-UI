import { RouterModule, Routes} from '@angular/router';

import { UserLoginComponent } from './components/user-login/user-login.component';
import { Jee101Component } from './components/jee101/jee101.component';
import { Jee102Component } from './components/jee102/jee102.component';
import { Jee103Component } from './components/jee103/jee103.component';

export const ROUTES: Routes = [

  {path: 'login', component: UserLoginComponent},
  {path: '', component: UserLoginComponent},
  {path: 'jee101', component: Jee101Component},
  {path: 'jee102', component: Jee102Component},
  {path: 'jee103', component: Jee103Component},
  {path: '**', component: UserLoginComponent}
];
