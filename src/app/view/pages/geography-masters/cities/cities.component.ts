import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { CitiesElement } from 'src/app/core/geography-masters/cities/models/cities.model';
import { CitiesService } from 'src/app/core/geography-masters/cities/service/cities.service';
import { AddEditCitiesComponent } from './add-edit-cities/add-edit-cities.component';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ELEMENT_DATA!: CitiesElement[];
  displayedColumns: string[] = ['cityCode', 'cityName', 'cityClassification', 'isActive', 'action'];
  dataSource = new MatTableDataSource<CitiesElement>(this.ELEMENT_DATA);

  constructor(private router: Router, private citiesService: CitiesService,public dialog: MatDialog) {
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
   // this.router.navigate(['/home/cities/add-edit-cities'], navigationExtras);

   const dialogRef = this.dialog.open(AddEditCitiesComponent, {
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
      this.citiesService.getCitiesList().subscribe(res => {
        this.dataSource.data = res.data as CitiesElement[]
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
    // this.router.navigateByUrl('home/cities/add-edit-cities', { skipLocationChange: true });

    const dialogRef = this.dialog.open(AddEditCitiesComponent, {
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

