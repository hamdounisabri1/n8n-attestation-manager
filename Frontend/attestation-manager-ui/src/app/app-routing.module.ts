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
import { AttestationsComponent } from './admin-dashboard/attestation-management/attestations/attestations.component';
import { ListStudentsComponent } from './admin-dashboard/attestation-management/list-students/list-students.component';
import { CreateStudentsComponent } from './admin-dashboard/attestation-management/create-students/create-students.component';
import { StaffHomeComponent } from './staff-dashboard/staff-home/staff-home.component';
import { DeliveryManagementComponent } from './staff-dashboard/delivery-management/delivery-management.component';

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
      { path: 'attestations', component: AttestationManagementComponent,
        children: [
          { path: '', redirectTo: 'ListStudents', pathMatch: 'full' },
          { path: 'listAttestations', component: AttestationsComponent },
          { path: 'ListStudents', component: ListStudentsComponent },
          { path: 'AddStudent', component: CreateStudentsComponent },
        ]
       },
      { path: 'dashboard', component: AdminDashboardHomeComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  {
    path: 'staff',
    component: StaffDashboardComponent,
    canActivate: [authGuard],
    children: [
       {
        path: 'home',
        component: StaffHomeComponent 
       },
        {
        path: 'deliveries',
        component: DeliveryManagementComponent 
       }

    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
