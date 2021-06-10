import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address.model';
import { environment } from 'src/environments/environment';
import { customerPortalService } from '../customer-portal.service';

@Component({
  selector: 'app-add-new-address',
  templateUrl: './add-new-address.component.html',
  styleUrls: ['./add-new-address.component.css']
})
export class AddNewAddressComponent implements OnInit {

  displayedColumns: string[] = ['Address', 'Cancel',];
  addressForm : FormGroup;
  address : Address[] = [];
  userid : any;
  usrRole: any;

  constructor(public dataService: customerPortalService, private router:Router, private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.userid = sessionStorage.getItem("UserID");
    // this.usrRole = sessionStorage.getItem("UsrRole");

    // if(this.usrRole != 2) {
    //   this.router.navigate(['/login'])
    // }

    this.dataService.getAddresses(this.userid).subscribe(res => {
      this.address= res.addresses;
      console.log(this.address);
    });

    this.addressForm = new FormGroup({
      'Door': new FormControl(null, Validators.required),
      'Street1': new FormControl(null, Validators.required),
      'Street2': new FormControl(null, ),
      'Area': new FormControl(null, Validators.required),
      'City': new FormControl(null, Validators.required),
      'State': new FormControl(null, Validators.required),
      'Pincode': new FormControl(null, [Validators.required, Validators.pattern('[1-9]\\d{5}')]),
      'Contact': new FormControl(null, [Validators.required, Validators.pattern('[6-9]\\d{9}')]),
      'AlternateContact': new FormControl(null, [ Validators.pattern('[6-9]\\d{9}')]),
  });
  }
  onSubmit(){
    if(this.addressForm.valid){
      this.dataService.postAddress(+this.userid,
        this.addressForm.value.Door,
        this.addressForm.value.Street1,
        this.addressForm.value.Street2,
        this.addressForm.value.Area,
        this.addressForm.value.City,
        this.addressForm.value.State,
        this.addressForm.value.Pincode,
        this.addressForm.value.Contact,
        this.addressForm.value.AlternateContact);
        this.router.navigate(["/userhomepage"]);
        this.snackBar.open("Address added successfully", 'OK', {
          duration: environment.snackBarTime,
        });
      }
    else{
      this.snackBar.open("Please enter all details", 'OK', {
        duration: environment.snackBarTime,
      });
    }
  }

  deleteAddress(addrId : any){
    this.dataService.deleteAddress(addrId).subscribe(res => {
      this.snackBar.open("Address has been deleted", 'OK', {
        duration: environment.snackBarTime,
      });
      window.location.reload();
    });
  }

}
