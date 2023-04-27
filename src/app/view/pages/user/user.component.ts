import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserElement } from '../../../core/user/models/user.model';
import { UserService } from '../../../core/user/service/user.service';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ELEMENT_DATA!: UserElement[];
  displayedColumns: string[] = [ 'loginID','firstName', 'lastName','userType','userName', 'mobileNo', 'action'];
  dataSource = new MatTableDataSource<UserElement>(this.ELEMENT_DATA);

  animal: string | undefined;
  name: string | undefined;

  autoFocus?: boolean = true;
  constructor(public dialog: MatDialog,private router: Router, private userService: UserService) {
  }

  ngOnInit() {

    this.getAllDataTable();
  }
  editViewAction(id: any, type: any) {
    let navigationExtras = {
      queryParams: { 'id': id,'type':type },
      fragment: 'anchor',
      skipLocationChange: true
    };
    // this.router.navigate(['/home/user/add-edit-user'], navigationExtras);
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      width: '1200px',
      data: {id: id, type: type},
      autoFocus: false,
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getAllDataTable();
    });
  }
  changePasswordAction(id: any, fname: any, lname: any, type: any) {
    let navigationExtras = {
      queryParams: { 'id': id,'type':type },
      fragment: 'anchor',
      skipLocationChange: true
    };
   // this.router.navigate(['/home/user/reset-password'], navigationExtras);

    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '500px',
      data: {id: id, fname: fname,lname: lname, type: type},
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
      this.getAllDataTable();
    });
  }
  getAllDataTable() {
    setTimeout(() => {
      this.userService.getUserList().subscribe(res => {
        //delay(1000)
        this.dataSource.data = res as UserElement[]
      });
    }, 500);

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addData() {
    // this.router.navigateByUrl('home/user/add-edit-user', { skipLocationChange: true });

    const dialogRef = this.dialog.open(AddEditUserComponent, {
      width: '1200px',
      data: {name: 'Fin', animal: 'Tech'},
      autoFocus: false,
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getAllDataTable();
    });
  }

ngOnDestroy(){
    this.dataSource.disconnect()
  }

  reloadData()
  {
    this.getAllDataTable();
  }
}


