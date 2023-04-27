import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-paidpopup-dailog',
  templateUrl: './paidpopup-dailog.component.html',
  styleUrls: ['./paidpopup-dailog.component.css']
})
export class PaidpopupDailogComponent implements OnInit {

  paidForm!: FormGroup;
  value:any;
  datas:any;

  constructor(public dialogRef: MatDialogRef<PaidpopupDailogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { } 

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
  }

  cancel() {
    this.dialogRef.close();
  }

}
