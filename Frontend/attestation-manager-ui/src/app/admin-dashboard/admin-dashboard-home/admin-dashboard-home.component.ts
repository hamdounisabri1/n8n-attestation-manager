import { Component, OnInit } from '@angular/core';

interface AttestationStats {
  total: number;
  delivered: number;
  pending: number;
  failed: number;
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
    total: 5000,
    delivered: 2000,
    pending: 2950,
    failed: 50
  };

  constructor() { }

  ngOnInit(): void {
    this.loadAttestationData();
        this.loadExecutions(); // Load fake/mock data for now

  }

  loadAttestationData(): void {
    // TODO: Replace with actual API call
    console.log('Loading attestation data...');
    // Simulate API delay
    setTimeout(() => {
      console.log('Data loaded');
    }, 1000);
  }

  getPercentage(value: number, total: number): number {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  }

  refreshData(): void {
    this.loadAttestationData();
  }
  ////////////////////////////////

  executions: Execution[] = [];
  loadExecutions(): void {
    // Mock data - replace with HTTP call later
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
      },
      {
        id: '3',
        status: 'waiting',
        workflowName: 'Generate Report',
        workflowId: 'wf_002',
        startedAt: new Date(Date.now() - 120000),
        stoppedAt: new Date()
      },
      {
        id: '5',
        status: 'running',
        workflowName: 'Generate Report',
        workflowId: 'wf_002',
        startedAt: new Date(Date.now() - 120000),
        stoppedAt: new Date()
      }
    ];
  }

  refreshExecutions(): void {
    this.loadExecutions(); // Re-trigger mock data load
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
    // Placeholder for navigation or modal logic
  }

}