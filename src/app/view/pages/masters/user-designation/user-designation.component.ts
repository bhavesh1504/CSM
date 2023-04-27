import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { UserDesignationElement } from '../../../../core/user-designation/models/userDesignation.model';
import { UserDesignationService } from '../../../../core/user-designation/service/userDesignation.service';
import { AddEditUserDesignationComponent } from './add-edit-user-designation/add-edit-user-designation.component';

@Component({
  selector: 'app-user-designation',
  templateUrl: './user-designation.component.html',
  styleUrls: ['./user-designation.component.css']
})
export class UserDesignationComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ELEMENT_DATA!: UserDesignationElement[];
  displayedColumns: string[] = ['code', 'description', 'isActive', 'action'];
  dataSource = new MatTableDataSource<UserDesignationElement>(this.ELEMENT_DATA);

  constructor(private router: Router, private userDesignationService: UserDesignationService,private changeDetectorRefs: ChangeDetectorRef,public dialog: MatDialog) {
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
    // this.router.navigate(['/home/user-designation/add-edit-user-designation'], navigationExtras);

    const dialogRef = this.dialog.open(AddEditUserDesignationComponent, {
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
      this.userDesignationService.getUserDesignationList().subscribe(res => {
        this.dataSource.data = res.data as UserDesignationElement[]
        //this.changeDetectorRefs.detectChanges();
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
    // this.router.navigateByUrl('home/user-designation/add-edit-user-designation', { skipLocationChange: true });

    const dialogRef = this.dialog.open(AddEditUserDesignationComponent, {
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
  }
}

