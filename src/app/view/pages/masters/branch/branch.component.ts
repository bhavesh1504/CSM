import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { BranchElement } from '../../../../core/branch/models/branch.model';
import { BranchService } from '../../../../core/branch/service/branch.service';
import { AddEditBranchComponent } from './add-edit-branch/add-edit-branch.component';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ELEMENT_DATA!: BranchElement[];
  displayedColumns: string[] = ['leadId','firstName', 'lastName', 'mobileNo', 'country', 'action'];
  dataSource = new MatTableDataSource<BranchElement>(this.ELEMENT_DATA);

  constructor(private router: Router, private branchService: BranchService,public dialog: MatDialog) {

    // const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    // this.dataSource = new MatTableDataSource(users);
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
    // this.router.navigate(['/home/branch/add-edit-branch'], navigationExtras);

    const dialogRef = this.dialog.open(AddEditBranchComponent, {
      width: '900px',
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
      this.branchService.getBranchList().subscribe(res => {
        this.dataSource.data = res.data as BranchElement[]
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
    // this.router.navigateByUrl('home/branch/add-edit-branch', { skipLocationChange: true });
    const dialogRef = this.dialog.open(AddEditBranchComponent, {
      width: '900px',
      data: {name: 'Fin', animal: 'Tech'},
      autoFocus: false,
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getAllDataTable();
    });
  }

  ngOnDestroy(){
    this.dataSource.disconnect()
  }
}

