import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LeadStatusService } from 'src/app/core/lead-status/service/leadStatus.service';

@Component({
  selector: 'app-add-edit-lead-status',
  templateUrl: './add-edit-lead-status.component.html',
  styleUrls: ['./add-edit-lead-status.component.css']
})
export class AddEditLeadStatusComponent implements OnInit {

  addEditForm: FormGroup
  queryParamData:any;
  saveBtn:boolean=true;
  createBtn:boolean=true;
  addEditHeadTitle:any;
  createAddEditBtnName='';
  _addEditFormData:any;

  checkLeadStatusCodeArray:any[]=[];
  checkLeadStatusCode:any[]=[]
  LeadStatusCodeExistError:boolean=false

  constructor(private fb: FormBuilder,private router: Router, private toastr: ToastrService , private leadStatusService: LeadStatusService,private routes:ActivatedRoute,
    public dialogRef: MatDialogRef<AddEditLeadStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    this.addEditForm = this.fb.group({
      id:[''],
      leadStatusCode: ['', Validators.compose([Validators.required])],
      leadStatus: ['', Validators.compose([Validators.required])],
      isActive: [true],
    })
  }

  ngOnInit(): void {
    this.routes.queryParams.subscribe(res=>{
      this.queryParamData=res});
    if(this.data.type=='edit')
    {
      this.saveBtn=true;
      this.createBtn=true;
      this.addEditHeadTitle='Edit'
      this.createAddEditBtnName='Submit'
      this.addEditForm.get('leadStatusCode')?.disable()
      this.getSingleData(this.data.id)
    }else if(this.data.type=='view'){
      this.addEditHeadTitle='View'
      this.saveBtn=false;
      this.createBtn=false;
      this.getSingleData(this.data.id);
      this.addEditForm.disable();
    }
    else{
      this.addEditHeadTitle='Create'
      this.createAddEditBtnName='Create'
    }

    this.leadStatusService.getLeadStatusList().subscribe(res => {
      this.checkLeadStatusCodeArray=res.data;
    });

    setTimeout(() => {
      for(let i=0;i<this.checkLeadStatusCodeArray?.length;i++){
        this.checkLeadStatusCode.push(this.checkLeadStatusCodeArray[i]?.leadStatusCode.toLowerCase())
      }
    }, 500);
  }

  getSingleData(id:any){
    this.leadStatusService.getLeadStatusById(id).subscribe(res => {
     // this.chekcToggleYesNo(res.data)
     this.addEditForm.patchValue(res.data)
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
    // this.router.navigateByUrl('home/lead-status', { skipLocationChange: true });

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
    //  this.customeTrueFalseName()
      this.leadStatusService.updateLeadStatusById(this.data.id,this._addEditFormData).subscribe(res => {
      if(res){

        const msg = "Request Status Updated Sucessfully";
          this.toastr.success(msg,'', { timeOut: 2000 });
          // this.router.navigateByUrl('home/lead-status', { skipLocationChange: true });
              this.dialogRef.close();
      }
      },
      (error)=>{
      const msg =error.error.msgKey + ". " + error.error.message;
      this.toastr.error(msg,'', { timeOut: 2000 });}
      );
    }
    else{
    //  this.customeTrueFalseName()
     //  this._addEditFormData.isActive='Yes'
      this.leadStatusService.createLeadStatus(this._addEditFormData).subscribe(res => {
        if(res){
          this.toastr.success(res.message,'', { timeOut: 2000 });
          // this.router.navigateByUrl('home/lead-status', { skipLocationChange: true });
              this.dialogRef.close();
        }
        },
        (error)=>{
          const msg =error.error.msgKey + ". " + error.error.message;
          this.toastr.error(msg,'', { timeOut: 2000 });
        }
        );
    }

  }

  customeTrueFalseName()
  {
    this.toggleTrueFalse('isActive')
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
    this.addEditForm.get('leadStatusCode')?.patchValue(res.leadStatusCode)
    this.addEditForm.get('leadStatus')?.patchValue(res.leadStatus)
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

  checkLeadStatusCodeAlreadyExit(event:any){

    if (this.checkLeadStatusCode.includes(this.addEditForm.get('leadStatusCode')?.value.toLowerCase())) {
      this.LeadStatusCodeExistError=true
      this.addEditForm.get('leadStatusCode')?.setErrors({ incorrect: true });
    } else {
      this.LeadStatusCodeExistError = false;
      this.addEditForm.get('leadStatusCode')?.setErrors(null);
    }
  }
}

