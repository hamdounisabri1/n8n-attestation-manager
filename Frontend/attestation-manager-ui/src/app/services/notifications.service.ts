import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface NotificationData {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private notificationSubject = new Subject<NotificationData>();
  notification$ = this.notificationSubject.asObservable();

  show(message: string, type: NotificationData['type'] = 'info') {
    this.notificationSubject.next({ message, type });
  }}
