import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from '../services/auth.guard';


import { DashboardComponent } from './dashboard.component';
import { dashboradRoutes } from './dashboard.routes';

const rutasHijas : Routes = [

  {
    path: '', 
    component: DashboardComponent,
    children: dashboradRoutes,
    //canActivate: [ AuthGuard]
},

]



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(rutasHijas)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
