import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { serviceProvider } from "../models/serviceProvider.model";
import { User } from "../models/user.model";

@Injectable({ providedIn : "root" })

export class SpPortalService {

  url = environment.apiUrl + "serviceProvider/";
  appointmenturl = environment.apiUrl + "appointment/";

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

  getServiceList(serviceId: number) {
    return this.http.get<{result: any}>(this.url+"getRegServiceList/" + serviceId);
  }

  getAppointmentList(spId: number) {
    return this.http.get<{Appointments: any}>(this.appointmenturl+"getAppointmentList/" + spId);
  }

  closeAppointment(appointmentId : number) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.put<any>(this.appointmenturl+"closeAppointment/"+appointmentId,httpOptions);
  }

  unregister(id: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.put<any>(this.url+"setSpsActiveStatus/"+id,httpOptions);
  }

  createServiceProvider(AppUserID: number, ServiceID: number){
    const serviceProvider: serviceProvider = { AppUserID: AppUserID, ServiceID: ServiceID, IsActive: true };
    this.http
    .post(this.url+"registerNew", serviceProvider)
    .subscribe(response => {
      console.log(response);
      this.router.navigate(['/registeredservices']);
      this.snackBar.open("Service has been registered", 'OK', {
        duration: environment.snackBarTime,
      });
    },
    error => {
      console.log(error);
    });
  }


}
