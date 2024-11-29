import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup = this.formBuilder.group({});
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],  
      password: ['', [Validators.required]]   
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        // console.log('User logged in', response);
        this.authService.storeToken(response.token);  
        this.router.navigate(['/home']);
        this.snackBar.open('¡Inicio de sesión exitoso!', 'Cerrar', {
          duration: 2000,  
          panelClass: ['snackbar-success']  
        });  
      },
      (error) => {
        console.error('Error during login', error);
        this.snackBar.open('Credenciales inválidas. Intente nuevamente.', 'Cerrar', {
          duration: 3000,  
          panelClass: ['snackbar-error'],
        });
      }
    );
  }

  
}
