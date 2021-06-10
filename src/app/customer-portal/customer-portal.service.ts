import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Services } from "../models/services.model";
import { environment } from "../../environments/environment";
import { Address } from "../models/address.model";
import { Appointments } from "../models/appointment.model";

@Injectable({ providedIn : "root" })

export class customerPortalService {

  url = environment.apiUrl + "serviceProvider/";
  userurl = environment.apiUrl + "user/";
  serviceurl = environment.apiUrl + "service/";
  appointmenturl = environment.apiUrl + "appointment/";

  constructor(private http: HttpClient) { }

  getServicesProviderListForEachService(id: number) {
    // const dateString = date.toISOString();
    return this.http.get<{message: string; serviceProvider:any}>( this.appointmenturl + "getSpList/"+ id);
  }

  getPrice(id: number) {
    return this.http.get<{message: string; PricePerHour:any}>( this.serviceurl + "getPrice/"+ id);
  }

  getAddresses(id: number) {
    return this.http.get<{message: string; addresses:Address[]}>( this.userurl + "getAddressList/"+ id);
  }

  getUserAppointmentList(userId: number) {
    return this.http.get<{Appointments: any}>(this.appointmenturl+"getUserAppointmentList/" + userId);
  }

  closeAppointment(appointmentId : number) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.put<any>(this.appointmenturl+"closeAppointment/"+appointmentId,httpOptions);
  }

  cancelAppointment(appointmentId : number) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.put<any>(this.appointmenturl+"cancelAppointment/"+appointmentId,httpOptions);
  }

  postAddress(userid: number, Door: number,Street1: string,Street2: string,Area: string,City: string, State: string,Pincode: number,Contact: number,AlternateContact:number) {
    const address: any = { AppUserID:userid, DoorNo:Door, Street1:Street1, Street2:Street2, Area: Area, City: City, State:State, Pincode:Pincode, ContactNo:Contact, AltContactNo:AlternateContact };
    this.http
      .post(this.userurl+"createAddress", address)
      .subscribe(response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  createAppointment(AppUserID: number, ServiceProviderID: number, ServiceID: number, AppointmentDate: any, TotalTime:number, totalCost : number, paymentId : number, addressID: number){
    const appointment: Appointments = { AppUserID: AppUserID, ServiceProviderID: ServiceProviderID, ServiceID: ServiceID, AppointmentDate: AppointmentDate, StartTime: null, EndTime: null, TotalTime: TotalTime, Status: 1, PaymentMode: paymentId, TotalCost: totalCost, IsPaid: 1, AddressID: addressID };
    this.http
    .post(this.userurl+"createAppointment", appointment)
    .subscribe(response => {
      console.log(response);
    },
    error => {
      console.log(error);
    });
  }

  deleteAddress(addressId : number) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.put<any>(this.userurl+"deleteAddress/"+addressId,httpOptions);
  }

  getServicesList() {
    return this.http.get<{message: string; services:any; count: number}>( this.serviceurl + "getListForAppointment");
  }
}
