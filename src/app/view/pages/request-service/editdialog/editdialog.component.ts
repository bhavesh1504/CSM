import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { LeadStatusService } from 'src/app/core/lead-status/service/leadStatus.service';
import { LoanDetailService } from 'src/app/core1/loan-details/service/loan-detail.service';

@Component({
  selector: 'app-editdialog',
  templateUrl: './editdialog.component.html',
  styleUrls: ['./editdialog.component.css']
})
export class EditdialogComponent implements OnInit {
  showProgressBar: boolean = false;
  fileName: any = [];
  imgUploadFilename: any;
  imgUpoloadFilecode: any;
  imgUpoladFiletype: any;
  imagUploadArray: any = [];
  urls: any = [];
  percent: any = 0
  myFiles: any[] = [];
  serviceRequest:  any;
  ifVerifyHideImgDesable: boolean = true;
  displayFileCount: any = 'Select File';
  followUpForm!: FormGroup;
  statusGroup!: FormGroup;
  followValue:any;
  serviceRequests:any;
  filesArray: any = [];
  ids:any
  status: any;
  @ViewChild('imgFileInput', { static: false })

  imgFileInput!: ElementRef;
  requestStatuss: any;
  constructor(public dialogRef: MatDialogRef<EditdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private toaster: ToastrService, private service: LeadStatusService,  private services: LoanDetailService,
    private fb: FormBuilder,) {
     }

  ngOnInit(): void {
    console.log(this.data);
    this.serviceRequests = this.data.data
    this.serviceRequest = this.data.data.requestStatus
    console.log('inside data',this.serviceRequest)
    this.getStatus();
    this.viewDownload();
    this.followUpForm = this.fb.group({
      text:[''],
      selectFileUpload: [''],
      file_upload: [''],
      requestType: ['']
  });
  this.statusGroup = this.fb.group({
    requestType: ['']
});
   
  }

  cancelAddEditForm() {
    //this.router.navigateByUrl('home/reason-master', { skipLocationChange: true });
    this.dialogRef.close();
  }

  onSelectFile(event: any) {

    if (event.target.files && event.target.files[0]) {
      // this.ngxhttploader.show();
      this.showProgressBar = true
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        this.fileName.push(event.target.files[i].name);
        this.imgUploadFilename = event.target.files[i].name;
        this.imgUpoladFiletype = event.target.files[i].type;
        var reader = new FileReader();

        reader.onload = (event: any) => {
          this.urls.push({ 'data': event.target.result, "name": this.imgUploadFilename, "type": this.imgUpoladFiletype });
          this.imgUpoloadFilecode = event.target.result
          // console.log(this.urls);

        }
        reader.readAsDataURL(event.target.files[i]);

        reader.addEventListener('progress', event => {

          this.percent = Math.round((event.loaded / event.total) * 100)
          // const loadingBar = Array(10)
          //     .fill('▒')
          //     .map((item, index) => Math.round(this.percent / 10) > index ? '█' : '▒')
          //     .join('')

          //document.location.hash = `${loadingBar}(${this.percent}%)`

        })
        // reader.addEventListener('load', event => console.log(event.target.result))

      }
      // this.ngxhttploader.hide();
    }

    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(<File>event.target.files[i]);
    }
    if (this.myFiles.length == 1) {
      this.displayFileCount = this.myFiles.length + " File Selected"
    }
    else if (this.myFiles.length == 0) {
      this.displayFileCount = "Select File"
    }
    else {
      this.displayFileCount = this.myFiles.length + " Files Selected"
    }
  }
  
  openFile() {
    this.imgFileInput.nativeElement.click()
  }

  cancelRequestDetails(){
    this.dialogRef.close();
  }


  getStatus(){
    this.service.getLeadStatusList().subscribe((res => {
      this.requestStatuss = res.data
      console.log('Status',this.requestStatuss);
      
    }))
  }


  getRequestDetails() {
    let msg = 'Service Request Updated Successfully'
    this.followValue = this.followUpForm.controls['text'].value;
    if (this.followValue == '' ? null: this.followValue){
    this.services.followTopUps(this.serviceRequests.serviceRequestId,this.followValue).pipe(map(res=>{
      console.log('follow',res);
      this.toaster.success('Follow-Up Request Successfully')
      
    })).subscribe();
  }
    if (this.myFiles.length != 0) {
      this.services.fileUpload(this.data.result, this.myFiles).subscribe((res) => {
        console.log(res);
        this.toaster.success('Document Uploaded Successfully')});
    }
    this.status = this.statusGroup.controls['requestType'].value

    this.services.updateRequestStatus(this.data.result, this.status).subscribe((res => {
      console.log(res);
      this.toaster.success('Status Updated Successfully');
    }))
    
    this.dialogRef.close();                                       
    this.toaster.success(msg);
    this.followUpForm.controls['text'].reset();
  }

  viewDownload() {
    this.services.viewUploadFile(this.data.result).subscribe((res) => {
      this.filesArray = res.data;
      console.log(this.filesArray);
    });
  }




}
