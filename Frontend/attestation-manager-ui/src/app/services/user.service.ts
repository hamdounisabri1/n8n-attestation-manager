import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../admin-dashboard/user-management/manage-users/manage-users.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 private baseUrl = 'http://localhost:9090/api/users'; // Adjust port if different

  constructor(private http: HttpClient) { }

  // Get all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl,);
  }

  // Delete user by id
  deleteUser(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/delete/${id}`);
  }

  // Update user by id
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/update/${id}`, user);
  }
}
