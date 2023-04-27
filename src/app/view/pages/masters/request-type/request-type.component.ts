import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RequestTypeElement } from 'src/app/core/request-type/models/request-type';
import { RequestTypeService } from 'src/app/core/request-type/service/request-type.service';
import {AddEditRequestTypeComponent} from './add-edit-request-type/add-edit-request-type.component';

@Component({
  selector: 'app-request-type',
  templateUrl: './request-type.component.html',
  styleUrls: ['./request-type.component.css']
})
export class RequestTypeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ELEMENT_DATA!: RequestTypeElement[];
  displayedColumns: string[] = ['code', 'description', 'isActive', 'action'];
  dataSource = new MatTableDataSource<RequestTypeElement>(this.ELEMENT_DATA);
  constructor(private router: Router, public dialog: MatDialog, private requestTypeService: RequestTypeService) { }

  ngOnInit(): void {
    this.getAllDataTable();
  }

  editViewAction(id: any, type: any) {
    let navigationExtras = {
      queryParams: { 'id': id,'type':type },
      fragment: 'anchor',
      skipLocationChange: true
    };
    // this.router.navigate(['/home/reason-master/add-edit-reason-master'], navigationExtras);
        const dialogRef = this.dialog.open(AddEditRequestTypeComponent, {
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
    setTimeout(() => {
      this.requestTypeService.getReasonMasterList().subscribe(res => {
        this.dataSource.data = res.data as RequestTypeElement[]
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

  addData(){
    const dialogRef = this.dialog.open(AddEditRequestTypeComponent, {
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
