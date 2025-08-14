import { Component, OnInit } from '@angular/core';
import { AttestationService } from 'src/app/services/attestation.service';
import { Attestation, AttestationStatus } from '../attestation-management/attestations/attestations.component';

interface AttestationStats {
  total: number;
  delivered: number;
  pending: number;
  printed: number;
}

interface Execution {
  id: string;
  status: string;
  workflowName?: string;
  workflowId: string;
  startedAt: Date;
  stoppedAt?: Date;
}

@Component({
  selector: 'app-admin-dashboard-home',
  templateUrl: './admin-dashboard-home.component.html',
  styleUrls: ['./admin-dashboard-home.component.css']
})
export class AdminDashboardHomeComponent implements OnInit {
  stats: AttestationStats = {
    total: 0,
    delivered: 0,
    pending: 0,
    printed: 0
  };

  executions: Execution[] = [];

  constructor(private attestationService: AttestationService) {}

  ngOnInit(): void {
    this.loadAttestationData();
    this.loadExecutions(); // Will still be mock until backend ready
  }

  loadAttestationData(): void {
    this.attestationService.getAllAttestations().subscribe({
      next: (attestations: Attestation[]) => {
        const total = attestations.length;
        const delivered = attestations.filter(a => a.status === AttestationStatus.DELIVERED).length;
        const pending = attestations.filter(a => a.status === AttestationStatus.PENDING).length;
        const printed = attestations.filter(a => a.status === AttestationStatus.PRINTED).length;

        this.stats = { total, delivered, pending, printed };
      },
      error: (err) => {
        console.error('Error fetching attestations', err);
      }
    });
  }

  getPercentage(value: number, total: number): number {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  }

  refreshData(): void {
    this.loadAttestationData();
  }

  loadExecutions(): void {
    // TODO: Replace this mock data with API call when backend endpoint is ready
    this.executions = [
      {
        id: '1',
        status: 'success',
        workflowName: 'Send Welcome Email',
        workflowId: 'wf_001',
        startedAt: new Date(Date.now() - 60000),
        stoppedAt: new Date()
      },
      {
        id: '2',
        status: 'failed',
        workflowName: 'Generate Report',
        workflowId: 'wf_002',
        startedAt: new Date(Date.now() - 120000),
        stoppedAt: new Date()
      }
    ];
  }

  refreshExecutions(): void {
    this.loadExecutions();
  }

  trackByExecutionId(index: number, execution: Execution): string {
    return execution.id;
  }

  getStatusBadgeClass(status: string): string {
    return `badge badge-${status}`;
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'short'
    }).format(date);
  }

  formatDuration(startedAt: Date, stoppedAt?: Date): string {
    if (!stoppedAt) return 'Running...';
    const duration = (new Date(stoppedAt).getTime() - new Date(startedAt).getTime()) / 1000;
    return `${duration.toFixed(1)}s`;
  }

  viewExecutionDetails(execution: Execution): void {
    console.log('Viewing details for execution:', execution);
  }
}
