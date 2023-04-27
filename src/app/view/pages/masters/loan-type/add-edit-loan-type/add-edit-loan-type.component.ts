import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoanTypeService } from 'src/app/core/loan-type/service/loanType.service';

@Component({
  selector: 'app-add-edit-loan-type',
  templateUrl: './add-edit-loan-type.component.html',
  styleUrls: ['./add-edit-loan-type.component.css']
})
export class AddEditLoanTypeComponent implements OnInit {

  addEditForm: FormGroup
  queryParamData:any;
  saveBtn:boolean=true;
  createBtn:boolean=true;
  addEditHeadTitle:any;
  createAddEditBtnName='';
  _addEditFormData:any;

  checkLoanTypeCodeArray:any[]=[];
  checkLoanTypeCode:any[]=[]
  LoanTypeCodeExistError:boolean=false

  constructor(private fb: FormBuilder,private router: Router, private toastr: ToastrService , private loanTypeService: LoanTypeService,private routes:ActivatedRoute,
    public dialogRef: MatDialogRef<AddEditLoanTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    this.addEditForm = this.fb.group({
      id:[''],
      loanTypeCode: ['', Validators.compose([Validators.required])],
      loanTypeName: ['', Validators.compose([Validators.required])],
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
      this.addEditForm.get('loanTypeCode')?.disable()
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

    this.loanTypeService.getLoanTypeList().subscribe(res => {
      this.checkLoanTypeCodeArray=res.data;
    });

    setTimeout(() => {
      for(let i=0;i<this.checkLoanTypeCodeArray?.length;i++){
        this.checkLoanTypeCode.push(this.checkLoanTypeCodeArray[i]?.loanTypeCode.toLowerCase())
      }
    }, 500);
  }

  getSingleData(id:any){
    this.loanTypeService.getLoanTypeById(id).subscribe(res => {
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
    // this.router.navigateByUrl('home/enquiry-status', { skipLocationChange: true });

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
      this.loanTypeService.updateLoanTypeById(this.data.id,this._addEditFormData).subscribe(res => {
      if(res){

        const msg = "Loan Type Updated Sucessfully";
          this.toastr.success(msg,'', { timeOut: 2000 });
          // this.router.navigateByUrl('home/enquiry-status', { skipLocationChange: true });
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
      this.loanTypeService.createLoanType(this._addEditFormData).subscribe(res => {
        if(res){
          this.toastr.success(res.message,'', { timeOut: 2000 });
          // this.router.navigateByUrl('home/enquiry-status', { skipLocationChange: true });
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
    this.addEditForm.get('loanTypeCode')?.patchValue(res.loanTypeCode)
    this.addEditForm.get('loanTypeName')?.patchValue(res.loanTypeName)
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

  checkLoanTypeCodeAlreadyExit(event:any){

    if (this.checkLoanTypeCode.includes(this.addEditForm.get('loanTypeCode')?.value.toLowerCase())) {
      this.LoanTypeCodeExistError=true
      this.addEditForm.get('loanTypeCode')?.setErrors({ incorrect: true });
    } else {
      this.LoanTypeCodeExistError = false;
      this.addEditForm.get('loanTypeCode')?.setErrors(null);
    }
  }
}

