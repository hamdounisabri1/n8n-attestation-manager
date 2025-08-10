// TypeScript remains mostly the same, just remove showErrors property
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-students',
  templateUrl: './create-students.component.html',
  styleUrls: ['./create-students.component.css']
})
export class CreateStudentsComponent {
  studentForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      studentName: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+(?:\s+[a-zA-Z]+)+$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      class: ['', [
        Validators.required,
        Validators.pattern(/^[1-5](A|B|ARCTIC)[1-9][0-9]?$|^[1-5](A|B|ARCTIC)100$/i)
      ]],
      studentId: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{3}[a-zA-Z]{3}[0-9]{4}$/)
      ]]
    });
  }

  // Helper methods for field validation
  isFieldInvalid(fieldName: string): boolean {
    const field = this.studentForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getErrorMessage(fieldName: string): string {
    const control = this.studentForm.get(fieldName);
    if (control && control.errors) {
      if (control.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (control.errors['pattern']) {
        switch (fieldName) {
          case 'studentName':
            return 'Name must contain at least two words with letters only';
          case 'class':
            return 'Class format should be like "4ARCTIC11"';
          case 'studentId':
            return 'Student ID must be 10 characters: 3 numbers + 3 letters + 4 numbers';
          default:
            return 'Invalid format';
        }
      }
      if (control.errors['email']) {
        return 'Invalid email format';
      }
    }
    return '';
  }

  onSubmit() {
    if (this.studentForm.valid) {
      console.log('Student Data:', {
        ...this.studentForm.value,
        attestationsCount: 0
      });
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onFileUpload() {
    if (this.selectedFile) {
      console.log('Uploading file:', this.selectedFile.name);
    }
  }
}