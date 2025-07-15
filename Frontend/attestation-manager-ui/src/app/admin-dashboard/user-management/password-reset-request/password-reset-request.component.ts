import { Component } from '@angular/core';

interface PasswordResetRequest {
  username: string;
  email: string;
  createdAt: string;
}
@Component({
  selector: 'app-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.css']
})
export class PasswordResetRequestComponent {
    searchTerm: string = ''; // ✅ ADD THIS LINE

resetRequests: PasswordResetRequest[] = [
    {
      username: 'john_doe',
      email: 'john@example.com',
      createdAt: '2025-07-15 09:30'
    },
    {
      username: 'sabri123',
      email: 'sabri@example.com',
      createdAt: '2025-07-14 17:42'
    }
    // You can add more sample requests here
  ];

  acceptRequest(request: PasswordResetRequest) {
    console.log(`Accepted reset request from ${request.username}`);
    // TODO: Add backend integration here
  }
  get filteredRequests() {
  return this.resetRequests.filter(request =>
    request.username.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}

}
