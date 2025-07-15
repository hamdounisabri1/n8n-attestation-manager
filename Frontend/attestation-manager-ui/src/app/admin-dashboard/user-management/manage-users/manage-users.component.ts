import { Component } from '@angular/core';


interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt: string;
}
@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent {
 searchTerm = '';

  users: User[] = [
    { id: 1, username: 'john.doe', email: 'john@example.com', role: 'Admin', createdAt: '2024-12-01' },
    { id: 2, username: 'jane.smith', email: 'jane@example.com', role: 'Staff', createdAt: '2025-01-15' },
    { id: 3, username: 'ahmed.ben', email: 'ahmed@example.com', role: 'Staff', createdAt: '2025-04-08' },
    { id: 3, username: 'ahmed.ben', email: 'ahmed@example.com', role: 'Staff', createdAt: '2025-04-08' },
    { id: 3, username: 'ahmed.ben', email: 'ahmed@example.com', role: 'Staff', createdAt: '2025-04-08' },
    { id: 3, username: 'ahmed.ben', email: 'ahmed@example.com', role: 'Staff', createdAt: '2025-04-08' },
    { id: 3, username: 'ahmed.ben', email: 'ahmed@example.com', role: 'Staff', createdAt: '2025-04-08' },
    { id: 3, username: 'ahmed.ben', email: 'ahmed@example.com', role: 'Staff', createdAt: '2025-04-08' },
    { id: 3, username: 'ahmed.ben', email: 'ahmed@example.com', role: 'Staff', createdAt: '2025-04-08' },
    { id: 3, username: 'ahmed.ben', email: 'ahmed@example.com', role: 'Staff', createdAt: '2025-04-08' },
    { id: 3, username: 'ahmed.ben', email: 'ahmed@example.com', role: 'Staff', createdAt: '2025-04-08' },
    { id: 3, username: 'ahmed.ben', email: 'ahmed@example.com', role: 'Staff', createdAt: '2025-04-08' },
    { id: 3, username: 'ahmed.ben', email: 'ahmed@example.com', role: 'Staff', createdAt: '2025-04-08' },
    { id: 3, username: 'ahmed.ben', email: 'ahmed@example.com', role: 'Staff', createdAt: '2025-04-08' },
    { id: 3, username: 'ahmed.ben', email: 'ahmed@example.com', role: 'Staff', createdAt: '2025-04-08' },
    { id: 3, username: 'ahmed.ben', email: 'ahmed@example.com', role: 'Staff', createdAt: '2025-04-08' },
    // Add more sample users here
  ];

  get filteredUsers() {
    return this.users.filter(user =>
      user.username.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onView(user: User) {
    alert(`View user ${user.username}`);
    // Add navigation or modal logic here
  }

  onDelete(user: User) {
    if (confirm(`Are you sure you want to delete ${user.username}?`)) {
      this.users = this.users.filter(u => u.id !== user.id);
    }
  }
}
