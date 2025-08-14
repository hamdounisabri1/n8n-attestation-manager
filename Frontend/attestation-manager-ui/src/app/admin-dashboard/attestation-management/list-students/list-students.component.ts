import { Component } from '@angular/core';
import { Attestation } from '../attestations/attestations.component';
import { StudentsService } from 'src/app/services/students.service';

export interface Student {
  id?: number; // optional or nullable
  fullName: string;
  email: string;
  studentClass: string;
  studentId: string;
  attestationsCount: number;
  attestations?: Attestation[];
}

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent {
  searchTerm = '';
  students: Student[] = [];
  currentUser = 'hamdounisabri1';
  currentDate = new Date('2025-08-10T17:12:24Z');

  constructor(private studentService: StudentsService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (data) => {
        this.students = data;
      },
      error: (err) => {
        console.error('Error fetching students', err);
      }
    });
  }

  get filteredStudents() {
    return this.students.filter(student =>
      student.fullName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onView(student: Student) {
    alert(`View student details for ${student.fullName}`);
    // You can replace this with navigation to a student detail page
  }

  onDelete(student: Student) {
    if (confirm(`Are you sure you want to delete student ${student.fullName}?`)) {
      this.studentService.deleteStudent(student.id!).subscribe({
        next: (response) => {
          alert(response);
          this.loadStudents(); // reload list after deletion
        },
        error: (err) => {
          console.error('Delete failed', err);
        }
      });
    }
  }
}