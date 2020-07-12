import { RouterModule, Routes} from '@angular/router';

import { Jee101Component } from './components/jee101/jee101.component';
import { Jee102Component } from './components/jee102/jee102.component';
import { Jee103Component } from './components/jee103/jee103.component';
import { Jee104Component } from './components/jee104/jee104.component';
import { Login103Component } from './components/login103/login103.component';
import { Login104Component } from './components/login104/login104.component';

export const ROUTES: Routes = [

  {path: 'jee101', component: Jee101Component},
  {path: 'jee102', component: Jee102Component},
  {path: 'jee103', component: Jee103Component},
  {path: 'jee104', component: Jee104Component},
  {path: 'login103', component: Login103Component},
  {path: 'login104', component: Login104Component},
  {path: '', component: Login103Component},
  {path: '**', component: Login103Component}
];
