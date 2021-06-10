import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Appointments } from 'src/app/models/appointment.model';
import { environment } from 'src/environments/environment';
import { customerPortalService } from '../customer-portal.service';

@Component({
  selector: 'app-user-appointments',
  templateUrl: './user-appointments.component.html',
  styleUrls: ['./user-appointments.component.css']
})
export class UserAppointmentsComponent implements OnInit {

  displayedColumns: string[] = ['Date', 'ServiceName', 'ServiceProviderName', 'TotalCost', 'Status', 'Cancel',];
  dataSource!: MatTableDataSource<any>;
  appointment : Appointments[] = [];
  totalAppointments = 10;
  appointmentsPerPage = 5;
  currentPage = 1;
  UserId : any;

  constructor(private dataservice: customerPortalService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.UserId = sessionStorage.getItem("UserID");
    this.dataservice.getUserAppointmentList(this.UserId)
    .subscribe(res => {
      this.dataSource = new MatTableDataSource(res.Appointments[0].appointments);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cancel(id: any){
    this.dataservice.cancelAppointment(id).
        subscribe(res => {
          this.snackBar.open("Address has been deleted", 'OK', {
            duration: environment.snackBarTime,
          });
          window.location.reload();
        });
  }
}
