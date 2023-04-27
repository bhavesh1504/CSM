import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReasonMasterService } from '../../../../../core/reason-master/service/reason-master.service';

@Component({
  selector: 'app-add-edit-reason-master',
  templateUrl: './add-edit-reason-master.component.html',
  styleUrls: ['./add-edit-reason-master.component.css']
})
export class AddEditReasonMasterComponent implements OnInit {

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

  constructor(private toastr: ToastrService,private fb: FormBuilder,private router: Router, private reasonMasterService: ReasonMasterService,private routes:ActivatedRoute,
    public dialogRef: MatDialogRef<AddEditReasonMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    this.addEditForm = this.fb.group({
      id:[''],
      regionCode: ['', Validators.compose([Validators.required])],
      regionName: ['', Validators.compose([Validators.required])],
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
      this.addEditForm.get('regionCode')?.disable()
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

    this.reasonMasterService.getReasonMasterList().subscribe(res => {
      this.checkRegionMasterCodeArray=res.data;
    });

    setTimeout(() => {
      for(let i=0;i<this.checkRegionMasterCodeArray?.length;i++){
        this.checkRegionMasterCode.push(this.checkRegionMasterCodeArray[i]?.regionCode.toLowerCase())
      }
    }, 500);
  }

  getSingleData(id:any){
    this.reasonMasterService.getReasonMasterById(id).subscribe(res => {
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
      this.reasonMasterService.updateReasonMasterById(this.data.id,this._addEditFormData).subscribe(res => {
        this.toastr.success('Region Updated Successfully','', { timeOut: 2000 });
            // this.router.navigateByUrl('home/reason-master', { skipLocationChange: true });
             this.dialogRef.close();
      });
    }
    else{
     // this.customeTrueFalseName()
     //  this._addEditFormData.isActive='Yes'
      this.reasonMasterService.createReasonMaster(this._addEditFormData).subscribe(res => {
        this.toastr.success('Region Created Successfully','', { timeOut: 2000 });
            // this.router.navigateByUrl('home/reason-master', { skipLocationChange: true });
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
    this.addEditForm.get('regionCode')?.patchValue(res.regionCode)
    this.addEditForm.get('regionName')?.patchValue(res.regionName)
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

    if (this.checkRegionMasterCode.includes(this.addEditForm.get('regionCode')?.value.toLowerCase())) {
      this.RegionMasterCodeExistError=true
      this.addEditForm.get('regionCode')?.setErrors({ incorrect: true });
    } else {
      this.RegionMasterCodeExistError = false;
      this.addEditForm.get('regionCode')?.setErrors(null);
    }
  }
}
