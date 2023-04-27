import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDepartmentService } from '../../../../../core/user-department/service/userDepartment.service';

@Component({
  selector: 'app-add-edit-user-department',
  templateUrl: './add-edit-user-department.component.html',
  styleUrls: ['./add-edit-user-department.component.css']
})
export class AddEditUserDepartmentComponent implements OnInit {

  addEditForm: FormGroup

  queryParamData:any;
  saveBtn:boolean=true;
  createBtn:boolean=true;
  addEditHeadTitle:any;
  createAddEditBtnName='';
  _addEditFormData:any;

  checkUserDepartmentCodeArray:any[]=[];
  checkUserDepartmentCode:any[]=[]
  UserDepartmentCodeExistError:boolean=false

  constructor(private toastr: ToastrService,private fb: FormBuilder,private router: Router, private userDepartmentService: UserDepartmentService,private routes:ActivatedRoute,
    public dialogRef: MatDialogRef<AddEditUserDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    this.addEditForm = this.fb.group({
      departmentCode: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
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
      this.addEditForm.get('departmentCode')?.disable()
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

    this.userDepartmentService.getUserDepartmentList().subscribe(res => {
      this.checkUserDepartmentCodeArray=res.data;
    });

    setTimeout(() => {
      for(let i=0;i<this.checkUserDepartmentCodeArray?.length;i++){
        this.checkUserDepartmentCode.push(this.checkUserDepartmentCodeArray[i]?.departmentCode.toLowerCase())
      }
    }, 500);

  }

  getSingleData(id:any){
    this.userDepartmentService.getUserDepartmentById(id).subscribe(res => {
      this.addEditForm.patchValue(res.data)
     // this.chekcToggleYesNo(res)
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
    // this.router.navigateByUrl('home/user-department', { skipLocationChange: true });

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
      this.userDepartmentService.updateUserDepartmentById(this.data.id,this._addEditFormData).subscribe(res => {
                this.toastr.success('User Department Updated Successfully','', { timeOut: 2000 });
            // this.router.navigateByUrl('home/user-department', { skipLocationChange: true });
            this.dialogRef.close();
      });
    }
    else{
   //   this.customeTrueFalseName()
     //  this._addEditFormData.isActive='Yes'
      this.userDepartmentService.createUserDepartment(this._addEditFormData).subscribe(res => {
                this.toastr.success('User Department Created Successfully','', { timeOut: 2000 });
            // this.router.navigateByUrl('home/user-department', { skipLocationChange: true });
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
    this.addEditForm.get('departmentCode')?.patchValue(res.state.id)
    this.addEditForm.get('description')?.patchValue(res.cityCode)
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

  checkUserDepartmentCodeAlreadyExit(event:any){

    if (this.checkUserDepartmentCode.includes(this.addEditForm.get('departmentCode')?.value.toLowerCase())) {
      this.UserDepartmentCodeExistError=true
      this.addEditForm.get('departmentCode')?.setErrors({ incorrect: true });
    } else {
      this.UserDepartmentCodeExistError = false;
      this.addEditForm.get('departmentCode')?.setErrors(null);
    }
  }
}

