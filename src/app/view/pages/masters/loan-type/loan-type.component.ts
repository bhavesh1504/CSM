import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoanTypeElement } from 'src/app/core/loan-type/models/loanType.model';
import { LoanTypeService } from 'src/app/core/loan-type/service/loanType.service';
import { AddEditLoanTypeComponent } from './add-edit-loan-type/add-edit-loan-type.component';

@Component({
  selector: 'app-loan-type',
  templateUrl: './loan-type.component.html',
  styleUrls: ['./loan-type.component.css']
})
export class LoanTypeComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ELEMENT_DATA!: LoanTypeElement[];
  displayedColumns: string[] = ['code', 'description', 'isActive', 'action'];
  dataSource = new MatTableDataSource<LoanTypeElement>(this.ELEMENT_DATA);

  constructor(private router: Router, private loanTypeService: LoanTypeService,public dialog: MatDialog) {
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
    // this.router.navigate(['/home/lead-status/add-edit-lead-status'], navigationExtras);
    const dialogRef = this.dialog.open(AddEditLoanTypeComponent, {
      width: '750px',
      data: {id: id, type: type},
      autoFocus: false,
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getAllDataTable();
    });
  }
  getAllDataTable() {
    setTimeout(()=>{
      this.loanTypeService.getLoanTypeList().subscribe(res => {
        this.dataSource.data = res.data as LoanTypeElement[]
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
    // this.router.navigateByUrl('home/lead-status/add-edit-lead-status', { skipLocationChange: true });

    const dialogRef = this.dialog.open(AddEditLoanTypeComponent, {
      width: '750px',
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

