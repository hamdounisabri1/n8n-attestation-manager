import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {



  private readonly API_URL = 'http://localhost:9090/api/auth'; // Update with your Spring Boot URL

  constructor(private http: HttpClient,    private router: Router) {}

  login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap(response => {
          // Store the JWT token
          localStorage.setItem('token', response.token);
        }),
        catchError(this.handleError)
      );
  }
    getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    // JWT is base64 encoded: header.payload.signature
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;
    } catch (e) {
      return null;
    }
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      if (error.status === 404) {
        errorMessage = 'User not found';
      } else if (error.status === 401) {
        errorMessage = 'Invalid password';
      }
    }
    console.error('Error:', errorMessage);
    return throwError(() => errorMessage);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
