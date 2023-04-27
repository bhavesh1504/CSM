import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { UserService } from 'src/app/core/user/service/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  addEditForm!: FormGroup;
  userDetails:any;
  userDetailAtoBValue:any='';
  roleArray:any=[];
    salutationArray= [
    {value: '1', viewValue: 'Mr.'},
    {value: '2', viewValue: 'Mrs.'},
    {value: '3', viewValue: 'Ms.'},
    {value: '4', viewValue: 'Miss'},
    {value: '5', viewValue: 'Sir'}
  ];
  constructor(private toastr: ToastrService,private userService:UserService,private fb: FormBuilder,private router: Router,private authService:AuthService) { }

  ngOnInit(): void {
    this.addEditForm = this.fb.group({
      id:[''],
      // FullName: ['', Validators.compose([Validators.required])],
      salutation: [''],
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      About: [''],
      email: ['', Validators.compose([Validators.required,Validators.email])],
      mobileNo: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(/^-?(0|[1-9]\d*)?$/),])],
    })
    if (this.authService.isLoggedIn()) {
      this.userDetails=sessionStorage.getItem('UserDetails')
      this.userDetailAtoBValue=JSON.parse(atob(this.userDetails));
      for(let i=0;i<this.userDetailAtoBValue.role.length;i++)
      {

        this.roleArray.push(this.userDetailAtoBValue.role[i].roleName)
      }

    //   const fullName=this.userDetailAtoBValue.salutation+" "+this.userDetailAtoBValue.firstName+" "+this.userDetailAtoBValue.lastName
    // this.addEditForm.get('FullName')?.patchValue(fullName)
    this.addEditForm.get('id')?.patchValue(this.userDetailAtoBValue.id)
    this.addEditForm.get('salutation')?.patchValue(this.userDetailAtoBValue.salutation)
    this.addEditForm.get('firstName')?.patchValue(this.userDetailAtoBValue.firstName)
    this.addEditForm.get('lastName')?.patchValue(this.userDetailAtoBValue.lastName)

    this.addEditForm.get('About')?.patchValue("")
    this.addEditForm.get('email')?.patchValue(this.userDetailAtoBValue.email)
    this.addEditForm.get('mobileNo')?.patchValue(this.userDetailAtoBValue.mobileNo)
    }
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
      || k == 32       //accept forward slash for DL Root123
    );
  }

  changeProfile()
  {
    if (this.addEditForm.invalid) {
      this.addEditForm.markAllAsTouched()
      return;
    }
    const _addEditFormData = this.addEditForm.value;
    this.userService.updateUserProfileById(this.userDetailAtoBValue.id,_addEditFormData).subscribe(res => {

      if(res.msgKey=="Success")
      {
        const msg = res.message;
        this.toastr.success(msg,'', { timeOut: 2000 });
        this.router.navigateByUrl('home/user-profile', { skipLocationChange: true });
      }else{
        const msg = res.message
        this.toastr.error(msg,'', { timeOut: 2000 });
      }

    });
  }

}
