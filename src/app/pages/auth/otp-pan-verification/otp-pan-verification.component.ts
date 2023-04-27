import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-otp-pan-verification',
  templateUrl: './otp-pan-verification.component.html',
  styleUrls: ['./otp-pan-verification.component.css']
})
export class OtpPanVerificationComponent {

  constructor(private _formBuilder: FormBuilder){}

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

}
