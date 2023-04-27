import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LeadStatusElement } from 'src/app/core/lead-status/models/leadStatus.model';
import { LeadStatusService } from 'src/app/core/lead-status/service/leadStatus.service';
import { AddEditLeadStatusComponent } from './add-edit-lead-status/add-edit-lead-status.component';

@Component({
  selector: 'app-lead-status',
  templateUrl: './lead-status.component.html',
  styleUrls: ['./lead-status.component.css']
})
export class LeadStatusComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ELEMENT_DATA!: LeadStatusElement[];
  displayedColumns: string[] = ['code', 'description', 'isActive', 'action'];
  dataSource = new MatTableDataSource<LeadStatusElement>(this.ELEMENT_DATA);

  constructor(private router: Router, private leadStatusService: LeadStatusService,public dialog: MatDialog) {
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
    const dialogRef = this.dialog.open(AddEditLeadStatusComponent, {
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
    setTimeout(()=>{
      this.leadStatusService.getLeadStatusList().subscribe(res => {
        this.dataSource.data = res.data as LeadStatusElement[]
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

    const dialogRef = this.dialog.open(AddEditLeadStatusComponent, {
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

