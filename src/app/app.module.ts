import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { UserlistComponent } from './users/userlist/userlist.component';
import { ServicelistComponent } from './service/servicelist/servicelist.component';
import { AddnewserviceComponent } from './service/addnewservice/addnewservice.component';
import { ServiceproviderComponent } from './users/serviceprovider/serviceprovider.component';
import { UserHomePageComponent } from './customer-portal/user-home-page/user-home-page.component';
import { AppointmentBookingComponent } from './customer-portal/appointment-booking/appointment-booking.component';
import { AddNewAddressComponent } from './customer-portal/add-new-address/add-new-address.component';
import { UserAppointmentsComponent } from './customer-portal/user-appointments/user-appointments.component';
import { RegisteredServicesComponent } from './serviceprovider-portal/registered-services/registered-services.component';
import { RegisterNewServiceComponent } from './serviceprovider-portal/register-new-service/register-new-service.component';
import { SpAppointmentListComponent } from './serviceprovider-portal/sp-appointment-list/sp-appointment-list.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    UserlistComponent,
    ServicelistComponent,
    AddnewserviceComponent,
    ServiceproviderComponent,
    UserHomePageComponent,
    AppointmentBookingComponent,
    AddNewAddressComponent,
    UserAppointmentsComponent,
    RegisteredServicesComponent,
    RegisterNewServiceComponent,
    SpAppointmentListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSelectModule,
    HttpClientModule,
    MatTableModule,
    MatButtonToggleModule,
    MatSortModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
