import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from 'src/app/services/students.service';
import { Student } from '../list-students/list-students.component';
import { NotificationComponent } from 'src/app/notification/notification.component';
import { NotificationsService } from 'src/app/services/notifications.service';


@Component({
  selector: 'app-create-students',
  templateUrl: './create-students.component.html',
  styleUrls: ['./create-students.component.css']
})
export class CreateStudentsComponent {


  studentForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private studentService: StudentsService,private notificationService: NotificationsService) {
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

  // Field validation helpers
  isFieldInvalid(fieldName: string): boolean {
    const field = this.studentForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getErrorMessage(fieldName: string): string {
    const control = this.studentForm.get(fieldName);
    if (!control || !control.errors) return '';
    if (control.errors['required']) return `${fieldName} is required`;
    if (control.errors['pattern']) {
      switch (fieldName) {
        case 'studentName': return 'Name must contain at least two words with letters only';
        case 'class': return 'Class format should be like "4ARCTIC11"';
        case 'studentId': return 'Student ID must be 10 characters: 3 numbers + 3 letters + 4 numbers';
        default: return 'Invalid format';
      }
    }
    if (control.errors['email']) return 'Invalid email format';
    return '';
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const newStudent: Student = {
        fullName: this.studentForm.value.studentName,
        email: this.studentForm.value.email,
        studentClass: this.studentForm.value.class,
        studentId: this.studentForm.value.studentId,
        attestationsCount: 0,
        attestations: []
      };

      this.studentService.createStudent(newStudent).subscribe({
        next: (student) => {
          alert(`Student ${student.fullName} created successfully!`);
          this.studentForm.reset();
        },
        error: (err) => {
          console.error('Failed to create student', err);
        }
      });
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) this.selectedFile = file;
  }

onFileUpload() {
  if (this.selectedFile) {
    this.studentService.uploadFile(this.selectedFile).subscribe({
      next: (event) => {
        console.log('File upload event:', event);

        // Reset file input before showing alert
        this.selectedFile = null;
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = ''; // clears the actual input field
        }

        // Show success alert
        this.notificationService.show('File uploaded successfully!', 'success');
      },
      error: (err) => {
        console.error('File upload failed', err);
        this.notificationService.show('File upload failed!', 'error');
      }
    });
  } else {
    alert('Please select a file first!');
  }
}


}
