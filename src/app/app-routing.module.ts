import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { CustomersComponent } from './shared/components/customers/customers.component';
import { MaintenanceComponent } from './shared/components/maintenance/maintenance.component';
import { DailyMaintenenceComponent } from './shared/components/daily-maintenence/daily-maintenence.component';
import { EmployeesComponent } from './shared/components/employees/employees.component';
import { LoginComponent } from './shared/components/login/login.component';
import { AuthguardGuard } from './core/services/authguard.guard';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'maintenance/:id', component: MaintenanceComponent },
  { path: 'daily_maintenence', component: DailyMaintenenceComponent },
  { path: 'employees', component: EmployeesComponent, data: { requiresLogin: true }, canActivate: [AuthguardGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
