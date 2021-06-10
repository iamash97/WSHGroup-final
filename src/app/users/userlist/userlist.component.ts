import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user.model';
import { UserListService } from '../userlist.service';
import { MatTableDataSource } from '@angular/material/table';
import {DataSource} from '@angular/cdk/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})

export class UserlistComponent implements OnInit  {

  displayedColumns: string[] = ['id', 'FirstName', 'LastName', 'Email', 'Age', 'IsActive', 'Deactivate'];
  dataSource!: MatTableDataSource<User>;
  user : User[] = [];
  totalUsers = 10;
  usersPerPage = 5;
  currentPage = 1;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataservice: UserListService, private snackBar: MatSnackBar) {

   }

   ngOnInit() {
    this.dataservice.getUsersList(this.usersPerPage,this.currentPage)
    .subscribe(res​​​​​ => {
      console.log(res);
      this.user = res.users;
      this.totalUsers = res.count;
      this.dataSource = new MatTableDataSource(this.user);
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

  deactivate(element: any) {
    console.log(element.id);
    this.dataservice.deactivateUser(element.id).
    subscribe(res => {
      window.location.reload();
      if(element.IsActive == true){
        this.snackBar.open("User has been deactivated", 'OK', {
          duration: environment.snackBarTime,
        });
      }
      else{
        this.snackBar.open("User has been Activated", 'OK', {
          duration: environment.snackBarTime,
        });
      }
    },
    error => {
      this.snackBar.open("Cannot Deactivate User", 'OK', {
        duration: environment.snackBarTime,
      });
    });
  }

      onChangedPage(pageData: PageEvent) {
        this.currentPage = pageData.pageIndex +1;
        this.usersPerPage = pageData.pageSize;
        this.dataservice.getUsersList(this.usersPerPage,this.currentPage)
        .subscribe(res​​​​​ => {
          this.user = res.users;
          this.totalUsers = res.count;
          console.log(this.dataSource);
          this.dataSource = new MatTableDataSource(this.user);
          // this.dataSource.paginator = this.paginator;
          // this.dataSource.sort = this.sort;
        });
      }
}
