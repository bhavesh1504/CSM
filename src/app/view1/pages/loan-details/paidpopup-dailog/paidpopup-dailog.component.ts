import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxHttpLoaderService } from 'ngx-http-loader';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';
import { LoanDetailService } from 'src/app/core1/loan-details/service/loan-detail.service';
import {DatePipe} from '@angular/common';
import { map } from 'rxjs';
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
  razorPay: any;
  paymentStatus:string = 'failed';
  someDateVar: any;
  datass: any = [];
  dataDetails: any;
  reqNames: any;

  razorPayOptions = {
    "key": "rzp_test_ai34JM7uh5soSu",
    "amount": "100",
    "currency": "INR",
    "customer_name": "",
    "mobile": "",
    "description": "GoFin Payments",
    "orderid": "",
    "session_token": "",
    "handler": (res: any) => {
      this.razorPay = res.razorpay_payment_id;
      if(this.razorPay == res.razorpay_payment_id){
        this.paymentStatus = 'Success'; 
      }
      console.log(this.razorPay,this.dataDetails[0].loanAcctNo,this.dataDetails[0].customerName,this.dataDetails[0].dueInstallment,this.paymentStatus,this.someDateVar, this.reqNames);
      console.log(this.datas);
      this.service.createRequestPayment(this.razorPay,this.dataDetails[0].loanAcctNo,this.dataDetails[0].customerName,this.dataDetails[0].dueInstallment,this.paymentStatus,this.someDateVar,this.reqNames).subscribe(res=>{
        console.log('yyyy',res);
        this.zone.run(() =>this.dialog.open(PaymentDialogComponent, {
          width: '550px',
          autoFocus: false,
          data: {result: this.razorPay}
        }));  
      })  
      this.dialogRef.close() 
    } 
  };

  constructor(public dialogRef: MatDialogRef<PaidpopupDailogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,private ngxhttploader: NgxHttpLoaderService,private service: LoanDetailService, public dialog: MatDialog, private zone: NgZone,public datepipe: DatePipe) { } 

  ngOnInit(): void {
    this.paidPopUpForm();
    this.reqNames = this.data.reqname
    console.log(this.reqNames);
    
    this.datas = this.data.result;
    console.log(this.datas)
    let myDate = new Date(); 
    this.someDateVar = this.datepipe.transform(myDate, 'yyyy-MM-dd');
    console.log(this.someDateVar);
    this.service.getLoanDetails().pipe(map((res) => {
      this.dataDetails = res.data;
      console.log(this.dataDetails);
        })
      ).subscribe();    
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
    this.ngxhttploader.show()
    this.razorPayOptions.key
    this.razorPayOptions.session_token
    this.razorPayOptions.orderid = this.datas.id
    this.razorPayOptions.customer_name = this.datas.customerName
    this.razorPayOptions.mobile =  this.datas.mobileNumber
    this.razorPayOptions.amount

    let rzp1 = new Razorpay(this.razorPayOptions);
    rzp1.open();
    this.ngxhttploader.hide()
    console.log('opened',rzp1);
  }

  cancel() {
    this.dialogRef.close();
  }

}
