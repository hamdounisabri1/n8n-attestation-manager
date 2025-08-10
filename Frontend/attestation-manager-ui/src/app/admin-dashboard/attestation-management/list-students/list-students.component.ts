import { Component } from '@angular/core';

interface Student {
  id: number;
  name: string;
  email: string;
  class: string;
  studentId: string;
  attestationsCount: number;
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
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john.doe@example.com',
      class: 'Class A',
      studentId: 'STD001',
      attestationsCount: 3
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane.smith@example.com',
      class: 'Class B',
      studentId: 'STD002',
      attestationsCount: 1
    },
    { 
      id: 3, 
      name: 'Ahmed Ben', 
      email: 'ahmed.ben@example.com',
      class: 'Class A',
      studentId: 'STD003',
      attestationsCount: 0
    },
    // Add more sample students here
  ];

  get filteredStudents() {
    return this.students.filter(student =>
      student.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onView(student: Student) {
    alert(`View student details for ${student.name}`);
    // Add navigation or modal logic here
  }

  onDelete(student: Student) {
    if (confirm(`Are you sure you want to delete student ${student.name}?`)) {
      this.students = this.students.filter(s => s.id !== student.id);
    }
  }
}