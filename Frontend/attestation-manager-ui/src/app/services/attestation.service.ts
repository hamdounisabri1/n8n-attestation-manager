import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Attestation, AttestationStatus } from '../admin-dashboard/attestation-management/attestations/attestations.component';

@Injectable({
  providedIn: 'root'
})
export class AttestationService {

  private baseUrl = 'http://localhost:9090/attestations';

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

}
