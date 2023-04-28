import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {  RequestTypeService } from '../../../../../core/request-type/service/request-type.service';
import { ReasonMasterService } from '../../../../../core/reason-master/service/reason-master.service';

@Component({
  selector: 'app-add-edit-request-type',
  templateUrl: './add-edit-request-type.component.html',
  styleUrls: ['./add-edit-request-type.component.css']
})
export class AddEditRequestTypeComponent implements OnInit {

  addEditForm: FormGroup

  queryParamData:any;
  saveBtn:boolean=true;
  createBtn:boolean=true;
  addEditHeadTitle:any;
  createAddEditBtnName='';
  _addEditFormData:any;

  checkRegionMasterCodeArray:any[]=[];
  checkRegionMasterCode:any[]=[]
  RegionMasterCodeExistError:boolean=false

  constructor(private toastr: ToastrService,private fb: FormBuilder,private router: Router, private reasonMasterService: ReasonMasterService, private requestTypeService: RequestTypeService, private routes:ActivatedRoute,
    public dialogRef: MatDialogRef<AddEditRequestTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    this.addEditForm = this.fb.group({
      id:[''],
      requestTypeCode: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      active: [true],
    })
  }

  ngOnInit(): void {
    this.routes.queryParams.subscribe(res=>this.queryParamData=res);
    if(this.data.type=='edit')
    {
      this.saveBtn=true;
      this.createBtn=true;
      this.addEditHeadTitle='Edit'
      this.createAddEditBtnName='Submit'
      this.getSingleData(this.data.id)
      this.addEditForm.get('regionCode')?.disable()
    }else if(this.data.type=='view'){
      this.addEditHeadTitle='View'
      this.saveBtn=false;
      this.createBtn=false;
      this.getSingleData(this.data.id);
      this.addEditForm.disable();
    }
    else{
      this.addEditHeadTitle='Add'
      this.createAddEditBtnName='Create'
    }

    this.requestTypeService.getReasonMasterList().subscribe(res => {
      this.checkRegionMasterCodeArray=res.data;
      console.log(this.checkRegionMasterCodeArray)
    });

    setTimeout(() => {
      for(let i=0;i<this.checkRegionMasterCodeArray?.length;i++){
        this.checkRegionMasterCode.push(this.checkRegionMasterCodeArray[i]?.requestTypeCode?.toLowerCase())
      }
    }, 500);
  }

  getSingleData(id:any){
    this.requestTypeService.getReasonMasterById(id).subscribe(res => {
      console.log(res);
      
       this.addEditForm.patchValue(res.data)
     // this.chekcToggleYesNo(res.data)
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

  omitCharacters(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  omitSpecialChar(event: any) {
    let k;
    k = event.charCode; //         k = event.keyCode;  (Both can be used)
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      k == 32 ||
      (k >= 48 && k <= 57)
    );
  }

  acceptChar(event: any) {
    let k;
    k = event.charCode; //         k = event.keyCode;  (Both can be used)
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      (k >= 48 && k <= 57) ||
      k == 47
      || k == 32       //accept forward slash for DL
    );
  }

  cancelAddEditForm(){
    //this.router.navigateByUrl('home/reason-master', { skipLocationChange: true });
    this.dialogRef.close();
  }
  saveAddEditForm(){

  }
  createAddEditForm(){
    if (this.addEditForm.invalid) {
      this.addEditForm.markAllAsTouched()
      return;
    }
     this._addEditFormData = this.addEditForm.value;

    if(this.data.type=='edit'){
     // this.customeTrueFalseName()
      this.requestTypeService.updateReasonMasterById(this.data.id,this._addEditFormData).subscribe(res => {
        this.toastr.success('Request Type Updated Successfully','', { timeOut: 2000 });
            // this.router.navigateByUrl('home/reason-master', { skipLocationChange: true });
             this.dialogRef.close();
      });
    }
    else{
     // this.customeTrueFalseName()
     //  this._addEditFormData.isActive='Yes'
      this.requestTypeService.createReasonMaster(this._addEditFormData).subscribe(res => {
        console.log('data',res)
        this.toastr.success('Request Type Created Successfully','', { timeOut: 2000 });
            // this.router.navigateByUrl('home/reason-master', { skipLocationChange: true });
             this.dialogRef.close();
      });
    }

  }

  customeTrueFalseName()
  {
    this.toggleTrueFalse('active')
  }
  toggleTrueFalse(formvalue: any){

    if(this.addEditForm.get(formvalue)?.value == true)
      {

        this._addEditFormData[formvalue]='Yes'
      }
      else{

        this._addEditFormData[formvalue]='No'
      }
  }
  chekcToggleYesNo(res:any){

    // this.putYesNoToTrueFalse(res.isActive,'isActive')

    this.addEditForm.get('id')?.patchValue(res.id)
    this.addEditForm.get('requestTypeCode')?.patchValue(res.requestTypeCode)
    this.addEditForm.get('description')?.patchValue(res.description)
  }
  putYesNoToTrueFalse(resName:any,conrol:any)
  {

    if(resName == 'Yes')
    {

      this.addEditForm.get(conrol)?.patchValue(true)
    }
    else{

      this.addEditForm.get(conrol)?.patchValue(false)
    }
  }

  checkRegionMasterCodeAlreadyExit(event:any){

    if (this.checkRegionMasterCode.includes(this.addEditForm.get('requestTypeCode')?.value.toLowerCase())) {
      this.RegionMasterCodeExistError=true
      this.addEditForm.get('requestTypeCode')?.setErrors({ incorrect: true });
    } else {
      this.RegionMasterCodeExistError = false;
      this.addEditForm.get('requestTypeCode')?.setErrors(null);
    }
  }
}

