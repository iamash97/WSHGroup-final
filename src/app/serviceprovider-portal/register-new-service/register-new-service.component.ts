import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Services } from 'src/app/models/services.model';
import { ServicesListService } from 'src/app/service/servicelist.service';
import { environment } from 'src/environments/environment';
import { SpPortalService } from '../serviceprovider-portal.service';

@Component({
  selector: 'app-register-new-service',
  templateUrl: './register-new-service.component.html',
  styleUrls: ['./register-new-service.component.css']
})
export class RegisterNewServiceComponent implements OnInit {

  services : Services[] = [];
  serviceID : any;
  form: any;
  userid: string;

  constructor(private formBuilder: FormBuilder,private service: SpPortalService, private snackBar: MatSnackBar,private dataservice: ServicesListService, private router: Router) { }

  ngOnInit(): void {
    this.dataservice.getServicesList(100,1)
      .subscribe(res => {
        this.services = res.services;
      });

      this.form = new FormGroup({
        'ServiceID': new FormControl(null, Validators.required),
      });

      this.userid = sessionStorage.getItem("UserID");
  }

  onSubmit(){
    if(this.form.valid){
      this.service.createServiceProvider(+this.userid,this.form.value.ServiceID);
    }
    else{
      this.snackBar.open("Please Select a Service", 'OK', {
        duration: environment.snackBarTime,
      });
      return;
    }

  }
}
