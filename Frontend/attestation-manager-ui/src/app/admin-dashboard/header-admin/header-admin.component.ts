import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent {
    constructor(private authService: AuthService) {}
  
navItems = [
  { label: 'Dashboard', path: '/admin/dashboard', exact: true },
  { label: 'User Management', path: '/admin/users', exact: false },
  { label: 'Attestation Management', path: '/admin/attestations', exact: true }
];

  // Simulate active tab (in real app, bind to router)
  activeIndex = 0;

  setActive(index: number) {
    this.activeIndex = index;
    // In real app, would navigate using the router
  }
    onLogout() {
    this.authService.logout();
  }
}
