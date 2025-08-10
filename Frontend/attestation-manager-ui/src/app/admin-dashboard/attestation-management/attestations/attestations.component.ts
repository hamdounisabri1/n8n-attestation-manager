import { Component } from '@angular/core';
interface Attestation {
  id: number;
  studentName: string;
  studentId: string;
  studentClass: string;
  status: string;
  requestDate: string;
  delivreDate: string;
}
@Component({
  selector: 'app-attestations',
  templateUrl: './attestations.component.html',
  styleUrls: ['./attestations.component.css']
})
export class AttestationsComponent {
  searchTerm = '';

  attestations: Attestation[] = [
    { 
      id: 1, 
      studentName: 'John Doe', 
      studentId: 'STD001', 
      studentClass: 'Class A',
      status: 'Delivered',
      requestDate: '2025-01-15',
      delivreDate: '2025-01-20'
    },
    { 
      id: 2, 
      studentName: 'Jane Smith', 
      studentId: 'STD002', 
      studentClass: 'Class B',
      status: 'Pending',
      requestDate: '2025-01-18',
      delivreDate: '-'
    },
    // Add more sample attestations here
  ];

  get filteredAttestations() {
    return this.attestations.filter(attestation =>
      attestation.studentName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      attestation.studentId.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onView(attestation: Attestation) {
    alert(`View attestation for ${attestation.studentName}`);
    // Add navigation or modal logic here
  }

  onDelete(attestation: Attestation) {
    if (confirm(`Are you sure you want to delete attestation for ${attestation.studentName}?`)) {
      this.attestations = this.attestations.filter(a => a.id !== attestation.id);
    }
  }

  onPrint(attestation: Attestation) {
    alert(`Print attestation for ${attestation.studentName}`);
    // Add print logic here
  }

}
