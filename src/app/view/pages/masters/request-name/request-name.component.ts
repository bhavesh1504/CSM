import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RequestNameElement } from 'src/app/core/request-name/models/request-name';
import { RequestNameService } from 'src/app/core/request-name/service/request-name.service';
import { AddEditRequestNameComponent } from './add-edit-request-name/add-edit-request-name.component';

@Component({
  selector: 'app-request-name',
  templateUrl: './request-name.component.html',
  styleUrls: ['./request-name.component.css']
})
export class RequestNameComponent implements OnInit {

  requestTypeName:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ELEMENT_DATA!: RequestNameElement[];
  displayedColumns: string[] = ['s#', 'requestName', 'action'];
  dataSource = new MatTableDataSource<RequestNameElement>(this.ELEMENT_DATA);
  constructor(private router: Router, public dialog: MatDialog, private requestNameService: RequestNameService) { }

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
        const dialogRef = this.dialog.open(AddEditRequestNameComponent, {
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
      this.requestNameService.getReasonMasterList().subscribe(res => {
        console.log(res.data);
        // console.log(res.data['requestItemId']);
        
        this.dataSource.data = res.data as RequestNameElement[]
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
    const dialogRef = this.dialog.open(AddEditRequestNameComponent, {
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