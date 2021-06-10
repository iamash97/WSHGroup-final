import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { User } from "../models/user.model";

@Injectable({ providedIn : "root" })

export class UserListService {

  url = environment.apiUrl + "user/";
  spurl = environment.apiUrl + "serviceProvider/";

  constructor(private http: HttpClient) { }

  getUsersList(usersPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${usersPerPage}&page=${currentPage}`;
    return this.http.get<{message: string; users:any; count: number}>(this.url+"getUserList"+ queryParams);
  }

  getServiceProviderList(usersPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${usersPerPage}&page=${currentPage}`;
    return this.http.get<{message: string; users:any; count: number}>(this.url+"getSpListForAdmin"+ queryParams);
  }

  deactivateUser(UserId: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.put<any>(this.url+"setUserActiveStatus/"+UserId,httpOptions);
  }

}
