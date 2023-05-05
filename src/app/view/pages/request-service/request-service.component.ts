import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LeadService } from '../../../core/lead/service/lead.service';
import { LeadElement } from '../../../core/lead/models/lead.model'

import { MatDialog } from '@angular/material/dialog';
import { AddEditRequestServiceComponent } from './add-edit-request-service/add-edit-request-service.component';
import { LoanDetailsElement } from 'src/app/core/request-service/model/service-request';
import { RequestServiceService } from 'src/app/core/request-service/service/request-service.service';
import { ViewdialogComponent } from './viewdialog/viewdialog.component';
import { EditdialogComponent } from './editdialog/editdialog.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-request-service',
  templateUrl: './request-service.component.html',
  styleUrls: ['./request-service.component.css']
})

export class RequestServiceComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ELEMENT_DATAS!: LoanDetailsElement[];
  displayedColumns: string[] = ['ReqNo', 'LoanNo', 'name', 'Requesttype', 'RequestDate', 'Status','action'];
  dataSource = new MatTableDataSource<LoanDetailsElement>(this.ELEMENT_DATAS);

  callCenterRole:boolean=true;
  agencyRole:boolean=true;
  salesRole:boolean=true;
  creditRole:boolean=true;
  spliteRoleName:any;
  makeaRoleArray:any;

  BHRole:boolean=false;
  RMRole:boolean=false;
  ZSHRole:boolean=false;
  BMRole:boolean=false;
  CSM:boolean=false;
  SalesCRM:boolean=false;

  userDetails:any;
  userDetailAtoBValue:any='';
  roleArray:any=[];
  // AllLeadsDetails:any=[]

  requestList: any = []
  queryListArray: any = []

  constructor(private router: Router, private leadService: LeadService,public dialog: MatDialog, private service:RequestServiceService) {
    this.userDetails=sessionStorage.getItem('UserDetails')
    this.userDetailAtoBValue=JSON.parse(atob(this.userDetails));
    for(let i=0;i<this.userDetailAtoBValue.role.length;i++)
    {
      this.roleArray.push(this.userDetailAtoBValue.role[i].roleName)
    }
  }

  ngOnInit() {

    this.spliteRoleName=sessionStorage.getItem('role');
    this.makeaRoleArray= this.spliteRoleName?.split(',');
     for(let j=0;j<this.makeaRoleArray.length;j++)
    {
      if(this.makeaRoleArray[j]=='Call Center')
      {
        this.callCenterRole=false;
        this.displayedColumns.pop()
      }
      if(this.makeaRoleArray[j]=='Agency')
      {
        this.agencyRole=false;
      }
      if(this.makeaRoleArray[j]=='Sales')
      {
        this.salesRole=false;
        // this.displayedColumns.push('action')
      }
      if(this.makeaRoleArray[j]=='Credit')
      {
        this.creditRole=false;
      }
      if(this.makeaRoleArray[j]=='Business Head')
      {
        this.BHRole=true;
      }
      if(this.makeaRoleArray[j]=='Regional Manager')
      {
        this.RMRole=true;
      }
      if(this.makeaRoleArray[j]=='Zonal Sales Head')
      {
        this.ZSHRole=true;
      }
      if(this.makeaRoleArray[j]=='Branch Manager')
      {
        this.BMRole=true;
      }
      if(this.makeaRoleArray[j]=='CSM')
      {
        
        this.CSM=true;
      }
      if(this.makeaRoleArray[j]=='SalesCRM')
      {
        this.SalesCRM=true;
      }
    }
    this.dataSource = new MatTableDataSource<any>(this.queryListArray.requests)
    
    console.log( this.dataSource);
   this.getAllDataTable();
  }
  editViewAction(id: any, type: any) {
    let navigationExtras = {
      queryParams: { 'id': id,'type':type },
      fragment: 'anchor',
      skipLocationChange: true
    };
    // this.router.navigate(['/home/reason-master/add-edit-reason-master'], navigationExtras);
        const dialogRef = this.dialog.open(AddEditRequestServiceComponent, {
      width: '900px',
      data: {id: id, type: type},
      autoFocus: false,
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getAllDataTable();
    });
  }
  ViewAction(data:any){
    console.log("data:any",data)
    const dialogRef = this.dialog.open(ViewdialogComponent, {
      data:data,
      width: '900px',
      autoFocus: false,
      maxHeight: '90vh'
    });
  }
  editAction(data:any){
    console.log("data:any",data)
    const dialogRef = this.dialog.open(EditdialogComponent, {
      data:data,
      width: '900px',
      autoFocus: false,
      maxHeight: '90vh'
    });
  }
  getAllDataTable() {
    setTimeout(() => {
      this.service.getAllServiceRequest().subscribe(res => {
        // console.log(res.data);
        this.dataSource.data = res.data as LoanDetailsElement[]
        console.log(this.dataSource.data[0]);
        
        this.queryListArray = this.dataSource.data
        console.log(this.queryListArray);
        
        // for (let i = 0; i < this.queryListArray?.requests.length; i++) {
        //   this.requestList.push(this.queryListArray.requests[i])
        // }
        // console.log(queryListArray);    
        // this.requestList = []
        // let requestListArray = queryListArray
        // console.log(this.requestList);
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
    //this.router.navigateByUrl('home/lead/add-edit-lead', { skipLocationChange: true });

    const dialogRef = this.dialog.open(AddEditRequestServiceComponent, {
      width: '900px',
      data: {name: 'Fin', animal: 'Tech'},
      autoFocus: false,
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      // this.getAllDataTable();
      // this.AllLeadsDetails=[]
    });
  }

ngOnDestroy(){
    this.dataSource.disconnect()
  }

  reloadData()
  {
    // this.AllLeadsDetails=[]
    // this.dataSource.disconnect()
    this.getAllDataTable();
  }

  ExportTOExcel(){
    const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.queryListArray);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
    /* save to file */
    XLSX.writeFile(wb, 'All service request.xlsx');
    
  }

}





 


