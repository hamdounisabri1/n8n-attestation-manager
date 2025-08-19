import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../admin-dashboard/attestation-management/list-students/list-students.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private baseUrl = 'http://localhost:9090/api/students';
  private webhookUrl = 'https://eabb4e3bae4b.ngrok-free.app/webhook-test/7966ea91-8964-43ee-8403-1e4596c95f61';


  constructor(private http: HttpClient) {}

  // Create a student
  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.baseUrl}/create`, student);
  }

  // Get all students
  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/getAll`);
  }

  // Get student by id
  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/${id}`);
  }

  // Update student
  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.baseUrl}/update/${id}`, student);
  }

  // Delete student
  deleteStudent(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }


  /**
   * Uploads a file to the n8n webhook
   * @param file The file to upload
   */
  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('data', file); // "data" is the field name required

    // Optional headers (n8n usually doesn't require Content-Type for FormData)
    const headers = new HttpHeaders({});

    return this.http.post<any>(this.webhookUrl, formData, {
      headers,
      reportProgress: true,
      observe: 'events'
    });
  }
}
