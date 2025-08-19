import { Component } from '@angular/core';
import { Attestation, AttestationStatus } from 'src/app/admin-dashboard/attestation-management/attestations/attestations.component';
import { AttestationService } from 'src/app/services/attestation.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-delivery-management',
  templateUrl: './delivery-management.component.html',
  styleUrls: ['./delivery-management.component.css']
})
export class DeliveryManagementComponent {
  searchTerm = '';
  attestations: Attestation[] = [];
  AttestationStatus = AttestationStatus;
  loading = false;
  errorMessage = '';

refCode: string = '';
selectedFile: File | null = null;


classOptions = ['All classes', '1ère', '2ème', '3ème', '4ème', '5ème'];
selectedClass = 'All classes';


statusOptions = ['All statuses', 'Printed', 'Delivered'];
selectedStatus = 'All statuses';


  constructor(private attestationService: AttestationService,private notificationService: NotificationsService) {}

  ngOnInit(): void {
    this.loadPendingAttestations();
  }

markAsDelivered(refCode: string) {
  if (!refCode) return;

  // Find the attestation with the given RefCode
  const attestation = this.attestations.find(att => att.refCode === refCode);

  if (!attestation) {
    this.notificationService.show(`Attestation with RefCode ${refCode} not found.`, 'error');
    return;
  }

  if (attestation.status === AttestationStatus.DELIVERED) {
    this.notificationService.show(`Attestation is already delivered.`, 'info');
    return;
  }

  // Call the HTTP service to update status
  this.attestationService.updateAttestationStatus(attestation.id!, AttestationStatus.DELIVERED)
    .subscribe({
      next: (updatedAttestation) => {
        // Update the local attestation object so UI reflects the change
        attestation.status = updatedAttestation.status;
        this.loadPendingAttestations();
        
        this.notificationService.show(`Attestation with RefCode ${refCode} marked as delivered.`, 'success');
      },
      error: (err) => {
        console.error('Failed to update status', err);
        this.notificationService.show(`Failed to mark attestation as delivered.`, 'error');
      }
    });
}


get canMarkAsDelivered(): boolean {
  if (!this.refCode) return false;

  const attestation = this.attestations.find(att => att.refCode === this.refCode);
  // Enable only if attestation exists and status is Printed
  return !!attestation && attestation.status === AttestationStatus.PRINTED;
}




  loadPendingAttestations() {
    this.loading = true;
    this.attestationService.getAllAttestations().subscribe({
      next: (data) => {
        // Filter only PENDING attestations
        this.attestations = data.filter(att => att.status !== AttestationStatus.PENDING);
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
        this.selectedClass === 'All classes' ||
        attestation.student.studentClass.startsWith(this.selectedClass[0]);

            const matchesStatus =
      this.selectedStatus === 'All statuses' ||
      (this.selectedStatus === 'Printed' && attestation.status === AttestationStatus.PRINTED) ||
      (this.selectedStatus === 'Delivered' && attestation.status === AttestationStatus.DELIVERED);


      return matchesSearch && matchesClass && matchesStatus;
    });
  }

}
