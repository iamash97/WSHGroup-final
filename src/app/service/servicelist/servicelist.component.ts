import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import {DataSource} from '@angular/cdk/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ServicesListService } from '../servicelist.service';
import { Services } from '../../models/services.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-servicelist',
  templateUrl: './servicelist.component.html',
  styleUrls: ['./servicelist.component.css']
})
export class ServicelistComponent implements OnInit  {

  displayedColumns: string[] = ['id', 'ServiceName', 'PricePerHour', 'IsActive', 'Deactivate'];
  dataSource!: MatTableDataSource<Services>;
  service : Services[] = [];
  totalServices = 10;
  servicesPerPage = 5;
  currentPage = 1;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataservice: ServicesListService, private router: Router, private snackBar: MatSnackBar) {

   }

   ngOnInit(){
        this.dataservice.getServicesList(this.servicesPerPage,this.currentPage)
      .subscribe(res => {
        this.service = res.services;
        this.totalServices = res.count;
        this.dataSource = new MatTableDataSource(res.services);
        console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  gotoaddnewservicepage() {
    this.router.navigate(["/addnewservice"]);
  }


  deactivate(element: any) {
    console.log(element.id);
    this.dataservice.deactivateService(element.id).
    subscribe(res => {
      window.location.reload();
      if(element.IsActive == true){
        this.snackBar.open("Service has been deactivated", 'OK', {
          duration: environment.snackBarTime,
        });
      }
      else{
        this.snackBar.open("Service has been Activated", 'OK', {
          duration: environment.snackBarTime,
        });
      }
    },
    error => {
      this.snackBar.open("Cannot Deactivate Service", 'OK', {
        duration: environment.snackBarTime,
      });
    });
  }
      onChangedPage(pageData: PageEvent) {
        this.currentPage = pageData.pageIndex +1;
        this.servicesPerPage = pageData.pageSize;
        this.dataservice.getServicesList(this.servicesPerPage,this.currentPage)
      .subscribe(res => {
        this.service = res.services;
        this.totalServices = res.count;
        this.dataSource = new MatTableDataSource(res.services);
        console.log(this.dataSource);
      });
      }

}
