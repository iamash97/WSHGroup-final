import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth.service";


@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})

export class SignupComponent {
  isLoading = false;
  UsrRole = 2;


  constructor(public authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  onSignup(form: NgForm) {
    if (form.invalid) {
      this.snackBar.open("Please enter valid details", 'OK', {
        duration: environment.snackBarTime,
      });
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.FirstName, form.value.LastName, form.value.Age, form.value.Email, form.value.UsrPwd, form.value.UsrRole);
}
}
