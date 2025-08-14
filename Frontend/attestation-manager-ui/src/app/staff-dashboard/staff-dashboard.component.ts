import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NotificationComponent } from '../notification/notification.component';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.css']
})
export class StaffDashboardComponent {
  constructor(private authService: AuthService,private notificationService: NotificationsService) {}
  logout() {
    this.authService.logout();
  }
    showMessage() {
    this.notificationService.show('File uploaded successfully!', 'success');
  }
}
