import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EnquiryStatusElement } from 'src/app/core/enquiry-status/models/enquiryStatus.model';
import { EnquiryStatusService } from 'src/app/core/enquiry-status/service/enquiryStatus.service';
import { AddEditEnquiryStatusComponent } from './add-edit-enquiry-status/add-edit-enquiry-status.component';

@Component({
  selector: 'app-enquiry-status',
  templateUrl: './enquiry-status.component.html',
  styleUrls: ['./enquiry-status.component.css']
})
export class EnquiryStatusComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ELEMENT_DATA!: EnquiryStatusElement[];
  displayedColumns: string[] = ['code', 'description', 'isActive', 'action'];
  dataSource = new MatTableDataSource<EnquiryStatusElement>(this.ELEMENT_DATA);

  constructor(private router: Router, private enquiryStatusService: EnquiryStatusService,public dialog: MatDialog) {
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
    const dialogRef = this.dialog.open(AddEditEnquiryStatusComponent, {
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
      this.enquiryStatusService.getEnquiryStatusList().subscribe(res => {
        this.dataSource.data = res.data as EnquiryStatusElement[]
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

    const dialogRef = this.dialog.open(AddEditEnquiryStatusComponent, {
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

