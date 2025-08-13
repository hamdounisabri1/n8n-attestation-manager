import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PasswordResetRequest } from '../admin-dashboard/user-management/password-reset-request/password-reset-request.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChnagePassRequestService {

   private baseUrl = 'http://localhost:9090/api/change-password-requests';

  constructor(private http: HttpClient) { }

  // Get all password reset requests
  getAllRequests(): Observable<PasswordResetRequest[]> {
    return this.http.get<PasswordResetRequest[]>(this.baseUrl);
  }

  // Get a single request by ID
  getRequestById(id: number): Observable<PasswordResetRequest> {
    return this.http.get<PasswordResetRequest>(`${this.baseUrl}/${id}`);
  }

  // Create a new change password request (without user assignment)
  createRequest(request: Partial<PasswordResetRequest>): Observable<PasswordResetRequest> {
    return this.http.post<PasswordResetRequest>(this.baseUrl, request);
  }

  // Create a change password request for a specific user by userId
  createRequestForUser(userId: number): Observable<PasswordResetRequest> {
    return this.http.post<PasswordResetRequest>(`${this.baseUrl}/user/${userId}`, {});
  }

  // Delete a change password request by ID
  deleteRequest(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${id}`);
  }
}
