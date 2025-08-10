import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { SidebarAdmin2Component } from './admin-dashboard/attestation-management/sidebar-admin2/sidebar-admin2.component';
import { AttestationsComponent } from './admin-dashboard/attestation-management/attestations/attestations.component';
import { ListStudentsComponent } from './admin-dashboard/attestation-management/list-students/list-students.component';
import { CreateStudentsComponent } from './admin-dashboard/attestation-management/create-students/create-students.component';
import { AuthInterceptor } from './services/Interceptors/auth.interceptor';

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
    SidebarAdmin2Component,
    AttestationsComponent,
    ListStudentsComponent,
    CreateStudentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
    FormsModule
  ],
  providers: [
      {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
