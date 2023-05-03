import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxHttpLoaderService } from 'ngx-http-loader';
declare var Razorpay: any;

@Component({
  selector: 'app-paidpopup-dailog',
  templateUrl: './paidpopup-dailog.component.html',
  styleUrls: ['./paidpopup-dailog.component.css']
})
export class PaidpopupDailogComponent implements OnInit {

  paidForm!: FormGroup;
  value:any;
  datas:any;

  razorPayOptions = {
    "key": "rzp_test_ai34JM7uh5soSu",
    "amount": "100",
    "currency": "INR",
    "name": "",
    "mobile": "",
    "description": "GoFin Payments",
    "orderid": "",
    "handler": (res: any) => {
      console.log(res);
      
    }
  };

  constructor(public dialogRef: MatDialogRef<PaidpopupDailogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,private ngxhttploader: NgxHttpLoaderService) { } 

  ngOnInit(): void {
    this.paidPopUpForm();
    this.datas = this.data.result;
    console.log(this.datas)
  }

  paidPopUpForm() {
    this.paidForm = this.fb.group({
     agreed: ['',Validators.required]
    });
  }

  changeMe(event:any){

    this.value = event.checked
    console.log('me',this.value); 
}

  submit() {
      this.dialogRef.close();
      this.ngxhttploader.show()
      this.razorPayOptions.key
      this.razorPayOptions.orderid = this.datas.id
      this.razorPayOptions.name = this.datas.customerName
      this.razorPayOptions.mobile =  this.datas.mobileNumber
      this.razorPayOptions.amount

      let rzp1 = new Razorpay(this.razorPayOptions);
      rzp1.open();
      this.ngxhttploader.hide()
      console.log('opened');
  }

  cancel() {
    this.dialogRef.close();
  }

}
