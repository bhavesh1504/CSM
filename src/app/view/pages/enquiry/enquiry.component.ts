import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EnquiryElement } from 'src/app/core/enquiry/models/enquiry.model';
import { EnquiryService } from 'src/app/core/enquiry/service/enquiry.service';
import { AddEditEnquiryComponent } from './add-edit-enquiry/add-edit-enquiry.component';


@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ELEMENT_DATA!: EnquiryElement[];
  displayedColumns: string[] = ['enquiryId','firstName', 'lastName', 'city','assignTo','enquiryStatus'];
  dataSource = new MatTableDataSource<EnquiryElement>(this.ELEMENT_DATA);

  AllConvertedEnquiryDetails:any[]=[]
  filtrerArray:any=[]
  isChecked = false;


  constructor(private router: Router, private enquiryService: EnquiryService,public dialog: MatDialog) {
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
    // this.router.navigate(['/home/enquiry/add-edit-enquiry'], navigationExtras);

    const dialogRef = this.dialog.open(AddEditEnquiryComponent, {
      width: '700px',
      data: {id: id, type: type},
      autoFocus: false,
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getAllDataTable();
      this.AllConvertedEnquiryDetails=[]
    });

  }
  getAllDataTable() {
    setTimeout(() => {
      this.enquiryService.getEnquiryList().subscribe(res => {

        this.filtrerArray=res.data
        for(let i=0;i<this.filtrerArray.length;i++){
          if(this.filtrerArray[i]?.isConvertedToLead == false ){
            this.AllConvertedEnquiryDetails.push(this.filtrerArray[i])
          }
        }

        this.dataSource.data = this.AllConvertedEnquiryDetails as EnquiryElement[]
      });
    }, 500);

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onChange(event: any) {
    // const { checked } = value;
    this.AllConvertedEnquiryDetails=[]
    // console.log(event.checked);
    for(let i=0;i<this.filtrerArray.length;i++){
      if(this.filtrerArray[i]?.isConvertedToLead == event.checked){
        this.AllConvertedEnquiryDetails.push(this.filtrerArray[i])
      }
    }

    this.dataSource.data = this.AllConvertedEnquiryDetails as EnquiryElement[]

  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addData() {
    //this.router.navigateByUrl('home/enquiry/add-edit-enquiry', { skipLocationChange: true });

    const dialogRef = this.dialog.open(AddEditEnquiryComponent, {
      width: '700px',
      data: {name: 'Fin', animal: 'Tech'},
      autoFocus: false,
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getAllDataTable();
      this.AllConvertedEnquiryDetails=[]
    });

  }

  bulckUploadData()
  {

  }

  ngOnDestroy(){
    this.dataSource.disconnect()
  }

  reloadData()
  {
    this.AllConvertedEnquiryDetails=[];
    // this.dataSource.disconnect()
    this.getAllDataTable();
  }
}

