import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { loginGuard } from './services/Guards/login.guard';
import { authGuard } from './services/Guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [loginGuard]  // Used as a function, not a service
  },
  { 
    path: 'admin', 
    component: AdminDashboardComponent,
    canActivate: [authGuard]   // Used as a function, not a service
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
