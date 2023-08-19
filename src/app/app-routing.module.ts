import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './Auth/registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
