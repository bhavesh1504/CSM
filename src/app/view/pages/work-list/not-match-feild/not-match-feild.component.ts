import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-not-match-feild',
  templateUrl: './not-match-feild.component.html',
  styleUrls: ['./not-match-feild.component.css']
})
export class NotMatchFeildComponent implements OnInit {
  addEditForm!: FormGroup;
  maxDob: Date;
  isValidAge = false;

  checkArray: any[] = []
  checkLeadArray: any[] = []
  checkMobileNo: any[] = []
  panNoCheck: any[] = []

  mobileExistError: boolean = false
  mobileMax10Error: boolean = false
  panExistError: boolean = false
  panPatternError: boolean = false

  constructor(public dialogRef: MatDialogRef<NotMatchFeildComponent>, private fb: FormBuilder, private dateAdapter: DateAdapter<Date>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    const today = new Date();
    this.maxDob = new Date(
      today.getFullYear() - 18,//age more than 18
      today.getMonth(),
      today.getDate()
    );
  }

  ngOnInit(): void {
    this.addEditForm = this.fb.group({
      id: [''],
      firstName: [''],
      middleName: [''],
      lastName: [''],
      mobileNo: ['', Validators.compose([ Validators.maxLength(10), Validators.minLength(10), Validators.pattern(/^-?(0|[1-9]\d*)?$/),])],
      email: ['', Validators.compose([ Validators.email])],
      dateOfBirth: ['', Validators.compose([Validators.required])],
      pan: ['', Validators.compose([ Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')])],
      aadhar: [''],
    })
    //dob validation 18

    this.addEditForm.get('dateOfBirth')?.valueChanges.subscribe((val: any) => {
      let current = moment();
      let selected = moment(val, 'MM-YYYY');
      let age = moment.duration(current.diff(selected));
      if (age.years() < 18) {
        this.isValidAge = true;
        this.addEditForm.get('dateOfBirth')?.setErrors({ incorrect: true });
      } else {
        this.isValidAge = false;
        this.addEditForm.get('dateOfBirth')?.setErrors(null);
      }
    });

    setTimeout(() => {
      for (let i = 0; i < this.checkArray.length; i++) {

        this.checkMobileNo.push(this.checkArray[i].mobileNo)
        this.panNoCheck.push(this.checkArray[i].pan)
      }
      for (let i = 0; i < this.checkLeadArray.length; i++) {

        this.checkMobileNo.push(this.checkLeadArray[i].mobileNo)
        this.panNoCheck.push(this.checkLeadArray[i].pan)
      }
    }, 500);
  }

  cancelAddEditForm() {
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

  omitCharacters(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  // checkMobileAlreadyExit(event: any)
  // {
  //   // console.log(this.checkMobileNo,this.panNoCheck);
  // //  if(this.checkMobileNo.includes(this.addEditForm.get('mobileNo')?.value)){

  //     if(this.addEditForm.get('mobileNo')?.value.length != 10 && this.addEditForm.get('mobileNo')?.value.length <= 10){
  //       this.mobileMax10Error=true
  //       this.addEditForm.get('mobileNo')?.setErrors({ incorrect: true });
  //     }else if (this.checkMobileNo.includes(this.addEditForm.get('mobileNo')?.value)) {
  //       this.mobileExistError=true
  //       this.mobileMax10Error=false
  //       this.addEditForm.get('mobileNo')?.setErrors({ incorrect: true });
  //     } else {
  //       this.mobileExistError = false;
  //       this.addEditForm.get('mobileNo')?.setErrors(null);
  //     }
  // }

  checkPAnAlreadyExit(event: any) {

    var panVal = this.addEditForm.get('pan')?.value
    var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

    if (!regpan.test(panVal)) {
      this.panPatternError = true
      this.panExistError = false
      this.addEditForm.get('pan')?.setErrors({ incorrect: true });
    } else if (this.panNoCheck.includes(this.addEditForm.get('pan')?.value)) {
      this.panExistError = true
      this.panPatternError = false
      this.addEditForm.get('pan')?.setErrors({ incorrect: true });
    } else {
      this.panExistError = false;
      this.panPatternError = false
      this.addEditForm.get('pan')?.setErrors(null);
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


}
