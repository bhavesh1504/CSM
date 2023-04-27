import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { UserDepartmentElement } from '../../../../core/user-department/models/userDepartment.model';
import { UserDepartmentService } from '../../../../core/user-department/service/userDepartment.service';
import { AddEditUserDepartmentComponent } from './add-edit-user-department/add-edit-user-department.component';

@Component({
  selector: 'app-user-department',
  templateUrl: './user-department.component.html',
  styleUrls: ['./user-department.component.css']
})
export class UserDepartmentComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ELEMENT_DATA!: UserDepartmentElement[];
  displayedColumns: string[] = ['code', 'description', 'isActive', 'action'];
  dataSource = new MatTableDataSource<UserDepartmentElement>(this.ELEMENT_DATA);

  constructor(private router: Router, private userDepartmentService: UserDepartmentService,private changeDetectorRefs: ChangeDetectorRef,public dialog: MatDialog) {
  }

  ngOnInit() {

    this.getAllDataTable();
    //this.changeDetectorRefs.detectChanges();
  }
  editViewAction(id: any, type: any) {
    let navigationExtras = {
      queryParams: { 'id': id,'type':type },
      fragment: 'anchor',
      skipLocationChange: true
    };
    // this.router.navigate(['/home/user-department/add-edit-user-department'], navigationExtras);

    const dialogRef = this.dialog.open(AddEditUserDepartmentComponent, {
      width: '700px',
      data: {id: id, type: type},
      autoFocus: false,
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getAllDataTable();
    });
  }
  getAllDataTable() {
    setTimeout(() => {
      this.userDepartmentService.getUserDepartmentList().subscribe(res => {
        this.dataSource.data = res.data as UserDepartmentElement[]
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
    // this.router.navigateByUrl('home/user-department/add-edit-user-department', { skipLocationChange: true });

    const dialogRef = this.dialog.open(AddEditUserDepartmentComponent, {
      width: '700px',
      data: {name: 'Fin', animal: 'Tech'},
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getAllDataTable();
    });
  }

ngOnDestroy(){
    this.dataSource.disconnect()
    this.dataSource.data=[]
  }
}

