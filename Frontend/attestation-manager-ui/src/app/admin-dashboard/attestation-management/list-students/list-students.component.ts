import { Component } from '@angular/core';
import { Attestation } from '../attestations/attestations.component';

export interface Student {
  id: number;
  fullName: string;
  email: string;
  studentClass: string;
  studentId: string;
  attestationsCount: number;
  attestations: Attestation[];
}

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent {
  searchTerm = '';
  currentUser = 'hamdounisabri1';
  currentDate = new Date('2025-08-10T17:12:24Z');

  students: Student[] = [

    // Add more sample students here
  ];

  get filteredStudents() {
    return this.students.filter(student =>
      student.fullName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onView(student: Student) {
    alert(`View student details for ${student.fullName}`);
    // Add navigation or modal logic here
  }

  onDelete(student: Student) {
    if (confirm(`Are you sure you want to delete student ${student.fullName}?`)) {
      this.students = this.students.filter(s => s.id !== student.id);
    }
  }
}