import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { jwtDecode } from 'jwt-decode'; 
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;  

  private jwtHelper = new JwtHelperService(); 

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  storeToken(token: string): void {
    localStorage.setItem('jwt', token); 
  }

  getToken(): string | null {
    return localStorage.getItem('jwt'); 
  }

  logout(): void {
    localStorage.removeItem('jwt'); 
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null; 
  }

  getUserFromToken(): any {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken;
    }
    return null;
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    const decodedToken: any = jwtDecode(token);
    return decodedToken.role;
  }

  isAdmin(): boolean {
    const user = this.getUserFromToken();
    return user && user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin';
  }

  getFullName(): string | null {
    const token = this.getToken();
    if (!token) return null;
    const decodedToken: any = jwtDecode(token);
    return decodedToken.FullName; 
  }
}
