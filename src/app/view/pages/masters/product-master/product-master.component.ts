import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductMasterElement } from 'src/app/core/product-master/models/ProductMaster.model';
import { ProductMasterService } from 'src/app/core/product-master/service/ProductMaster.service';
import { AddEditProductMasterComponent } from './add-edit-product-master/add-edit-product-master.component';

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.css']
})
export class ProductMasterComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ELEMENT_DATA!: ProductMasterElement[];
  displayedColumns: string[] = ['code', 'description','loanType', 'isActive', 'action'];
  dataSource = new MatTableDataSource<ProductMasterElement>(this.ELEMENT_DATA);

  constructor(private router: Router, private productMasterService: ProductMasterService,public dialog: MatDialog) {
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
    const dialogRef = this.dialog.open(AddEditProductMasterComponent, {
      width: '850px',
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
      this.productMasterService.getProductMasterList().subscribe(res => {
        this.dataSource.data = res.data as ProductMasterElement[]
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

    const dialogRef = this.dialog.open(AddEditProductMasterComponent, {
      width: '850px',
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

