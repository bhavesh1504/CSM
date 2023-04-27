import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { PincodeElement } from 'src/app/core/geography-masters/pincode/models/pincode.model';
import { PincodeService } from 'src/app/core/geography-masters/pincode/service/pincode.service';
import { AddEditPincodeComponent } from './add-edit-pincode/add-edit-pincode.component';

@Component({
  selector: 'app-pincode',
  templateUrl: './pincode.component.html',
  styleUrls: ['./pincode.component.css']
})
export class PincodeComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ELEMENT_DATA!: PincodeElement[];
  displayedColumns: string[] = ['pincode', 'city', 'area','isActive', 'action'];
  dataSource = new MatTableDataSource<PincodeElement>(this.ELEMENT_DATA);

  constructor(private router: Router, private pincodeService: PincodeService,public dialog: MatDialog) {
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
   // this.router.navigate(['/home/pincode/add-edit-pincode'], navigationExtras);

   const dialogRef = this.dialog.open(AddEditPincodeComponent, {
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
      this.pincodeService.getPincodeList().subscribe(res => {
        this.dataSource.data = res as PincodeElement[]
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
   // this.router.navigateByUrl('home/pincode/add-edit-pincode', { skipLocationChange: true });
   const dialogRef = this.dialog.open(AddEditPincodeComponent, {
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

