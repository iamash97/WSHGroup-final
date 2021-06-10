import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})

export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  UsrRole: any;
  UserId: any;
  private authListenerSubs!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.UserId = sessionStorage.getItem("UserId");
    this.UsrRole = sessionStorage.getItem("UsrRole");

    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.UserId = this.authService.getUserId();
        this.UsrRole = this.authService.getUsrRole();
        console.log(this.UsrRole);
      });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
