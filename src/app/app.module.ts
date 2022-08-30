import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { CustomersComponent } from './shared/components/customers/customers.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { DailyMaintenenceComponent } from './shared/components/daily-maintenence/daily-maintenence.component';
import { SearchPipe } from './shared/pipes/search.pipe';
import { DatePipe } from '@angular/common';
import { MaintenanceComponent } from './shared/components/maintenance/maintenance.component';
import { EmployeesComponent } from './shared/components/employees/employees.component';
import { LoginComponent } from './shared/components/login/login.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CustomersComponent,
    NotFoundComponent,
    DailyMaintenenceComponent,
    SearchPipe,
    MaintenanceComponent,
    EmployeesComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'ar',
      loader: {
        provide: TranslateLoader,
        useFactory: CreateTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function CreateTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './../assets/i18n/', '.json');
}
