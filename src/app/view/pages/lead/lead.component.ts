import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LeadService } from '../../../core/lead/service/lead.service';
import { LeadElement } from '../../../core/lead/models/lead.model'
import { AddEditLeadComponent } from './add-edit-lead/add-edit-lead.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css'],
})
export class LeadComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ELEMENT_DATA!: LeadElement[];
  displayedColumns: string[] = ['leadId','firstName', 'lastName', 'mobileNo', 'email','leadStage'];
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
  AllLeadsDetails:any=[]

  constructor(private router: Router, private leadService: LeadService,public dialog: MatDialog) {
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

   this.getAllDataTable();
  }
  editViewAction(id: any, type: any) {
    let navigationExtras = {
      queryParams: { 'id': id,'type':type },
      fragment: 'anchor',
      skipLocationChange: true
    };
    //this.router.navigate(['/home/lead/add-edit-lead'], navigationExtras);
    const dialogRef = this.dialog.open(AddEditLeadComponent, {
      width: '1200px',
      data: {id: id, type: type},
      autoFocus: false,
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getAllDataTable();
      this.AllLeadsDetails=[]
    });
  }
  getAllDataTable() {
    setTimeout(() => {
      this.leadService.getLeadList().subscribe(res => {
      let filtrerArray=res.data

      if(this.BMRole==true)
      {
        let BranchIdArray=[]
        let BranchDeatilsArray=this.userDetailAtoBValue?.branch;
        for(let a=0;a<BranchDeatilsArray.length;a++){
          BranchIdArray.push(BranchDeatilsArray[a]?.id)
        }

        for(let i=0;i<filtrerArray.length;i++){

          if(BranchIdArray.includes(filtrerArray[i].pincode?.branch?.id)){
            this.AllLeadsDetails.push(filtrerArray[i])
          }
        }
        this.dataSource.data = this.AllLeadsDetails as LeadElement[];

      }else if(this.ZSHRole==true){

        let ZoneIdArray=[]
        let ZoneDeatilsArray=this.userDetailAtoBValue?.branch;
        for(let a=0;a<ZoneDeatilsArray.length;a++){
          ZoneIdArray.push(ZoneDeatilsArray[a]?.region?.id)
        }

        for(let i=0;i<filtrerArray.length;i++){

          if(ZoneIdArray.includes(filtrerArray[i].pincode?.branch?.region?.id)){
            this.AllLeadsDetails.push(filtrerArray[i])
          }
        }
        this.dataSource.data = this.AllLeadsDetails as LeadElement[];

      }else if(this.salesRole==false ){

        for(let i=0;i<filtrerArray.length;i++){

          if(this.userDetailAtoBValue?.id == filtrerArray[i].assignTo?.id || this.userDetailAtoBValue?.id == filtrerArray[i]?.primaryAssigned){
            this.AllLeadsDetails.push(filtrerArray[i])
          }
        }

        this.dataSource.data = this.AllLeadsDetails as LeadElement[];

      }else if( this.creditRole==false ){

        for(let i=0;i<filtrerArray.length;i++){

          if(this.userDetailAtoBValue?.id == filtrerArray[i].assignTo?.id || this.userDetailAtoBValue?.id == filtrerArray[i]?.creditAssigned){
            this.AllLeadsDetails.push(filtrerArray[i])
          }
        }

        this.dataSource.data = this.AllLeadsDetails as LeadElement[];

      }
      else if(this.BHRole==true){
        this.dataSource.data = res.data as LeadElement[]
      }


       // this.dataSource.data = res.data as LeadElement[]
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

    const dialogRef = this.dialog.open(AddEditLeadComponent, {
      width: '700px',
      data: {name: 'Fin', animal: 'Tech'},
      autoFocus: false,
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getAllDataTable();
      this.AllLeadsDetails=[]
    });
  }

ngOnDestroy(){
    this.dataSource.disconnect()
  }

  reloadData()
  {
    this.AllLeadsDetails=[]
    // this.dataSource.disconnect()
    this.getAllDataTable();
  }
}
