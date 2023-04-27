import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkListService } from 'src/app/core/work-list/service/work-list.service';

@Component({
  selector: 'app-view-uploaded-files',
  templateUrl: './view-uploaded-files.component.html',
  styleUrls: ['./view-uploaded-files.component.css']
})
export class ViewUploadedFilesComponent implements OnInit {

  filesArray:any=[];
  constructor(private workListService: WorkListService,  public dialogRef: MatDialogRef<ViewUploadedFilesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {

  }

  ngOnInit(): void {
    this.workListService.viewUploadFile(this.data.id).subscribe(res => {
      this.filesArray=res.data
    });
  }
  cancelAddEditForm() {
    this.dialogRef.close();
  }
}
