import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../../../../core/role/service/role.service';

@Component({
  selector: 'app-add-edit-role',
  templateUrl: './add-edit-role.component.html',
  styleUrls: ['./add-edit-role.component.css']
})
export class AddEditRoleComponent implements OnInit {

  addEditForm: FormGroup
  queryParamData:any;
  saveBtn:boolean=true;
  createBtn:boolean=true;
  addEditHeadTitle:any;
  createAddEditBtnName='';

  checkRoleCodeArray:any[]=[];
  checkRoleCode:any[]=[]
  RoleCodeExistError:boolean=false

  constructor(private toastr: ToastrService,private fb: FormBuilder,private router: Router, private roleService: RoleService,private routes:ActivatedRoute,
    public dialogRef: MatDialogRef<AddEditRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    this.addEditForm = this.fb.group({
      id: [''],
      roleCode: ['', Validators.compose([Validators.required])],
      roleName: ['', Validators.compose([Validators.required])],
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
      this.addEditForm.get('roleCode')?.disable()
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

    this.roleService.getRoleList().subscribe(res => {
      this.checkRoleCodeArray=res;
    });

    setTimeout(() => {
      for(let i=0;i<this.checkRoleCodeArray?.length;i++){
        this.checkRoleCode.push(this.checkRoleCodeArray[i]?.roleCode.toLowerCase())
      }
    }, 500);
  }

  getSingleData(id:any){
    this.roleService.getRoleById(id).subscribe(res => {
      this.addEditForm.patchValue(res)
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
    // this.router.navigateByUrl('home/role', { skipLocationChange: true });
    this.dialogRef.close();
  }
  saveAddEditForm(){

  }
  createAddEditForm(){
    if (this.addEditForm.invalid) {
      this.addEditForm.markAllAsTouched()
      return;
    }
    const _addEditFormData = this.addEditForm.value;

    if(this.data.type=='edit'){
      this.roleService.updateRoleById(this.data.id,_addEditFormData).subscribe(res => {
                this.toastr.success('Role Updated Successfully','', { timeOut: 2000 });
            // this.router.navigateByUrl('home/role', { skipLocationChange: true });
            this.dialogRef.close();
      });
    }
    else{
      this.roleService.createRole(_addEditFormData).subscribe(res => {
                this.toastr.success('Role Created Successfully','', { timeOut: 2000 });
            // this.router.navigateByUrl('home/role', { skipLocationChange: true });
            this.dialogRef.close();
      });
    }
  }

  checkRoleCodeAlreadyExit(event:any){

    if (this.checkRoleCode.includes(this.addEditForm.get('roleCode')?.value.toLowerCase())) {
      this.RoleCodeExistError=true
      this.addEditForm.get('roleCode')?.setErrors({ incorrect: true });
    } else {
      this.RoleCodeExistError = false;
      this.addEditForm.get('roleCode')?.setErrors(null);
    }
  }
}
