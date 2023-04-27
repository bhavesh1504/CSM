import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-viewdialog',
  templateUrl: './viewdialog.component.html',
  styleUrls: ['./viewdialog.component.css']
})
export class ViewdialogComponent implements OnInit {
  serviceRequest: any;
  constructor(public dialogRef: MatDialogRef<ViewdialogComponent>,
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
