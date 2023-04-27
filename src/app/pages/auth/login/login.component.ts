import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { LoginServiceService } from 'src/app/core/auth/login/service/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  firstFormGroup!:FormGroup;
  secondFormGroup!:FormGroup
  isLinear = true;

  constructor(private _formBuilder: FormBuilder, private service: LoginServiceService, private toaster: ToastrService, private router: Router){}


  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.firstFormGroup = this._formBuilder.group({
      mobile: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|^[0-9]{10}$')])],
    });
    this.secondFormGroup = this._formBuilder.group({
      otp: ['', Validators.required],
      pancard: ['', Validators.required],
    });
  }

  addMobile(stepper?:MatStepper) {
    let _successMessage = 'OTP Send Successfully';
    let _errorMessage = 'User Not Exist';
    this.service.addMobileNo(this.firstFormGroup.get('mobile')?.value).pipe(map(res => {
        if(res.msgKey == 'Success') {
          this.toaster.success(_successMessage)
          // this.isLinear = false;
          stepper?.next();
          localStorage.setItem('mobile',this.firstFormGroup.get('mobile')?.value)
        }else if (res.msgKey == 'Failure') {
          this.toaster.error(_errorMessage)
          // this.isLinear = ;
          stepper?.previous();
        }
    })).subscribe();
       
  }



  addOtpPan() {

    // this.service.addOtpPan(this.firstFormGroup.get('mobile')?.value,this.secondFormGroup.get('otp')?.value,this.secondFormGroup.get('pancard')?.value).subscribe(res => {
      let accessToken = 'Basic ' + btoa(this.firstFormGroup.get('mobile')?.value + ':' + this.secondFormGroup.get('pancard')?.value);

      // sessionStorage.setItem('id', user.data.id);
      sessionStorage.setItem('token', JSON.stringify(accessToken));

      this.router.navigateByUrl('loandetails');
      // console.log('yyy',res)
    // })

  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.firstFormGroup.controls[controlName];
    if (!control) {
      return false;
    }
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  // selectionChange(event: StepperSelectionEvent) {
  //   console.log(event.selectedStep.label);
  //   let stepLabel = event.selectedStep.label;
  //   if (stepLabel == "Enter OTP And Pan") {
  //     // console.log("CLICKED STEP 2");
  //     // stepLabel == 'Enter Mobile No.';
  //     this.isLinear == true
  //   }
  // }
}
