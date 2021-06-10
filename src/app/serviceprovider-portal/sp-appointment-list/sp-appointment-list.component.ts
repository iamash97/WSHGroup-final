import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SpPortalService } from '../serviceprovider-portal.service';

@Component({
  selector: 'app-sp-appointment-list',
  templateUrl: './sp-appointment-list.component.html',
  styleUrls: ['./sp-appointment-list.component.css']
})
export class SpAppointmentListComponent implements OnInit {

  displayedColumns: string[] = ['Date','ServiceName', 'ClientName', 'Address', 'TotalCost', 'Status', 'Close'];
  userid: any;
  dataSource: MatTableDataSource<any>;

  constructor(private dataservice : SpPortalService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.userid = sessionStorage.getItem("UserID");
    this.dataservice.getAppointmentList(this.userid)
    .subscribe(res => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res.Appointments);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  close(id: any){
    this.dataservice.closeAppointment(id).
        subscribe(res => {
          this.snackBar.open("The Appointment has been closed", 'OK', {
            duration: environment.snackBarTime,
          });
          this.router.navigate(["/registeredservices"]);
        });
  }
}
