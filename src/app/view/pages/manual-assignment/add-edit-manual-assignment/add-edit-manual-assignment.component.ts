import { Component, ElementRef, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CitiesElement } from 'src/app/core/geography-masters/cities/models/cities.model';
import { CitiesService } from 'src/app/core/geography-masters/cities/service/cities.service';
import { StatesElement } from 'src/app/core/geography-masters/states/models/states.model';
import { StatesService } from 'src/app/core/geography-masters/states/service/states.service';
import { LeadSourceElement } from 'src/app/core/lead-source/models/leadSource.model';
import { LeadSourceService } from 'src/app/core/lead-source/service/leadSource.service';
import { LeadStatusElement } from 'src/app/core/lead-status/models/leadStatus.model';
import { LeadStatusService } from 'src/app/core/lead-status/service/leadStatus.service';
import { ManualAssignmentService } from 'src/app/core/manual-assignment/service/manual-assignment.service';
import { UserService } from 'src/app/core/user/service/user.service';
import { ViewUploadedFilesComponent } from '../../work-list/view-uploaded-files/view-uploaded-files.component';

@Component({
  selector: 'app-add-edit-manual-assignment',
  templateUrl: './add-edit-manual-assignment.component.html',
  styleUrls: ['./add-edit-manual-assignment.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddEditManualAssignmentComponent implements OnInit {

  addEditForm: FormGroup;

  queryParamData: any;
  saveBtn: boolean = true;
  createBtn: boolean = true;
  addEditHeadTitle: any;
  crateleadBtnName: string = ''
  urls: any = [];
  fileName: any = [];
  mobileVerifyBtn: boolean = false;
  emailVerifyBtn: boolean = false;
  VerifyBtnDiv: boolean = false;//true;
  leadApprovalScreen: boolean = false;//true;
  RejectReasonSelect: boolean = false;

  spliteRoleName: any;
  makeaRoleArray: any;

  imgUploadFilename: any;
  imgUpoloadFilecode: any;
  imgUpoladFiletype: any;
  imagUploadArray: any = [];

  salesRole: boolean = false;
  adminRole: boolean = false;
  creditRole: boolean = false;

  LeadScheduleScreen: boolean = false;
  ViewLeadScheduleScreen: boolean = false;
  LeadLoanScreen: boolean = false;
  ViewLeadLoanScreen: boolean = false;
  leadScheduleStatusOnlyView:boolean=true;
  leadApprovedStatusOnlyViewNotEdit:boolean=false
  IFLeadCreateBySeales:any

  getMobileNoFromRes:any
  getEmailNoFromRes:any

  getMobileNoFromResBtnDisable:boolean = false;
  getEmailNoFromResBtnDisabl:boolean = false;
  dateOfBirthFormate:any
  AsssinedToPlaceHolder:any

statePlaceholderName:any
cityPlaceholderName:any
leadSourcePlaceholderName:any
leadStatusPlaceholderName:any='Select Lead Status';
leadStatusLoanPlaceholderName:any='Select Lead Status';
leadStatusApprovedPlaceholderName:any='Select Lead Status';

viewLeadStage:any
ViewleadStatus:any

allLeadDetails: any = '';
byteFileData:any;
myFiles:any [] = [];
displayFileCount:any='Select File';

  AssignToName:any=[];
  viewLeadAllDetailsOnly: boolean = true;
  EditAssignToUser:boolean=false

  userDetails:any;
  userDetailAtoBValue:any='';
  roleArray:any=[];

  constructor(private leadStatusService:LeadStatusService,private statesService:StatesService,private toastr: ToastrService,private userService: UserService,private fb: FormBuilder, private router: Router, private manualAssignmentService: ManualAssignmentService, private routes: ActivatedRoute, private citiesService: CitiesService, private leadSourceService: LeadSourceService,
    public dialogRef: MatDialogRef<AddEditManualAssignmentComponent>,public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {

    this.spliteRoleName = sessionStorage.getItem('role');
    this.makeaRoleArray = this.spliteRoleName?.split(',');


    for (let j = 0; j < this.makeaRoleArray.length; j++) {

      if (this.makeaRoleArray[j] == 'Admin') {
        this.VerifyBtnDiv = true;
        this.leadApprovalScreen = true;
        this.adminRole = true;
      }
      if (this.makeaRoleArray[j] == 'Sales') {
        //this.VerifyBtnDiv=true;
        this.salesRole = true
      }
      if (this.makeaRoleArray[j] == 'Credit') {
        this.leadApprovalScreen = true;
        this.creditRole = true;
      }
    }

    this.userDetails=sessionStorage.getItem('UserDetails')
    this.userDetailAtoBValue=JSON.parse(atob(this.userDetails));

    this.addEditForm = this.fb.group({
      id: [''],
      userId: ['', Validators.compose([Validators.required])]
    })
  }

  ngOnInit(): void {

    this.routes.queryParams.subscribe(res => this.queryParamData = res);
    if (this.data.type == 'edit') {

      this.saveBtn = true;
      this.createBtn = true;
      this.addEditHeadTitle = 'Edit Manual Assignment';
      this.crateleadBtnName = 'Update'
      this.EditAssignToUser=true
      this.getSingleData(this.data.id)
      this. getAllUserForManualAssgment()
    } else if (this.data.type == 'view') {
      this.addEditHeadTitle = 'View Manual Assignment'
      this.saveBtn = false;
      this.createBtn = false;
      this.EditAssignToUser=false
      this.addEditForm.get('userId')?.clearValidators()
      this.addEditForm.get('userId')?.updateValueAndValidity
      this.getSingleData(this.data.id);
      this.addEditForm.disable();
      this.crateleadBtnName = 'Update'
    }
    else {
      this.addEditHeadTitle = 'Edit'
      this.crateleadBtnName = 'Update'
    }
  }

  getAllUserForManualAssgment(){
    let getAllUserName:any=[]
      this.manualAssignmentService.getAllUserForManualAssgment(this.data.id).subscribe(res => {
        getAllUserName=res.data

      });
      setTimeout(() => {
        for(let i=0;i<getAllUserName.length;i++){

        if(this.userDetailAtoBValue?.id != getAllUserName[i]?.id)
          this.AssignToName.push(getAllUserName[i]);
        }
      }, 500);

  }
  getSingleData(id: any) {
    this.manualAssignmentService.getLeadById(id).subscribe(res => {
      this.allLeadDetails=res.data;
      this.viewLeadStage=res.data.leadStage
      this.ViewleadStatus=res.data.leadStatus
      this.addEditForm.get('area')?.patchValue(res.data.pincode.areaName)
      this.AsssinedToPlaceHolder=res.data.assignTo.firstName+ " "+res.data.assignTo.lastName
      this.statePlaceholderName=res.data.state.stateName
      this.cityPlaceholderName=res.data.city.cityName
      if(res.data.leadSource!=null)
      this.leadSourcePlaceholderName=res.data.leadSource.leadSourceName
      this.addEditForm.patchValue(res.data)
      this.IFLeadCreateBySeales=res.data.createdBy
      this.getMobileNoFromRes=res.data.mobileNo
      this.getEmailNoFromRes=res.data.email
      this.dateOfBirthFormate=res.data.dateOfBirth
      if(res.data.user!=null){
        this.addEditForm.get('userId')?.patchValue(res.data.user.id)
        this.AsssinedToPlaceHolder=res.data.user.firstName +" "+res.data.user.lastName;
      }
      if(this.IFLeadCreateBySeales != "Sales" && res.data.leadStage=='New'){
        this.LeadScheduleScreen = true
        this.ViewLeadScheduleScreen=false
        this.saveBtn = false;
      }
      else if(this.IFLeadCreateBySeales == "Sales" && res.data.leadStage=='New'){

        this.leadScheduleStatusOnlyView=false
        this.addEditForm.get('leadLoanStatus')?.patchValue(res.data.leadStatus.id)
      }
      else if(res.data.leadStage=='Scheduled'){
        this.LeadScheduleScreen = false
        this.ViewLeadScheduleScreen=true
        this.leadStatusPlaceholderName=res.data.leadStatus.leadStatus
        this.leadScheduleStatusOnlyView=false
        this.addEditForm.get('leadLoanStatus')?.patchValue(res.data.leadStatus.id)
      }

      if (this.leadApprovalScreen == true) {
        if(this.IFLeadCreateBySeales != "Sales" && res.data.leadStage=='Under process'){
          this.LeadScheduleScreen = false
          this.ViewLeadScheduleScreen=true
        }else  if(this.IFLeadCreateBySeales == "Sales" && res.data.leadStage=='Under process'){
          this.LeadLoanScreen = false
          this.ViewLeadLoanScreen = true
        }
        this.LeadLoanScreen = false
        this.ViewLeadLoanScreen = true
      }
      if (this.data.type == 'view'){
        if(res.data.scheduleDate == null){
          this.LeadScheduleScreen = false
          this.ViewLeadScheduleScreen=false
        }
        if(res.data.product == null){
          this.LeadLoanScreen = false
          this.ViewLeadLoanScreen = false
        }
        if(res.data.approvedRemark == null){
          this.leadApprovalScreen=false
          //this.leadScheduleStatusOnlyView=false
        }
        if(res.data.leadStage=='Scheduled'){
          this.leadScheduleStatusOnlyView=true
        }
        this.saveBtn = false;
        this.leadStatusLoanPlaceholderName=res.data.leadStatus.leadStatus
        this.leadApprovedStatusOnlyViewNotEdit=true
      }
    });
  }

  viewUploadFile(id:any){
    const dialogRef = this.dialog.open(ViewUploadedFilesComponent, {
      width: '1200px',
      data: {id: id},
      autoFocus: false,
      maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.addEditForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  cancelAddEditForm() {
    this.dialogRef.close();
  }

  createAddEditForm() {
    if (this.addEditForm.invalid) {
      this.addEditForm.markAllAsTouched()
      return;
    }
        const _addEditFormData = this.addEditForm.value;

        if (this.data.type == 'edit') {
          this.manualAssignmentService.updateManuualAssignment(this.data.id, _addEditFormData).subscribe(res => {
            this.toastr.success('Mannual Assignment Updated Sucessfully','', { timeOut: 2000 });
          });
        }

       this.dialogRef.close();
      }
}
