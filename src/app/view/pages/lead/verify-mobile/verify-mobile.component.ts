import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription, timer } from 'rxjs';
import { LeadService } from 'src/app/core/lead/service/lead.service';
import { WorkListService } from 'src/app/core/work-list/service/work-list.service';

@Component({
  selector: 'app-verify-mobile',
  templateUrl: './verify-mobile.component.html',
  styleUrls: ['./verify-mobile.component.css']
})
export class VerifyMobileComponent implements OnInit {

  addEditForm!: FormGroup;
  ReSentOtpTimmer: boolean = false;
  ReSentOtpTimmerBoleean: boolean = false;
  countDown!: Subscription;
  counter = 60;
  tick = 1000

  getMobileNoFromResBtnDisable: boolean = false;
  mobileVerifyText = 'Verify'
  mobileVerifyBtn: boolean = false;

  constructor(private fb: FormBuilder,private leadService: LeadService,  private toastr: ToastrService,private workListService: WorkListService,public dialogRef: MatDialogRef<VerifyMobileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      dialogRef.disableClose = true;
    }

  ngOnInit(): void {
    this.addEditForm = this.fb.group({
      id: [''],
      mobileNoVarification: ['', Validators.compose([Validators.required])],

    })
    this.sendOtpToMobilefn();
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

  reSentOTP() {
    this.ReSentOtpTimmer = true;
    this.countDown = timer(0, this.tick)
      .subscribe((res) => {
        // console.log(res);
        if (res < 60) {
          this.ReSentOtpTimmerBoleean = true
          --this.counter
        } else {
          this.ReSentOtpTimmer = false;
          this.ReSentOtpTimmerBoleean = false
          this.counter = 60;
          this.tick = 1000
          this.countDown?.unsubscribe();

        }

      })
    // this.workListService.mobileNoVarification(this.data.id, this.getMobileNoFromRes).subscribe(res => {
    //   this.toastr.success(res.message, '', { timeOut: 2000 });
    //   const textmassage = 'Enter OTP ' + res.data + ' to login into KFSL portal which is for one time use only and within 5 minutes from the time of the request. NEVER SHARE THE OTP WITH ANYONE';
    //   // this.workListService.mobileNoSentOTPVarification(textmassage, this.getMobileNoFromRes).subscribe(res => {
    //   // });

    //   $.post(`https://push3.aclgateway.com/servlet/com.aclwireless.pushconnectivity.listeners.TextListener?userId=karvyalt&pass=karvyalt2&appid=karvyalt&subappid=karvyalt&contenttype=1&to=` + this.getMobileNoFromRes + `&from=KARVYF&text=` + textmassage + `&selfid=true&alert=1&dlrreq=true&intflag=false`, function () {
    //   });
    // });
      this.sendOtpToMobilefn();

  }

  sendOtpToMobilefn(){
    setTimeout(() => {
      this.leadService.sendOtpToMobile(this.data.mobileNo).subscribe((res: any) => {
        // console.log(res);
      });
    }, 200);
  }
    //varification
    mobileVerify() {
      // this.dialogRef.close('Success');
      if (this.addEditForm.get('mobileNoVarification')?.invalid) {
        this.addEditForm.get('mobileNoVarification')?.markAsTouched()
        return;
      }
      this.leadService.mobileNoOTPVarification(this.data.mobileNo, this.addEditForm.get('mobileNoVarification')?.value).subscribe(res => {
        if (res.msgKey == 'Success') {
          this.mobileVerifyBtn = true;
          this.mobileVerifyText = 'Verified';
          this.getMobileNoFromResBtnDisable = true
          this.addEditForm.get('mobileNoVarification')?.disable()
          this.toastr.success(res.message, '', { timeOut: 2000 });
          this.dialogRef.close('Success');
        } else {
          this.toastr.error(res.message, '', { timeOut: 2000 });
          // this.addEditForm.get('mobileNoVarification')?.setValidators([Validators.required])
          // this.addEditForm.get('mobileNoVarification')?.updateValueAndValidity
          this.addEditForm.get('mobileNoVarification')?.setErrors({ 'incorrect': true });
        }
      });
    }

    cancelVerificationForm(){
      this.dialogRef.close('Fail');
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

    omitCharacters(event: any) {
      const pattern = /[0-9\+\-\ ]/;

      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
}
