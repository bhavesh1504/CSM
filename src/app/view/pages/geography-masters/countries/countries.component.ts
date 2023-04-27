import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { CountriesElement } from 'src/app/core/geography-masters/countries/models/countries.model';
import { CountriesService } from 'src/app/core/geography-masters/countries/service/countries.service';
import { AddEditCountriesComponent } from './add-edit-countries/add-edit-countries.component';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ELEMENT_DATA!: CountriesElement[];
  displayedColumns: string[] = ['code', 'description', 'isActive', 'action'];
  dataSource = new MatTableDataSource<CountriesElement>(this.ELEMENT_DATA);

  constructor(private router: Router, private countriesService: CountriesService,private changeDetectorRefs: ChangeDetectorRef,public dialog: MatDialog) {
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
    //this.router.navigate(['/home/countries/add-edit-countries'], navigationExtras);

    const dialogRef = this.dialog.open(AddEditCountriesComponent, {
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
      this.countriesService.getCountriesList().subscribe(res => {
        this.dataSource.data = res.data as CountriesElement[]
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
   // this.router.navigateByUrl('home/countries/add-edit-countries', { skipLocationChange: true });

   const dialogRef = this.dialog.open(AddEditCountriesComponent, {
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

