import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LeadService } from '../../../core/lead/service/lead.service';
import { LeadElement } from '../../../core/lead/models/lead.model'

import { MatDialog } from '@angular/material/dialog';
import { NgxHttpLoaderService } from 'ngx-http-loader';
import { ToastrService } from 'ngx-toastr';
import { LoanMasterService } from 'src/app/core/loan-master/service/loan-master.service';
import { map } from 'rxjs';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver'

@Component({
  selector: 'app-loan-master',
  templateUrl: './loan-master.component.html',
  styleUrls: ['./loan-master.component.css']
})

export class LoanMasterComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ELEMENT_DATA!: LeadElement[];
  displayedColumns: string[] = ['s#','loanNo', 'mobileNo', 'amount','pancard','name','emi'];
  dataSource = new MatTableDataSource<LeadElement>(this.ELEMENT_DATA);

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

  userDetails:any;
  userDetailAtoBValue:any='';
  roleArray:any=[];
  AllLeadsDetails:any=[];
  myFiles: any[] = [];

  constructor(private router: Router, private leadService: LeadService,public dialog: MatDialog, private ngxhttploader: NgxHttpLoaderService, private toastr: ToastrService, private service: LoanMasterService) {
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
      // if(this.makeaRoleArray[j]=='Regional Manager')
      // {
      //   this.RMRole=true;
      // }
      if(this.makeaRoleArray[j]=='Zonal Sales Head')
      {
        this.ZSHRole=true;
      }
      if(this.makeaRoleArray[j]=='Branch Manager')
      {
        this.BMRole=true;
      }
    }

    // this.getAllDataTable();
    this.loanMaster();
  }
  editViewAction(id: any, type: any) {
    // let navigationExtras = {
    //   queryParams: { 'id': id,'type':type },
    //   fragment: 'anchor',
    //   skipLocationChange: true
    // };
    // //this.router.navigate(['/home/lead/add-edit-lead'], navigationExtras);
    // const dialogRef = this.dialog.open(AddEditLeadComponent, {
    //   width: '1200px',
    //   data: {id: id, type: type},
    //   autoFocus: false,
    //   maxHeight: '90vh'
    // });

    // dialogRef.afterClosed().subscribe((result: any) => {
    //   this.getAllDataTable();
    //   this.AllLeadsDetails=[]
    // });
  }
  // getAllDataTable() {
  //   setTimeout(() => {
  //     this.leadService.getLeadList().subscribe(res => {
  //     let filtrerArray=res.data

  //     if(this.BMRole==true)
  //     {
  //       let BranchIdArray=[]
  //       let BranchDeatilsArray=this.userDetailAtoBValue?.branch;
  //       for(let a=0;a<BranchDeatilsArray.length;a++){
  //         BranchIdArray.push(BranchDeatilsArray[a]?.id)
  //       }

  //       for(let i=0;i<filtrerArray.length;i++){

  //         if(BranchIdArray.includes(filtrerArray[i].pincode?.branch?.id)){
  //           this.AllLeadsDetails.push(filtrerArray[i])
  //         }
  //       }
  //       this.dataSource.data = this.AllLeadsDetails as LeadElement[];

  //     }else if(this.ZSHRole==true){

  //       let ZoneIdArray=[]
  //       let ZoneDeatilsArray=this.userDetailAtoBValue?.branch;
  //       for(let a=0;a<ZoneDeatilsArray.length;a++){
  //         ZoneIdArray.push(ZoneDeatilsArray[a]?.region?.id)
  //       }

  //       for(let i=0;i<filtrerArray.length;i++){

  //         if(ZoneIdArray.includes(filtrerArray[i].pincode?.branch?.region?.id)){
  //           this.AllLeadsDetails.push(filtrerArray[i])
  //         }
  //       }
  //       this.dataSource.data = this.AllLeadsDetails as LeadElement[];

  //     }else if(this.salesRole==false ){

  //       for(let i=0;i<filtrerArray.length;i++){

  //         if(this.userDetailAtoBValue?.id == filtrerArray[i].assignTo?.id || this.userDetailAtoBValue?.id == filtrerArray[i]?.primaryAssigned){
  //           this.AllLeadsDetails.push(filtrerArray[i])
  //         }
  //       }

  //       // this.dataSource.data = this.AllLeadsDetails as LeadElement[];

  //     }else if( this.creditRole==false ){

  //       for(let i=0;i<filtrerArray.length;i++){

  //         if(this.userDetailAtoBValue?.id == filtrerArray[i].assignTo?.id || this.userDetailAtoBValue?.id == filtrerArray[i]?.creditAssigned){
  //           this.AllLeadsDetails.push(filtrerArray[i])
  //         }
  //       }

  //       this.dataSource.data = this.AllLeadsDetails as LeadElement[];

  //     }
  //     else if(this.BHRole==true){
  //       this.dataSource.data = res.data as LeadElement[]
  //     }


  //      // this.dataSource.data = res.data as LeadElement[]
  //     });
  //   }, 500);

  // }

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
  const input = document.createElement('input') ;
  input.type = 'file';
  input.onchange = () => {
    if (input.files && input.files.length) {
    const file = input.files[0];
    this.service.fileUpload(file).subscribe(res => {
    });
    // const reader = new FileReader();
    // reader.readAsText(file);
    // reader.onload = () => {
      // if (this.myFiles.length != 0) {
        
      // }
      // console.log(reader.result);
      this.toastr.success('File Uploaded Successfully')
    };
  };input.click();
  this.ngxhttploader.show();
  setTimeout(() => {
    this.ngxhttploader.hide();
    
  }, 500);
}

 


sample(){
  const filename = 'sample_loanmaster.xlsx'; // replace with the name of your Excel file
  const filePath = '/assets/images/1/Sample_Loanmaster.xlsx'; // replace with the path to your Excel file
  const fileType = 'application/vnd.ms-excel'; // replace with the MIME type of your Excel file

  // initiate file download using FileSaver.js
  // FileSaver.saveAs(filePath, filename, { type: fileType });
  FileSaver.saveAs(filePath, filename, { type: fileType } as unknown as FileSaver.FileSaverOptions);
}

ngOnDestroy(){
    this.dataSource.disconnect()
  }

  reloadData()
  {
    this.AllLeadsDetails=[]
    // this.dataSource.disconnect()
    // this.getAllDataTable();
  }

  loanMaster(){
    setTimeout(() => {
      this.service.getLoanMaster().pipe(map(res=>{
        if(res.msgKey == 'Success'){
        this.dataSource.data = res.data
        this.toastr.success(res.message);
        console.log('loanmaster',this.dataSource.data);
        }else{
          this.toastr.error(res.message)
        }  
      }
      )).subscribe();
    }, 500);
    
  }

  ExportTOExcel() {
    const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.dataSource.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
    /* save to file */
    XLSX.writeFile(wb, 'Loan Master.xlsx');
  }

}
