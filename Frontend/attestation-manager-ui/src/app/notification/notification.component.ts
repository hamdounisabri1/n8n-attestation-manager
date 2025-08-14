import { Component } from '@angular/core';
import { NotificationData, NotificationsService } from '../services/notifications.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
message = '';
  type: NotificationData['type'] = 'info';
  visible = false;
  private sub!: Subscription;

  constructor(private notificationService: NotificationsService) {}

  ngOnInit() {
    this.sub = this.notificationService.notification$.subscribe(data => {
      this.message = data.message;
      this.type = data.type;
      this.visible = true;

      // Auto-hide after 3 seconds
      timer(3000).subscribe(() => this.visible = false);
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
