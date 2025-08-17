import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header-staff',
  templateUrl: './header-staff.component.html',
  styleUrls: ['./header-staff.component.css']
})
export class HeaderStaffComponent {
 constructor(private authService: AuthService) {}
  
navItems = [
  { label: 'Home', path: '/staff/home', exact: true },
  { label: 'Delivery Management', path: '/staff/deliveries', exact: false },
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
