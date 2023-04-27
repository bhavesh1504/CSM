import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { EnquiryWorklistElement } from 'src/app/core/enquiry-worklist/models/enquiry-worklist.model';
import { EnquiryWorklistService } from 'src/app/core/enquiry-worklist/service/enquiry-worklist.service';
import { AddEditEnquiryWorklistComponent } from './add-edit-enquiry-worklist/add-edit-enquiry-worklist.component';
import * as moment from 'moment';

@Component({
  selector: 'app-enquiry-worklist',
  templateUrl: './enquiry-worklist.component.html',
  styleUrls: ['./enquiry-worklist.component.css']
})
export class EnquiryWorklistComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ELEMENT_DATA!: EnquiryWorklistElement[];
  displayedColumns: string[] = ['enquiryWorklistId','firstName', 'lastName', 'mobileNo', 'product','city','pincode', 'action'];
  dataSource = new MatTableDataSource<EnquiryWorklistElement>(this.ELEMENT_DATA);

  salesRole:boolean=false;

  spliteRoleName:any;
  makeaRoleArray:any;

   AllAssignToEnquiryDetails:any[]=[]

  userDetails:any;
  userDetailAtoBValue:any='';
  roleArray:any=[];

  date = new Date();


  constructor(private router: Router,private authService:AuthService, private enquiryWorklistService: EnquiryWorklistService,public dialog: MatDialog) {
  }

  ngOnInit() {

    if (this.authService.isLoggedIn()) {
      this.userDetails=sessionStorage.getItem('UserDetails')
      this.userDetailAtoBValue=JSON.parse(atob(this.userDetails));
      for(let i=0;i<this.userDetailAtoBValue.role.length;i++)
      {
        this.roleArray.push(this.userDetailAtoBValue.role[i].roleName)
      }

    }

    this.spliteRoleName=sessionStorage.getItem('role');
    this.makeaRoleArray= this.spliteRoleName?.split(',');


     for(let j=0;j<this.makeaRoleArray.length;j++)
    {
      if(this.makeaRoleArray[j]=='Sales')
      {
        this.salesRole=true;
      }
    }
    setTimeout(() => {
      this.getAllDataTable();
    }, 500);

  }
  editViewAction(id: any, type: any) {
    let navigationExtras = {
      queryParams: { 'id': id,'type':type },
      fragment: 'anchor',
      skipLocationChange: true
    };
    // this.router.navigate(['/home/enquiry-worklist/add-edit-enquiry-worklist'], navigationExtras);

    const dialogRef = this.dialog.open(AddEditEnquiryWorklistComponent, {
      width: '1200px',
      data: {id: id, type: type},
      autoFocus: false,
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getAllDataTable();
      this.AllAssignToEnquiryDetails=[]
    });

  }
  getAllDataTable() {
    let todaydateFormate:any;
      todaydateFormate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
    setTimeout(() => {
      this.enquiryWorklistService.getEnquiryWorklistList()
      .subscribe(res => {
        let filtrerArray=res.data
        for(let i=0;i<filtrerArray.length;i++){
          if(filtrerArray[i].assignTo?.id == this.userDetailAtoBValue?.id && filtrerArray[i].isConvertedToLead == false && filtrerArray[i].enquiryStage != 'Closed'
          // && moment(filtrerArray[i].scheduleDate).format() <= moment(todaydateFormate).format()
          ){
            this.AllAssignToEnquiryDetails.push(filtrerArray[i])
          }
        }
      this.dataSource.data = this.AllAssignToEnquiryDetails as EnquiryWorklistElement[]
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
    // this.router.navigateByUrl('home/enquiry-worklist/add-edit-enquiry-worklist', { skipLocationChange: true });
    const dialogRef = this.dialog.open(AddEditEnquiryWorklistComponent, {
      width: '700px',
      data: {name: 'Fin', animal: 'Tech'},
      autoFocus: false,
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getAllDataTable();
      this.AllAssignToEnquiryDetails=[]
    });
  }

  ngOnDestroy(){
    this.dataSource.disconnect()
  }

  reloadData()
  {
    this.AllAssignToEnquiryDetails=[];
    // this.dataSource.disconnect()
    this.getAllDataTable();
  }
}

