import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  callCenterRole:boolean=false;
  salesRole:boolean=false;
  adminRole:boolean=false;
  agencyRole:boolean=false;
  creditRole:boolean=false;
  CRMRole:boolean=false;

  BHRole:boolean=false;
  RMRole:boolean=false;
  ZSHRole:boolean=false;
  BMRole:boolean=false;

  CSM:boolean=false;
  SalesCRM:boolean=false;

  spliteRoleName:any;
  makeaRoleArray:any;


  constructor(private router: Router) { }

  ngOnInit(): void {

    this.spliteRoleName=sessionStorage.getItem('role');
    this.makeaRoleArray= this.spliteRoleName?.split(',');


     for(let j=0;j<this.makeaRoleArray?.length;j++)
    {
      if(this.makeaRoleArray[j]=='Call Center')
      {
        this.callCenterRole=true;
      }
      if(this.makeaRoleArray[j]=='Admin')
      {
        this.adminRole=true;
      }
      if(this.makeaRoleArray[j]=='Sales')
      {
        this.salesRole=true;
      }
      if(this.makeaRoleArray[j]=='Agency')
      {
        this.agencyRole=true;
      }
      if(this.makeaRoleArray[j]=='Credit')
      {
        this.creditRole=true;
      }
      if(this.makeaRoleArray[j]=='CRM')
      {
        this.CRMRole=true;
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
  }

}
