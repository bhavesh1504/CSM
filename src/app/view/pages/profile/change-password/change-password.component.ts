import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmPasswordValidator } from 'src/app/core/user/confirm-password.validator';
import { UserService } from 'src/app/core/user/service/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  addEditForm: FormGroup;
  userDetailAtoBValue:any='';
  userDetails:any;
  constructor(private toastr: ToastrService,private userService:UserService,private fb: FormBuilder,private router: Router,private routes:ActivatedRoute) {
    this.addEditForm = this.fb.group({
      id:[''],
      currentPassword: ['', Validators.compose([Validators.required])],
      newPassword: ['', Validators.compose([Validators.required])],
      c_password: ['', Validators.compose([Validators.required])],
    },
    {
      validator: ConfirmPasswordValidator("newPassword", "c_password")
    })
  }

  ngOnInit(): void {
    this.userDetails=sessionStorage.getItem('UserDetails')
    this.userDetailAtoBValue=JSON.parse(atob(this.userDetails));
    this.addEditForm.get('id')?.patchValue(this.userDetailAtoBValue.id)
  }

  changePassword()
  {
    if (this.addEditForm.invalid) {
      this.addEditForm.markAllAsTouched()
      return;
    }
    const _addEditFormData = this.addEditForm.value;
    this.userService.updateUserPasswordById(this.userDetailAtoBValue.id,_addEditFormData).subscribe(res => {
      // console.log(res);

      if(res.msgKey=="Success")
      {
        const msg = res.message;
        this.toastr.success(msg,'', { timeOut: 2000 });
        this.router.navigateByUrl('home/user-profile/change-password', { skipLocationChange: true });
      }else{
        const msg = res.message
        this.toastr.error(msg,'', { timeOut: 2000 });
      }
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
}
