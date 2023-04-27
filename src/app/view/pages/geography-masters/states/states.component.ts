import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { StatesElement } from 'src/app/core/geography-masters/states/models/states.model';
import { StatesService } from 'src/app/core/geography-masters/states/service/states.service';
import { AddEditStatesComponent } from './add-edit-states/add-edit-states.component';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})
export class StatesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ELEMENT_DATA!: StatesElement[];
  displayedColumns: string[] = ['stateCode', 'stateName','countryName', 'gstStateCode', 'unionTerritory', 'isActive', 'action'];
  dataSource = new MatTableDataSource<StatesElement>(this.ELEMENT_DATA);

  constructor(private router: Router, private statesService: StatesService,public dialog: MatDialog) {
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
    // this.router.navigate(['/home/states/add-edit-states'], navigationExtras);

    const dialogRef = this.dialog.open(AddEditStatesComponent, {
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
      this.statesService.getStatesList().subscribe(res => {
        this.dataSource.data = res as StatesElement[]
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
    // this.router.navigateByUrl('home/states/add-edit-states', { skipLocationChange: true });

    const dialogRef = this.dialog.open(AddEditStatesComponent, {
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

