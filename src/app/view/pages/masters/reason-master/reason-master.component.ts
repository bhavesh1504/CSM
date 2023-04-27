import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { ReasonMasterElement } from '../../../../core/reason-master/models/reason-master.model';
import { ReasonMasterService } from '../../../../core/reason-master/service/reason-master.service';
import { AddEditReasonMasterComponent } from './add-edit-reason-master/add-edit-reason-master.component';

@Component({
  selector: 'app-reason-master',
  templateUrl: './reason-master.component.html',
  styleUrls: ['./reason-master.component.css']
})
export class ReasonMasterComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ELEMENT_DATA!: ReasonMasterElement[];
  displayedColumns: string[] = ['code', 'description', 'isActive', 'action'];
  dataSource = new MatTableDataSource<ReasonMasterElement>(this.ELEMENT_DATA);

  constructor(private router: Router, private reasonMasterService: ReasonMasterService,public dialog: MatDialog) {
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
    // this.router.navigate(['/home/reason-master/add-edit-reason-master'], navigationExtras);
        const dialogRef = this.dialog.open(AddEditReasonMasterComponent, {
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
      this.reasonMasterService.getReasonMasterList().subscribe(res => {
        this.dataSource.data = res.data as ReasonMasterElement[]
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
    // this.router.navigateByUrl('home/reason-master/add-edit-reason-master', { skipLocationChange: true });
    const dialogRef = this.dialog.open(AddEditReasonMasterComponent, {
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

