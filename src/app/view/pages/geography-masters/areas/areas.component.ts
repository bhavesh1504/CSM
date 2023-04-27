import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { AreasElement } from 'src/app/core/geography-masters/areas/models/areas.model';
import { AreasService } from 'src/app/core/geography-masters/areas/service/areas.service';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ELEMENT_DATA!: AreasElement[];
  displayedColumns: string[] = ['name', 'city', 'action'];
  dataSource = new MatTableDataSource<AreasElement>(this.ELEMENT_DATA);

  constructor(private router: Router, private areasService: AreasService) {
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
    this.router.navigate(['/home/areas/add-edit-areas'], navigationExtras);
  }
  getAllDataTable() {
    setTimeout(() => {
      this.areasService.getAreasList().subscribe(res => {
        this.dataSource.data = res as AreasElement[]
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
    this.router.navigateByUrl('home/areas/add-edit-areas', { skipLocationChange: true });
  }

  ngOnDestroy(){
    this.dataSource.disconnect()
  }
}

