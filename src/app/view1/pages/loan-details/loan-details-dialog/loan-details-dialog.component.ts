import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import { LoanDetailService } from 'src/app/core1/loan-details/service/loan-detail.service';

@Component({
  selector: 'app-loan-details-dialog',
  templateUrl: './loan-details-dialog.component.html',
  styleUrls: ['./loan-details-dialog.component.css']
})
export class LoanDetailsDialogComponent implements OnInit{
  serviceReqId: any;
  constructor(public dialogRef: MatDialogRef<LoanDetailsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.serviceReqId=this.data
    console.log(this.serviceReqId);
  }

  close() {
    this.dialogRef.close();
  }
}
