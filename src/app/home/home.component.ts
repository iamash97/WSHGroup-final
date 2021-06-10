import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";


@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: [ "./home.component.css" ]
})

export class HomeComponent implements OnInit  {

  usrRole : any;

  constructor(private router: Router, private snackBar: MatSnackBar) {   }

   ngOnInit(){
        this.usrRole = sessionStorage.getItem("UsrRole");
  }


}

