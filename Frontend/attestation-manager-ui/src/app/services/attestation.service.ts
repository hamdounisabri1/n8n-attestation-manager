import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Attestation, AttestationStatus } from '../admin-dashboard/attestation-management/attestations/attestations.component';

@Injectable({
  providedIn: 'root'
})
export class AttestationService {

  private baseUrl = 'http://localhost:9090/api/attestations';
    private webhookUrl = 'https://eceb427568fb.ngrok-free.app/webhook-test/7966ea91-8964-43ee-8403-1e4596c95f61';


  constructor(private http: HttpClient) { }

  // GET all attestations
  getAllAttestations(): Observable<Attestation[]> {
    return this.http.get<Attestation[]>(`${this.baseUrl}/all`);
  }

  // GET attestation by ID
  getAttestationById(id: number): Observable<Attestation> {
    return this.http.get<Attestation>(`${this.baseUrl}/${id}`);
  }

  // CREATE attestation
  createAttestation(attestation: Attestation): Observable<Attestation> {
    return this.http.post<Attestation>(`${this.baseUrl}/create`, attestation);
  }

  // CREATE attestation for a specific student
  createAttestationForStudent(studentId: number, attestation: Attestation): Observable<Attestation> {
    return this.http.post<Attestation>(`${this.baseUrl}/create/student/${studentId}`, attestation);
  }

  // UPDATE status
  updateAttestationStatus(id: number, status: AttestationStatus): Observable<Attestation> {
    return this.http.patch<Attestation>(`${this.baseUrl}/${id}/status?status=${status}`, {});
  }

  // DELETE attestation
  deleteAttestation(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
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
