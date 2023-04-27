import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RejectReasonService } from 'src/app/core/reject-reason/service/reject-reason.service';

@Component({
  selector: 'app-add-edit-reject-reason',
  templateUrl: './add-edit-reject-reason.component.html',
  styleUrls: ['./add-edit-reject-reason.component.css']
})
export class AddEditRejectReasonComponent implements OnInit {

  addEditForm: FormGroup

  queryParamData:any;
  saveBtn:boolean=true;
  createBtn:boolean=true;
  addEditHeadTitle:any;
  createAddEditBtnName='';
  _addEditFormData:any;

  checkRejectReasonCodeArray:any[]=[];
  checkRejectReasonCode:any[]=[]
  RejectReasonCodeExistError:boolean=false

  constructor(private toastr: ToastrService,private fb: FormBuilder,private router: Router, private rejectReasonService: RejectReasonService,private routes:ActivatedRoute,
    public dialogRef: MatDialogRef<AddEditRejectReasonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    this.addEditForm = this.fb.group({
      id:[''],
      rejectReasonCode: ['', Validators.compose([Validators.required])],
      rejectReasonName: ['', Validators.compose([Validators.required])],
      isActive: [true],
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
      this.addEditForm.get('rejectReasonCode')?.disable()
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

    this.rejectReasonService.getRejectReasonList().subscribe(res => {
      this.checkRejectReasonCodeArray=res.data;
    });

    setTimeout(() => {
      for(let i=0;i<this.checkRejectReasonCodeArray?.length;i++){
        this.checkRejectReasonCode.push(this.checkRejectReasonCodeArray[i]?.rejectReasonCode.toLowerCase())
      }
    }, 500);
  }

  getSingleData(id:any){
    this.rejectReasonService.getRejectReasonById(id).subscribe(res => {
       this.addEditForm.patchValue(res.data)
      //this.chekcToggleYesNo(res.data)
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
    // this.router.navigateByUrl('home/reject-reason', { skipLocationChange: true });
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
      this.rejectReasonService.updateRejectReasonById(this.data.id,this._addEditFormData).subscribe(res => {
        this.toastr.success('Reject Reason Updated Successfully','', { timeOut: 2000 });
            // this.router.navigateByUrl('home/reject-reason', { skipLocationChange: true });
             this.dialogRef.close();
      });
    }
    else{
    // this.customeTrueFalseName()
     //  this._addEditFormData.isActive='Yes'
      this.rejectReasonService.createRejectReason(this._addEditFormData).subscribe(res => {
        this.toastr.success('Reject Reason Created Successfully','', { timeOut: 2000 });
            // this.router.navigateByUrl('home/reject-reason', { skipLocationChange: true });
             this.dialogRef.close();
      });
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
    this.addEditForm.get('rejectReasonCode')?.patchValue(res.rejectReasonCode)
    this.addEditForm.get('rejectReasonName')?.patchValue(res.rejectReasonName)
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

  checkRejectReasonCodeAlreadyExit(event:any){

    if (this.checkRejectReasonCode.includes(this.addEditForm.get('rejectReasonCode')?.value.toLowerCase())) {
      this.RejectReasonCodeExistError=true
      this.addEditForm.get('rejectReasonCode')?.setErrors({ incorrect: true });
    } else {
      this.RejectReasonCodeExistError = false;
      this.addEditForm.get('rejectReasonCode')?.setErrors(null);
    }
  }
}
