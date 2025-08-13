import { Component, OnInit } from '@angular/core';
import { Student } from '../list-students/list-students.component';
import { HttpClient } from '@angular/common/http';
export interface Attestation {
  id: number;
  refCode: string;
  status : AttestationStatus;
  requestDate: string;
  delivreDate: string;
  student : Student
}
export enum AttestationStatus {
  PENDING = 'PENDING',
  DELIVERED = 'DELIVERED',
  PRINTED = 'PRINTED'
}
@Component({
  selector: 'app-attestations',
  templateUrl: './attestations.component.html',
  styleUrls: ['./attestations.component.css']
})
export class AttestationsComponent implements OnInit {
  searchTerm = '';
  attestations: Attestation[] = [];
  AttestationStatus = AttestationStatus; // expose enum to HTML

  private apiUrl = 'http://localhost:9090/api/attestations/all';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAttestations();
  }

  loadAttestations() {
    this.http.get<Attestation[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.attestations = data;
      },
      error: (err) => {
        console.error('Error fetching attestations', err);
      },
    });
  }

  get filteredAttestations() {
    return this.attestations.filter(
      (attestation) =>
        attestation.student.fullName
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        attestation.student.studentId
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
    );
  }



  onDelete(attestation: Attestation) {
    if (
      confirm(
        `Are you sure you want to delete attestation for ${attestation.student.fullName}?`
      )
    ) {
      this.http
        .delete(`http://localhost:9090/api/attestations/${attestation.id}`, {
          responseType: 'text',
        })
        .subscribe({
          next: (response) => {
            alert(response);
            this.loadAttestations(); // reload after delete
          },
          error: (err) => {
            console.error('Delete failed', err);
          },
        });
    }
  }

  onPrint(attestation: Attestation) {
    alert(`Print attestation for ${attestation.student.fullName} And id ${attestation.id}`);
  }

}
