
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getUserFromToken(); 
    
    if (user && user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin') {
      return true; 
    }

    this.router.navigate(['/home']);
    return false;
  }
}
