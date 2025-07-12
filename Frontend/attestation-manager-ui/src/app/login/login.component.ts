import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  shakeForm = false;
  errorMessage: string = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Remove validators, just initialize the form
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  onSubmit() {
    this.loading = true;
    this.errorMessage = '';

    const credentials = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.loading = false;
        this.router.navigate(['admin']);
        console.log('Login successful:', response);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error;
        this.shakeForm = true;
        setTimeout(() => this.shakeForm = false, 500);
      }
    });
  }
}