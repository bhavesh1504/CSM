import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { RoleElement } from '../../../core/role/models/role.model';
import { RoleService } from '../../../core/role/service/role.service';
import { AddEditRoleComponent } from './add-edit-role/add-edit-role.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ELEMENT_DATA!: RoleElement[];
  displayedColumns: string[] = [ 'code', 'description', 'action'];
  dataSource = new MatTableDataSource<RoleElement>(this.ELEMENT_DATA);

  constructor(private router: Router, private roleService: RoleService,public dialog: MatDialog) {
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
    // this.router.navigate(['/home/role/add-edit-role'], navigationExtras);

    const dialogRef = this.dialog.open(AddEditRoleComponent, {
      width: '650px',
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
      this.roleService.getRoleList().subscribe(res => {
        this.dataSource.data = res as RoleElement[]
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

  addRole() {
    // this.router.navigateByUrl('home/role/add-edit-role', { skipLocationChange: true });
    const dialogRef = this.dialog.open(AddEditRoleComponent, {
      width: '650px',
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

