import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData, LoginData } from "./auth-data.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({ providedIn : "root" })

export class AuthService {

  private token!: string;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer : any;
  private UserId: any;
  private UsrRole: any;
  url = environment.apiUrl + "user/";
  isActive : boolean;

  constructor( private http:HttpClient, private router: Router, private snackBar: MatSnackBar) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.UserId;
  }

  getUsrRole() {
    return this.UsrRole;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser( FirstName: string, LastName: string, Age: number, Email: string, UsrPwd: string, UsrRole: number ) {
    const authData: AuthData = { FirstName: FirstName, LastName: LastName, Age: Age, Email: Email, UsrPwd: UsrPwd, UsrRole: UsrRole, IsActive: true };
    this.http
      .post(this.url+"signup", authData)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(["/login"]);
      },
      error => {
        this.snackBar.open("Please enter all details correctly", 'OK', {
          duration: environment.snackBarTime,
        })
      });
  }

  login(Email: string, UsrPwd: string) {
    const authData: LoginData = { Email: Email, UsrPwd: UsrPwd };
    this.http.post<{ token: string; expiresIn: number, UserId: string, UsrRole: number, IsActive: boolean }>(
        this.url+"login",
        authData
      )
      .subscribe(response => {
        const token = response.token;
        this.isActive = response.IsActive;
        this.token = token;
        if(this.isActive){
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.UserId = response.UserId;
            this.UsrRole = response.UsrRole;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, this.UserId, this.UsrRole);
            if(this.UsrRole==0)
            this.router.navigate(["/userlist"]);
            else if(this.UsrRole==1)
            this.router.navigate(["/registeredservices"]);
            else if(this.UsrRole==2)
            this.router.navigate(["/userhomepage"]);
            else{
              this.snackBar.open("This user is not a part of this application", 'OK', {
                duration: environment.snackBarTime,
              })
              this.router.navigate(["/login"]);
            }

          }
        }
        else {
          this.snackBar.open("The User has been Deactivated! Please Contact Admin", 'OK', {
            duration: environment.snackBarTime,
          })
        }

      },
        error => {
          this.snackBar.open("Please enter valid credentials", 'OK', {
            duration: environment.snackBarTime,
          })
        }
      );

  }

  logout() {
    this.token = "";
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.UserId = null;
    this.UsrRole = null;
    this.clearAuthData();
    this.router.navigate(["/login"]);
    window.location.reload();
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.UserId = authInformation.UserId;
      this.UsrRole = authInformation.UsrRole;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, UserId: string, UsrRole: number) {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("expiration", expirationDate.toISOString());
    sessionStorage.setItem("UserID",UserId);
    sessionStorage.setItem("UsrRole", JSON.stringify(UsrRole));
  }

  private clearAuthData() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("expiration");
    sessionStorage.removeItem("UserID");
    sessionStorage.removeItem("UsrRole");
  }

  private getAuthData() {
    const token = sessionStorage.getItem("token");
    const expirationDate = sessionStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return null;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      UserId: this.UserId,
      UsrRole: this.UsrRole
    }
  }
}




