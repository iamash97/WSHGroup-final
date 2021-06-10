import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Services } from '../../models/services.model';
import { ServicesListService } from '../../service/servicelist.service';

@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css']
})
export class UserHomePageComponent implements OnInit {

  services : Services[] = [];

  constructor( private dataservice: ServicesListService, private router : Router) { }

  ngOnInit(): void {
    this.dataservice.getServicesList(100,1)
      .subscribe(res => {
        this.services = res.services;
        console.log(this.services);
      });
  }

  bookAnAppointment()
  {
    this.router.navigate(["/appointmentbooking"]);
  }

}
