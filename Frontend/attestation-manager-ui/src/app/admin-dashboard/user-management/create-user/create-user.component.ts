import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  userForm: FormGroup;
  showErrors = false;

  constructor(private fb: FormBuilder) {
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
      role: ['', Validators.required]
    });

    // Watch for changes and show the error card only after interaction
    this.userForm.valueChanges.subscribe(() => {
      if (!this.showErrors && this.userForm.dirty) {
        this.showErrors = true;
      }
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('User Data:', this.userForm.value);
      this.showErrors = false; // hide error card
    } else {
      console.log('Form is invalid');
    }
  }
}
