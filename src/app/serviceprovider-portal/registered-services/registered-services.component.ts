import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { registeredServices } from 'src/app/models/registeredServices.model';
import { Services } from 'src/app/models/services.model';
import { environment } from 'src/environments/environment';
import { SpPortalService } from '../serviceprovider-portal.service';

@Component({
  selector: 'app-registered-services',
  templateUrl: './registered-services.component.html',
  styleUrls: ['./registered-services.component.css']
})
export class RegisteredServicesComponent implements OnInit {

  displayedColumns: string[] = ['ServiceName', 'PricePerHour', 'IsActive', 'Deactivate'];
  dataSource!: MatTableDataSource<any>;
  userid : any;
  services : registeredServices[] =[] ;

  constructor(private dataservice : SpPortalService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userid = sessionStorage.getItem("UserID");
    this.dataservice.getServiceList(this.userid)
    .subscribe(res => {
      this.dataSource = new MatTableDataSource(res.result);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  unregister(element: any){
    this.dataservice.unregister(element.id).
        subscribe(res => {
          if(element.IsActive == true){
            this.snackBar.open("Service has been Withdrawn", 'OK', {
              duration: environment.snackBarTime,
            });
          }
          else{
            this.snackBar.open("Service has been Registered", 'OK', {
              duration: environment.snackBarTime,
            });
          }
          window.location.reload();
        });
  }
}
