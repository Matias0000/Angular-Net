import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaUsuariosComponent } from './components/users/list-users/lista-usuarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { LoginComponent } from './components/auth/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RegisterComponent } from './components/auth/register/register.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { AddUserDialogComponent } from './components/users/add-user-dialog/add-user-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from './components/users/confirm-delete-dialog/confirm-delete-dialog.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './shared/home/home.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    ListaUsuariosComponent,
    LoginComponent,
    RegisterComponent,
    AddUserDialogComponent,
    ConfirmDeleteDialogComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
