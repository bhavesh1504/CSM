import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-topup-dialog',
  templateUrl: './topup-dialog.component.html',
  styleUrls: ['./topup-dialog.component.css']
})
export class TopupDialogComponent implements OnInit {

  serviceRequest: any;
  constructor(public dialogRef: MatDialogRef<TopupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.serviceRequest = this.data
    console.log('inside data',this.serviceRequest)
  }

  cancelAddEditForm() {
    //this.router.navigateByUrl('home/reason-master', { skipLocationChange: true });
    this.dialogRef.close();
  }

}
