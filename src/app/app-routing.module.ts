import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaUsuariosComponent } from './components/users/list-users/lista-usuarios.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './shared/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { UnauthenticatedGuard } from './guards/unauthenticated.guard';

const routes: Routes = [
  { path: '', redirectTo: '/usuarios', pathMatch: 'full' },
  { path: 'usuarios', component: ListaUsuariosComponent,canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, }, 
  { path: 'login', component: LoginComponent,canActivate: [UnauthenticatedGuard]  },
  { path: 'register', component: RegisterComponent,canActivate: [UnauthenticatedGuard]  },
  { path: '**', redirectTo: '/login' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
