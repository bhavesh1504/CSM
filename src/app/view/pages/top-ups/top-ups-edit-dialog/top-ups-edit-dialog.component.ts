import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TopupDialogComponent } from '../topup-dialog/topup-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LeadStatusService } from 'src/app/core/lead-status/service/leadStatus.service';
import { RoleService } from 'src/app/core/role/service/role.service';
import { TopupsService } from 'src/app/core/top-ups/topups.service';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-top-ups-edit-dialog',
  templateUrl: './top-ups-edit-dialog.component.html',
  styleUrls: ['./top-ups-edit-dialog.component.css']
})
export class TopUpsEditDialogComponent implements OnInit {

  serviceRequest: any;
  statusGroup!: FormGroup;
  userGroup!: FormGroup
  requestStatuss: any;
  serviceRequests:any;
  userStatuss:any;
  userStatus:any;
  status:any;
  roles:any;

  constructor(public dialogRef: MatDialogRef<TopUpsEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private service: LeadStatusService, private services: RoleService, private servicess: TopupsService, private tosater: ToastrService) { }

    ngOnInit(): void {
      console.log(this.data);
      this.serviceRequests = this.data.data
      console.log(this.serviceRequests);
      this.serviceRequest = this.data.data.status
      console.log('inside data',this.serviceRequest)
      this.userStatus = this.data.data.assignTo
      console.log('inside data',this.userStatus)
      this.getStatus();
      this.getUserStatus();

      this.statusGroup = this.fb.group({
        requestType: ['']
    });

      this.userGroup = this.fb.group({
        userType: ['']
      });
    }
  
    cancelAddEditForm() {
      //this.router.navigateByUrl('home/reason-master', { skipLocationChange: true });
      this.dialogRef.close();
    }

    getStatus(){
      this.service.getLeadStatusList().subscribe((res => {
        this.requestStatuss = res.data
        console.log('Status',this.requestStatuss);
        
      }))
    }

    getUserStatus(){
      this.services.getRoleList().subscribe(((res:any) => {
        this.userStatuss = res
        console.log(this.userStatuss)
        // console.log('user',this.userStatuss);
        
      }))
    }

    cancelRequestDetails(){
      this.dialogRef.close();
    }

    getRequestDetails(){
      this.status = this.statusGroup.controls['requestType'].value;
      this.roles = this.userGroup.controls['userType'].value

      this.servicess.updateTopUps(this.data.data.topUpId,this.roles,this.status).pipe(map(res => {
        console.log('response:', res);
        if(res.msgKey == "Success"){
          this.tosater.success(res.message)
          this.dialogRef.close();
        }else {
          this.tosater.error('Error Top-Up not updated successfully')
        }
      })).subscribe();
    }

}
