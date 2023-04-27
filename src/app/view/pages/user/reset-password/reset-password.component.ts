import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmPasswordValidator } from 'src/app/core/user/confirm-password.validator';
import { UserService } from 'src/app/core/user/service/user.service';

// export interface DialogData {
//   animal: string;
//   name: string;
// }
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  addEditForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<ResetPasswordComponent>,private toastr: ToastrService,private userService:UserService,private fb: FormBuilder,private router: Router,private routes:ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.addEditForm = this.fb.group({
        id:[''],
        newPassword: ['', Validators.compose([Validators.required])],
        c_password: ['', Validators.compose([Validators.required])],
      },
      {
        validator: ConfirmPasswordValidator("newPassword", "c_password")
      })
     }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }

  changePassword()
  {
    if (this.addEditForm.invalid) {
      this.addEditForm.markAllAsTouched()
      return;
    }
    const _addEditFormData = this.addEditForm.value;
    this.userService.resetUserPasswordId(this.data.id,_addEditFormData).subscribe(res => {
      if(res.msgKey=="Success")
      {
        const msg = res.message;
        this.toastr.success(msg,'', { timeOut: 2000 });
        // this.router.navigateByUrl('home/user-profile/change-password', { skipLocationChange: true });
      }else{
        const msg = res.message
        this.toastr.error(msg,'', { timeOut: 2000 });
      }
    });
    this.dialogRef.close();
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
}
