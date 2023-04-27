import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RejectReasonElement } from 'src/app/core/reject-reason/models/reject-reason.model';
import { RejectReasonService } from 'src/app/core/reject-reason/service/reject-reason.service';
import { AddEditRejectReasonComponent } from './add-edit-reject-reason/add-edit-reject-reason.component';

@Component({
  selector: 'app-reject-reason',
  templateUrl: './reject-reason.component.html',
  styleUrls: ['./reject-reason.component.css']
})
export class RejectReasonComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ELEMENT_DATA!: RejectReasonElement[];
  displayedColumns: string[] = ['code', 'description', 'isActive', 'action'];
  dataSource = new MatTableDataSource<RejectReasonElement>(this.ELEMENT_DATA);

  constructor(private router: Router, private rejectReasonService: RejectReasonService,public dialog: MatDialog) {
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
    // this.router.navigate(['/home/reject-reason/add-edit-reject-reason'], navigationExtras);
    const dialogRef = this.dialog.open(AddEditRejectReasonComponent, {
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
      this.rejectReasonService.getRejectReasonList().subscribe(res => {
        this.dataSource.data = res.data as RejectReasonElement[]
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
    // this.router.navigateByUrl('home/reject-reason/add-edit-reject-reason', { skipLocationChange: true });

    const dialogRef = this.dialog.open(AddEditRejectReasonComponent, {
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

