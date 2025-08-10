import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';


export interface User {
  id?: number;
  username: string;
  password: string;
  email: string;
  role: string;
  createdAt?: string;
}
@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent {
 searchTerm = '';
 users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  // Fetch users from backend
  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users) => this.users = users,
      error: (err) => console.error('Failed to load users', err)
    });
  }

  get filteredUsers() {
    return this.users.filter(user =>
      user.username.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onView(user: User) {
    alert(`View user ${user.username}`);
    // Add navigation or modal logic here
  }

  // Use backend to delete user
  onDelete(user: User) {
    if (confirm(`Are you sure you want to delete ${user.username}?`)) {
      this.userService.deleteUser(user.id!).subscribe({
        next: () => {
          // Remove user locally after successful deletion
          this.users = this.users.filter(u => u.id !== user.id);
              this.loadUsers();
        },
        error: (err) => console.error('Failed to delete user', err)
      });
    }
  }
}
