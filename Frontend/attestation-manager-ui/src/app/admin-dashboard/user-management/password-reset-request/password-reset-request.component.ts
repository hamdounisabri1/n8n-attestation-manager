import { Component } from '@angular/core';
import { User } from '../manage-users/manage-users.component';
import { ChnagePassRequestService } from 'src/app/services/chnage-pass-request.service';


export interface PasswordResetRequest {
  id?: number;
  status: RequestStatus;
  user: User;              // embed user object
  requestDate: string;
  updateDate: string;
}

export enum RequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

@Component({
  selector: 'app-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.css']
})
export class PasswordResetRequestComponent {

  searchTerm: string = '';
  resetRequests: PasswordResetRequest[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(private changePassRequestService: ChnagePassRequestService) {}

  ngOnInit() {
    this.fetchRequests();
  }

  fetchRequests() {
    this.loading = true;
    this.error = null;

    this.changePassRequestService.getAllRequests().subscribe({
      next: (requests) => {
        this.resetRequests = requests;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load requests';
        this.loading = false;
      }
    });
  }

  acceptRequest(request: PasswordResetRequest) {
    // Implement your accept logic, maybe calling backend update
  }

  rejectRequest(request: PasswordResetRequest) {
    // Implement your reject logic, maybe calling backend update
  }

  get filteredRequests() {
    return this.resetRequests.filter(request =>
      request.user.username.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getStatusClass(status: RequestStatus): string {
    switch (status) {
      case RequestStatus.PENDING: return 'status-pending';
      case RequestStatus.APPROVED: return 'status-accepted';
      case RequestStatus.REJECTED: return 'status-rejected';
      default: return '';
    }
  }}