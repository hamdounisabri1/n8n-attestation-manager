import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Attestation, AttestationStatus } from 'src/app/admin-dashboard/attestation-management/attestations/attestations.component';
import { AttestationService } from 'src/app/services/attestation.service';
import { jsPDF } from 'jspdf';



@Component({
  selector: 'app-staff-home',
  templateUrl: './staff-home.component.html',
  styleUrls: ['./staff-home.component.css']
})
export class StaffHomeComponent implements OnInit {
  searchTerm = '';
  selectedClass = 'All';
  attestations: Attestation[] = [];
  AttestationStatus = AttestationStatus;
  loading = false;
  errorMessage = '';




  classOptions = ['All', '1ère', '2ème', '3ème', '4ème', '5ème'];

  constructor(private attestationService: AttestationService) {}

  ngOnInit(): void {
    this.loadPendingAttestations();
  }

  loadPendingAttestations() {
    this.loading = true;
    this.attestationService.getAllAttestations().subscribe({
      next: (data) => {
        // Filter only PENDING attestations
        this.attestations = data.filter(att => att.status === AttestationStatus.PENDING);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching attestations:', error);
        this.errorMessage = 'Failed to load pending attestations. Please try again later.';
        this.loading = false;
      }
    });
  }

  get filteredAttestations() {
    return this.attestations.filter(attestation => {
      const matchesSearch =
        attestation.student.fullName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        attestation.student.studentId.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesClass =
        this.selectedClass === 'All' ||
        attestation.student.studentClass.startsWith(this.selectedClass[0]);

      return matchesSearch && matchesClass;
    });
  }

onPrint(attestation: Attestation): void {
  const doc = new jsPDF();

  // Load logo image
  const img = new Image();
  img.src = 'assets/logos/espritLOGO.png';

  img.onload = () => {
    // Add refCode at top-right corner
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(`Ref: ${attestation.refCode}`, 205, 15, { align: 'right' });

    // Add logo on top-left
    doc.addImage(img, 'PNG', 15, 5, 40, 20); // adjust position/size if needed

    // Title centered
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('Attestation de présence', 105, 60, { align: 'center' });

    // Student details
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    let y = 90;
    doc.text(`Nom de l'étudiant : ${attestation.student.fullName}`, 20, y);
    doc.text(`Identifiant : ${attestation.student.studentId}`, 20, y + 15);
    doc.text(`Classe : ${attestation.student.studentClass}`, 20, y + 30);

    // Generate a real PDF Blob
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Create hidden iframe to open print dialog
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = pdfUrl;
    document.body.appendChild(iframe);

    iframe.onload = () => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    };
  };

  // Update attestation status after printing
  this.attestationService
    .updateAttestationStatus(attestation.id, AttestationStatus.PRINTED)
    .subscribe({
      next: (updatedAttestation: Attestation) => {
        this.attestations = this.attestations.filter(
          a => a.id !== updatedAttestation.id
        );
      },
      error: (error) => {
        console.error('Error updating attestation status:', error);
        alert('Failed to update attestation status. Please try again.');
      } 
    }); 
}









  onView(attestation: Attestation) {}
}
