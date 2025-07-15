import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';
import { HeaderAdminComponent } from './admin-dashboard/header-admin/header-admin.component';
import { UserManagementComponent } from './admin-dashboard/user-management/user-management.component';
import { AttestationManagementComponent } from './admin-dashboard/attestation-management/attestation-management.component';
import { AdminDashboardHomeComponent } from './admin-dashboard/admin-dashboard-home/admin-dashboard-home.component';
import { NgChartsModule } from 'ng2-charts';
import { CreateUserComponent } from './admin-dashboard/user-management/create-user/create-user.component';
import { SidebarAdminComponent } from './admin-dashboard/user-management/sidebar-admin/sidebar-admin.component';
import { ManageUsersComponent } from './admin-dashboard/user-management/manage-users/manage-users.component';
import { PasswordResetRequestComponent } from './admin-dashboard/user-management/password-reset-request/password-reset-request.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    StaffDashboardComponent,
    HeaderAdminComponent,
    UserManagementComponent,
    AttestationManagementComponent,
    AdminDashboardHomeComponent,
    SidebarAdminComponent,
    CreateUserComponent,
    ManageUsersComponent,
    PasswordResetRequestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
