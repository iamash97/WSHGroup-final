import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth.service";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  isLoading = false;

  constructor(public authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      this.snackBar.open("Please enter valid credentials", 'OK', {
      duration: environment.snackBarTime,
    });
    return;
    }
    this.authService.login(form.value.Email, form.value.UsrPwd);
  }
}
