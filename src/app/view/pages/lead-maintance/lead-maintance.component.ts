import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { LeadMaintanceElement } from '../../../core/lead-maintance/models/lead-maintance.model';
import { LeadMaintanceService } from '../../../core/lead-maintance/service/lead-maintance.service';

@Component({
  selector: 'app-lead-maintance',
  templateUrl: './lead-maintance.component.html',
  styleUrls: ['./lead-maintance.component.css'],
  // encapsulation:ViewEncapsulation.None
})
export class LeadMaintanceComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ELEMENT_DATA!: LeadMaintanceElement[];
  displayedColumns: string[] = ['leadId','firstName', 'email', 'mobileNo', 'dob', 'action'];
  dataSource = new MatTableDataSource<LeadMaintanceElement>(this.ELEMENT_DATA);

  constructor(private router: Router, private leadService: LeadMaintanceService) {

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
    this.router.navigate(['/home/lead-maintance/add-edit-lead-maintance'], navigationExtras);
  }
  getAllDataTable() {
    setTimeout(() => {
      this.leadService.getLeadList().subscribe(res => {
        //console.log(res, "res");
         //delay(1000)
        this.dataSource.data = res as LeadMaintanceElement[]
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
    this.router.navigateByUrl('home/lead-maintance/add-edit-lead-maintance', { skipLocationChange: true });
  }

ngOnDestroy(){
    this.dataSource.disconnect()
  }
}
