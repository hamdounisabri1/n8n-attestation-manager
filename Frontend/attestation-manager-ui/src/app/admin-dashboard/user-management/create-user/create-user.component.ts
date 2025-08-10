import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../manage-users/manage-users.component';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  userForm: FormGroup;
  showErrors = false;
  serverMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.userForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+([._]?[a-zA-Z]+)*$/)
        ]
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['STAFF', Validators.required] // default role STAFF uppercase
    });

    this.userForm.valueChanges.subscribe(() => {
      if (!this.showErrors && this.userForm.dirty) {
        this.showErrors = true;
      }
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;

      // Ensure role is uppercase to match backend enum
      const user: User = {
        ...formValue,
        role: formValue.role.toUpperCase()
      };

      this.authService.signup(user).subscribe({
        next: (msg) => {
          this.serverMessage = msg;  // Show success message from backend
          this.userForm.reset({ role: 'STAFF' });  // Reset form and keep role default
          this.showErrors = false;
        },
        error: (err) => {
          this.serverMessage = err.error || 'Signup failed';
        }
      });
    } else {
      console.log('Form is invalid');
      this.showErrors = true;
    }
  }
}
