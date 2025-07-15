import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { loginGuard } from './services/Guards/login.guard';
import { authGuard } from './services/Guards/auth.guard';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';
import { UserManagementComponent } from './admin-dashboard/user-management/user-management.component';
import { AttestationManagementComponent } from './admin-dashboard/attestation-management/attestation-management.component';
import { AdminDashboardHomeComponent } from './admin-dashboard/admin-dashboard-home/admin-dashboard-home.component';
import { CreateUserComponent } from './admin-dashboard/user-management/create-user/create-user.component';
import { ManageUsersComponent } from './admin-dashboard/user-management/manage-users/manage-users.component';
import { PasswordResetRequestComponent } from './admin-dashboard/user-management/password-reset-request/password-reset-request.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard]
  },

  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'users',
        component: UserManagementComponent,
        children: [
          { path: '', redirectTo: 'create', pathMatch: 'full' }, // default
          { path: 'create', component: CreateUserComponent },
          { path: 'manage', component: ManageUsersComponent },
          { path: 'change-passwords', component: PasswordResetRequestComponent }
        ]
      },
      { path: 'attestations', component: AttestationManagementComponent },
      { path: 'dashboard', component: AdminDashboardHomeComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  {
    path: 'staff',
    component: StaffDashboardComponent,
    canActivate: [authGuard]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
