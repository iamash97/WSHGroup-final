import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Services } from "../models/services.model";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";

@Injectable({ providedIn : "root" })

export class ServicesListService {

  url = environment.apiUrl + "service/";

  constructor(private http: HttpClient, private router: Router) { }

  getServicesList(servicesPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${servicesPerPage}&page=${currentPage}`;
    return this.http.get<{message: string; services:any; count: number}>( this.url + "getServiceList"+ queryParams);
  }

  deactivateService(ServiceId: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.put<any>(this.url+"setServiceActiveStatus/"+ServiceId,httpOptions);
  }

  createService( ServiceName: string, PricePerHour: number, image: File) {
    const data = new FormData();
    data.append("ServiceName",ServiceName);
    data.append("PricePerHour",PricePerHour.toString());
    data.append("image",image, ServiceName);

    // const serviceData: Services = { ServiceName: ServiceName, PricePerHour: PricePerHour, image: image, IsActive: true };
    this.http
      .post(this.url+"addNewService", data)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(["/servicelist"]);
      },
      error => {
        console.log(error);
      });
  }
}
