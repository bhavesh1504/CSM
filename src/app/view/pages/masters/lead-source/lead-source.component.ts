import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { LeadSourceElement } from '../../../../core/lead-source/models/leadSource.model';
import { LeadSourceService } from '../../../../core/lead-source/service/leadSource.service';
import { AddEditLeadSourceComponent } from './add-edit-lead-source/add-edit-lead-source.component';

@Component({
  selector: 'app-lead-source',
  templateUrl: './lead-source.component.html',
  styleUrls: ['./lead-source.component.css']
})
export class LeadSourceComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ELEMENT_DATA!: LeadSourceElement[];
  displayedColumns: string[] = ['code', 'description', 'isActive', 'action'];
  dataSource = new MatTableDataSource<LeadSourceElement>(this.ELEMENT_DATA);

  constructor(private router: Router, private leadSourceService: LeadSourceService,public dialog: MatDialog) {
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
    // this.router.navigate(['/home/lead-source/add-edit-lead-source'], navigationExtras);
    const dialogRef = this.dialog.open(AddEditLeadSourceComponent, {
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
      this.leadSourceService.getLeadSourceList().subscribe(res => {
        this.dataSource.data = res.data as LeadSourceElement[]
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
    // this.router.navigateByUrl('home/lead-source/add-edit-lead-source', { skipLocationChange: true });

    const dialogRef = this.dialog.open(AddEditLeadSourceComponent, {
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

