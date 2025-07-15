
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../auth.service";

// This is just a function, NOT a service
export const loginGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    const role = authService.getUserRole();
      if (role === 'ADMIN') {
        router.navigate(['/admin']);
        return false;
      } else{
        router.navigate(['/staff']);
        return false;
      }
    
  }
  return true;
};