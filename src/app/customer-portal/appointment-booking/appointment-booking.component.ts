import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NumberValueAccessor, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address.model';
import { Services } from 'src/app/models/services.model';
import { ServicesListService } from 'src/app/service/servicelist.service';
import { environment } from 'src/environments/environment';
import { customerPortalService } from '../customer-portal.service';

@Component({
  selector: 'app-appointment-booking',
  templateUrl: './appointment-booking.component.html',
  styleUrls: ['./appointment-booking.component.css']
})
export class AppointmentBookingComponent implements OnInit {

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  services : Services[] = [];
  serviceProviders : any[] = [];
  // isLoading = false;
  form: any;
  serviceID : any;
  date : any;
  appointmentDate : any;
  serviceProviderID : any;
  selectedDate : Date;
  selectedServiceID : number;
  userid : any;
  pricePerHour : number;
  totalPrice :number = 0;
  totalTime : number;
  address : Address[] = [];
  addressId : any;
  addressID : number;
  paymentId :number;
  numberOfSP = 0;
  minDate : Date = new Date();

  PaymentMethods : any[] =
  [{"PaymentMode_ID" : 1, "Mode" : "Online"},
  {"PaymentMode_ID" : 2, "Mode" : "Cash"},]

  constructor(private formBuilder: FormBuilder,private dataservice: ServicesListService, private service: customerPortalService, private router: Router, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.userid = sessionStorage.getItem("UserID");
    console.log(this.userid);

    this.service.getServicesList()
      .subscribe(res => {
        this.services = res.services;
      });

      this.form = new FormGroup({
        'ServiceID': new FormControl(null, Validators.required),
        'ServiceProviderID': new FormControl(null, Validators.required),
        'AppointmentDate': new FormControl(null, Validators.required),
        'Time' : new FormControl(null, Validators.compose(
          [Validators.max(10), Validators.required])),
        'AddressID' : new FormControl(null, Validators.required),
        'PaymentID' : new FormControl(null, Validators.required),
      });

    this.service.getAddresses(this.userid).subscribe(res => {
      this.address= res.addresses;
    });

  }

  onServiceSelection(serviceId: any) {
     if(serviceId)
    {
      console.log(serviceId);
      this.selectedServiceID = serviceId;
      this.service.getServicesProviderListForEachService(serviceId)
        .subscribe( res => {
          this.serviceProviders = res.serviceProvider;
          this.numberOfSP = this.serviceProviders.length;
        });
      }
  }

  onServiceProviderSelection(serviceProviderId : any)
  {
    if(this.serviceProviderID){
      this.pricePerHour = this.serviceProviders[0].PricePerHour;
    }
  }

  onSubmit(){
    if(!this.form.valid){
      this.snackBar.open("Please enter all details", 'OK', {
        duration: environment.snackBarTime,
      });
      return;
    }
    console.log(this.form);
    this.totalTime = +this.form.value.Time;
    this.totalPrice = this.totalTime * this.pricePerHour;
    this.service.createAppointment(+this.userid,this.form.value.ServiceProviderID,this.serviceID, this.form.value.AppointmentDate, this.totalTime, this.totalPrice, this.form.value.PaymentID, this.addressID);
    this.router.navigate(['/userhomepage']);
    this.snackBar.open("Appointment has been booked successfully", 'OK', {
      duration: environment.snackBarTime,
    });
  }

}
