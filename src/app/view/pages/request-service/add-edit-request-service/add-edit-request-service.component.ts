import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReasonMasterService } from '../../../../core/reason-master/service/reason-master.service';
import { map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { RequestServiceService } from 'src/app/core/request-service/service/request-service.service';
import { LoanDetailsElement } from 'src/app/core/request-service/model/service-request';
import { MatTableDataSource } from '@angular/material/table';
import { NgxHttpLoaderService } from 'ngx-http-loader';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-add-edit-request-service',
  templateUrl: './add-edit-request-service.component.html',
  styleUrls: ['./add-edit-request-service.component.css']
})
export class AddEditRequestServiceComponent implements OnInit {

  @ViewChild('imgFileInput', { static: false })

  imgFileInput!: ElementRef;

  queryParamData: any;
  createBtn: boolean = true;
  addEditHeadTitle: any;
  createAddEditBtnName = '';
  onSelectOption!: string;
  selectedFile!: File;

  datas: any = [];
  dataDetails: any;

  show: boolean = false;
  loanDetailsForm!: FormGroup;
  transcatForm!: FormGroup;
  serviceRequestForm!: FormGroup;
  topUpForm!: FormGroup;
  queryForm!: FormGroup;
  requestForm!: FormGroup;
  complaintForm!: FormGroup;
  myRequestForm!: FormGroup;
  _addEditFormData: any;
  myRequestData: any;
  fileName: any = [];
  imgUploadFilename: any;
  imgUpoloadFilecode: any;
  imgUpoladFiletype: any;
  imagUploadArray: any = [];
  urls: any = [];
  percent: any = 0
  showProgressBar: boolean = false;
  ifVerifyHideImgDesable: boolean = true;
  spliteRoleName:any;
  makeaRoleArray:any;
  CSM:boolean=false;
  selectedLoanAccount: any;
  serviceRequest: any;
  branchTypeName: any = [];
  loanTypeName: any = []
  filterBranchTypeName: any = this.branchTypeName;
  searchBranchTypeTextboxControl = new FormControl();

  queryNames: any;
  isDisabled: boolean = false;
  showCard: Boolean = false;

  queryList: any = [];
  paidPopUp: any = [];
  paidMsg:string = 'Paid Service';

  requestList: any = []

  showRequest: boolean = false
  checkBoxValue: boolean = false;
  hima: any;
  payAmounts:any = 0;

  selectQueryArray: any = []
  queryListArray: any;
  @ViewChild('textAreaRef') textAreaRef!: ElementRef;
  myFiles: any[] = [];
  displayFileCount: any = 'Select File';
  serviceRequestid: any;
  serviceId: any;
  newData: any;

  ELEMENT_DATAS!: LoanDetailsElement[];

  loanAccount: any;
  searchLoanTypeTextboxControl = new FormControl();
  filterLoanTypeName: any = this.loanTypeName;
  descListArray: any;
  showTopUp: boolean = false;
  rbiQuery: boolean = false;
  gridsize: any;
  topUpStatus:string = 'open';
  someDateVar: any;
  loanMasterIdValue: any = [];
  reqNames: any;

  dataSource = new MatTableDataSource<LoanDetailsElement>(this.ELEMENT_DATAS);

  constructor(private toastr: ToastrService, private fb: FormBuilder, private router: Router, private reasonMasterService: ReasonMasterService, private routes: ActivatedRoute, private service: RequestServiceService,private ngxhttploader: NgxHttpLoaderService,
    public dialogRef: MatDialogRef<AddEditRequestServiceComponent>,public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,public datepipe: DatePipe,
  ) {
    this.serviceRequestForm = this.fb.group({
      id: [''],
      loanMasterId: ['', Validators.required],
      requestType: ['', Validators.compose([Validators.required])],
      rbiQueries: [''],
      requestItemId: [''],
      selectFileUpload: [''],
      file_upload: [''],
      textArea: ['', []],
      topUpAmount: [''],
      CustomerName:['']
      // zip_codes: this.fb.array([])
    })

    this.queryForm = this.fb.group({
     
    })

  }

  // ngOnInit(): void {

  //   this.routes.queryParams.subscribe(res=>this.queryParamData=res);
  //   if(this.data.type=='edit')
  //   {
  //     this.saveBtn=true;
  //     this.createBtn=true;
  //     this.addEditHeadTitle='Edit'
  //     this.createAddEditBtnName='Submit'

  //     this.serviceRequestForm.get('regionCode')?.disable()
  //   }else if(this.data.type=='view'){
  //     this.addEditHeadTitle='View'
  //     this.saveBtn=false;
  //     this.createBtn=false;
  // this.getSingleData(this.data.id);
  //     this.serviceRequestForm.disable();
  //   }
  //   else{
  //     this.addEditHeadTitle='Add'
  //     this.createAddEditBtnName='Create'
  //   }

  // }

  ngOnInit(): void {
    // this.loanData();
    // this.serviceForm();
    this.getServiceRequestList();
    this.myRequest();
    // this.getLoanDetail()
    // this.getSingleData(this.data.id)

    this.spliteRoleName=sessionStorage.getItem('role');
    let myDate = new Date(); 
    this.someDateVar = this.datepipe.transform(myDate, 'yyyy-MM-dd');
    console.log(this.someDateVar);


  }
  
  serviceForm() {

  }

  // editViewAction(id: any) {
  //   this.showRequest = true
  //   this.service.getReasonMasterById(id).subscribe((res => {
  //     console.log('res', res.data);
  //     this.serviceRequest = res.data

  //   }))

  // }

  // chekcToggleYesNo(res: any) {

  //   this.serviceRequestForm.get('id')?.patchValue(res.id)
  //   this.serviceRequestForm.get('loanMasterId')?.patchValue(res.loanMasterId)
  //   this.serviceRequestForm.get('requestType')?.patchValue(res.requestType)
  //   this.serviceRequestForm.get('rbiQueries')?.patchValue(res.rbiQueries)
  //   this.serviceRequestForm.get('requestItemId')?.patchValue(res.requestItemId)
  //   this.serviceRequestForm.get('selectFileUpload')?.patchValue(res.selectFileUpload)
  //   this.serviceRequestForm.get('file_upload')?.patchValue(res.file_upload)

  // }

//   getSingleData(id: any) {
//     if(sessionStorage.getItem('role') === 'CSM'){
//     this.service.getReasonMasterById(id).subscribe(res => {
//       console.log('vvv', res);
//       this.serviceRequestForm.get('id')?.patchValue(res.data.serviceRequestId)
//       this.serviceRequestForm.get('loanMasterId')?.patchValue(res.data.loanMaster.loanMasterId)
//       this.serviceRequestForm.get('requestType')?.patchValue(res.data.serviceRequestId)
//       this.serviceRequestForm.get('rbiQueries')?.patchValue(res.data.rbiQueries)
//       this.serviceRequestForm.get('requestItemId')?.patchValue(res.data.requestType)
//       this.serviceRequestForm.get('selectFileUpload')?.patchValue(res.data.selectFileUpload)
//       this.serviceRequestForm.get('file_upload')?.patchValue(res.data.file_upload)
//     });
//   }
// }


  getLoanDetail() {
    this.service.getLoanDetails().pipe(map((res) => {
      // this.datas = res.data
      this.dataDetails = res.data
    })).subscribe();
  }

  // loanData() {
  //   this.service.getLoanDetails().pipe(map((res) => {
  //     this.loanAccount = res.data
  //     console.log(this.loanAccount)

  //   })).subscribe();
  // }


  cancelAddEditForm() {
    //this.router.navigateByUrl('home/reason-master', { skipLocationChange: true });
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]
  }

  openFile() {
    this.imgFileInput.nativeElement.click()
  }

  somethingChanged(enent: any) {
    this.queryList = []
    this.paidPopUp = []

    console.log(enent);
    this.service.getAllRequestTypeByRequestItem(enent,this.loanMasterIdValue[0].loanMaster.loanAcctNo).pipe(map((res=>{
      this.newData = res.data;
      console.log('newData:', this.newData);
    }))).subscribe();
    let queryListArray = this.branchTypeName.find((res: { itemId: any; }) => res.itemId == enent)

    for (let i = 0; i < queryListArray.requestTypes.length; i++) {
      this.queryList.push(queryListArray.requestTypes[i])
    }



    console.log(this.queryList);
     this.descListArray = this.branchTypeName.find((res: { itemId: any; }) => res.itemId == enent)
    // descListArray.forEach((item: { isPaidPopup: any; }) => {
    //   console.log(item.isPaidPopup);
    // });
    for (let i = 0; i < this.descListArray.requestTypes.length; i++) {
      this.paidPopUp.push(this.descListArray.requestTypes[i].isPaidPopup)
      
    }

    console.log(this.paidPopUp);
    
    console.log('vai:',this.descListArray.requestTypes)
    // this.paidPopUp = descListArray.isPaidPopup;
    // console.log(this.paidPopUp);
    if(this.descListArray.description == 'Others'){
      this.isDisabled = true;
      this.serviceRequestForm.controls['textArea'].setValidators(Validators.required);
      this.showCard = false;
      this.showTopUp = false;
      this.rbiQuery = true;
      if (this.queryList[0].requestTypeId) {
        this.checkBoxValue = true;
        this.hima = this.queryList[0].requestTypeId;
        
      }
 
    }
    else if(this.descListArray.description == 'Query'){
      this.isDisabled = false;
      this.serviceRequestForm.controls['textArea'].updateValueAndValidity();
      this.serviceRequestForm.controls['textArea'].clearValidators();
      this.showCard = true;
      this.checkBoxValue = false;
      this.showTopUp = false;
      this.rbiQuery = true;
    }
    else if(this.descListArray.description == 'Complain'){
      this.isDisabled = false;
      this.serviceRequestForm.controls['textArea'].updateValueAndValidity();
      this.serviceRequestForm.controls['textArea'].clearValidators();
      this.showCard = true;
      this.checkBoxValue = false;
      this.showTopUp = false;
      this.rbiQuery = true;
    }
    else if(this.descListArray.description == 'Request'){
      // if(this.desListArray)
      this.isDisabled = false;
      this.serviceRequestForm.controls['textArea'].updateValueAndValidity();
      this.serviceRequestForm.controls['textArea'].clearValidators();
      this.showCard = true;
      this.checkBoxValue = false;
      this.showTopUp = false;
      this.rbiQuery = true;
    }
     else if (this.descListArray.description == 'Top-Up') {
      this.isDisabled = false;
      this.serviceRequestForm.controls['textArea'].updateValueAndValidity();
      this.serviceRequestForm.controls['textArea'].clearValidators();
      this.showCard = false;
      this.rbiQuery = false;
      if (this.queryList[0].requestTypeId) {
        this.checkBoxValue = true;
        this.hima = this.queryList[0].requestTypeId;
      }
      this.showTopUp = true;

    }
    this.serviceRequestForm.controls['textArea'].updateValueAndValidity();

  }


  changeSomething(event: any) {
    this.loanMasterIdValue
    console.log('new',event);
    this.loanMasterIdValue =  this.loanAccount.filter((res: { loanMaster: { loanMasterId: any; }; }) => {
   return  res.loanMaster.loanMasterId == event
    }) ;
    this.serviceRequestForm.get('CustomerName')?.patchValue(this.loanMasterIdValue[0].loanMaster.customerName)
    console.log(this.loanMasterIdValue[0].loanMaster.customerName);
  }


  myRequest() {
    setTimeout(() => {
      this.service.getAllServiceRequest().subscribe(res => {
        
        this.loanAccount = res.data
        this.filterLoanTypeName=this.loanAccount;
        // console.log(this.loanAccount);

        this.dataSource.data = res.data as LoanDetailsElement[]
        let queryListArray = this.dataSource.data
        console.log(queryListArray);
        this.requestList = []
        let requestListArray = queryListArray
        console.log(requestListArray);
      });



    }, 500);


  }

  getRequestDetails() {
    this.showRequest = false
  }

  showOptions(event: MatCheckboxChange) {
    this.show = event.checked
    // console.log(this.show);
  }

  getServiceRequestList() {
    this.service.getReasonMasterList().pipe(map(res => {
      this.branchTypeName = res.data;
      this.filterBranchTypeName = this.branchTypeName;
      console.log('data', this.filterBranchTypeName);
    })).subscribe();
  }

  clearSearch(event: any, type: any) {
    if (type == 'requestType') {
      event.stopPropagation();
      this.searchBranchTypeTextboxControl.patchValue('');
      this.filterBranchTypeName = this.branchTypeName;
    }
  }

  searchDropdown(searchText: any, type: any) {
    console.log(searchText, type);
    
    if (type == 'requestType') {
      if (searchText != '') {
        this.filterBranchTypeName = this.branchTypeName.filter((Option: { description: string; }) => {
          
          return Option.description?.toLocaleLowerCase().includes(searchText?.toLowerCase())
        })
      } else {
        this.filterBranchTypeName = this.branchTypeName
        console.log(this.filterBranchTypeName);
        
      }
    }
  }

  clearLoanSearch(event: any, type: any) {
    if (type == 'loanMasterId') {
      event.stopPropagation();
      this.searchLoanTypeTextboxControl.patchValue('');
      this.filterLoanTypeName = this.loanAccount;
    }
  }

  searchLoanDropdown(searchText: any, type: any) {
    console.log(searchText, type);
    
    if (type == 'loanMasterId') {
      if (searchText != '') {
        this.filterLoanTypeName = this.loanAccount.filter((Option: any) => {
          
          return Option.loanMaster.loanAcctNo?.toLocaleLowerCase().includes(searchText?.toLowerCase()) || Option.loanMaster.customerName?.toLocaleLowerCase().includes(searchText?.toLowerCase())
        })
      } else {
        this.filterLoanTypeName = this.loanAccount
        console.log(this.loanAccount);
        
      }
    }
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.serviceRequestForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }



  createAddEditForm() {
    if (this.serviceRequestForm.invalid) {
      this.serviceRequestForm.markAllAsTouched()
      return;
    }
    let _msg = 'Your Service Request has be Submitted Successfully'
    if (this.show) {
      if (this.textAreaRef.nativeElement.validity.valid) {
        console.log('textarea is valid');
      } else {
        console.log('text area is invalid')
      }
    }
    if (this.checkBoxValue) {
      this.selectQueryArray.push(this.hima)
    }
    let filterBranchTypeNameValue = this.filterBranchTypeName.find((res: { itemId: any; }) => res.itemId == this.serviceRequestForm.get('requestType')?.value)
    console.log(filterBranchTypeNameValue.description);
    if(this.descListArray.description == 'Query' || this.descListArray.description == 'Request' || this.descListArray.description == 'Complain' || this.descListArray.description == 'Top-Up'){
    this._addEditFormData = this.serviceRequestForm.value
    this._addEditFormData.requestTypeId = this.selectQueryArray
    this._addEditFormData.requestType = filterBranchTypeNameValue.description
    // this._addEditFormData.remark = this.serviceRequestForm.controls['textArea'].value
    this._addEditFormData.topUpAmount =  this.gridsize
    console.log(this._addEditFormData);
    
    this.service.createReasonMaster(this._addEditFormData,this.loanMasterIdValue[0].loanMaster.loanAcctNo,this.loanMasterIdValue[0].loanMaster.customerName,this.loanMasterIdValue[0].loanMaster.pancard,this.gridsize,this.loanMasterIdValue[0].loanMaster.mobileNumber, this.topUpStatus,this.someDateVar,this.reqNames,this.payAmounts).subscribe(res => {
      console.log(res);

      if (this.myFiles.length != 0) {
        this.service.fileUpload(res.data, this.myFiles).subscribe(res => {
        });
      }
    });
  
  }

  if(this.descListArray.description == 'Others'){
    this._addEditFormData = this.serviceRequestForm.value;
    this._addEditFormData.requestTypeId = this.selectQueryArray;
    this._addEditFormData.requestType = filterBranchTypeNameValue.description;
    this._addEditFormData.remark = this.serviceRequestForm.controls['textArea'].value;
    this._addEditFormData.topUpAmount =  this.gridsize
    console.log(this._addEditFormData);
    
      this.service.createReasonMaster(this._addEditFormData,this.loanMasterIdValue[0].loanMaster.loanAcctNo,this.loanMasterIdValue[0].loanMaster.customerName,this.loanMasterIdValue[0].loanMaster.pancard,this.gridsize,this.loanMasterIdValue[0].loanMaster.mobileNumber, this.topUpStatus,this.someDateVar,this.reqNames,this.payAmounts).subscribe((res) => {
        this.serviceId = res;
        console.log('yyy', this.serviceId); 
        if (this.myFiles.length != 0) {
          this.service.fileUpload(res.data, this.myFiles).subscribe((res) => {console.log(res);
          });
        }
      });
    
    }
  // if (this.descListArray.description == 'Top-Up'){
  //   this.service.createReasonMaster(this._addEditFormData).subscribe((res) => {
  //     this.serviceId = res;
  //     console.log('yyy', this.serviceId);

  //     if (this.myFiles.length != 0) {
  //       this.service.fileUpload(res.data, this.myFiles).subscribe((res) => {});
  //     }
  //   });
  //   setTimeout(() => {
      
  //     this.service.createTopUps(this.datas[0].loanAcctNo,this.datas[0].customerName,this.datas[0].pancard,this.gridsize,this.datas[0].mobileNumber, this.topUpStatus,this.someDateVar).subscribe(res=>{
  //       console.log('topup',res);
  //       if(res.msgKey == 'Success'){
  //       this.toastr.success(res.message)
  //   }})
  //   }, 500);

  // }

    this.service.getAllServiceRequest().subscribe(res => {
      console.log(res.data);
      this.serviceRequestid = res.data

    })

    this.toastr.success(_msg)

      this.ngxhttploader.show();
      setTimeout(() => {
        this.ngxhttploader.hide();
        this.serviceRequestForm.reset();
        this.selectQueryArray = [];
        // this.serviceRequestForm.controls['loanMasterId'].updateValueAndValidity();
        // this.serviceRequestForm.controls['requestType'].updateValueAndValidity();
        this.showCard = false;
        this.isDisabled = false;
      }, 1000);
  }

  // selectLoanAmount(loanId: any) {
  //   console.log(this.datas);
  //   let loanData: any = []
  //   this.datas = []

  //   for (let i = 0; i < this.dataDetails.length; i++) {
  //     if (this.dataDetails[i].id == loanId) {
  //       this.datas.push(this.dataDetails[i])
  //     }

  //   }

  //   console.log(loanId, loanData, this.datas);

  // }

  clickQuryFormSelect(type: any, id: any, index: any, data: any) {
    console.log(type);
    console.log(data);
    this.reqNames = data;
    // if (type.checked === false) {
    //   this.isDisabled = true
    // }
    if (this.checkBoxValue) {
      type.checked = true;
    }

    // console.log(type.target.checked,id);
    if (type.checked === true) {
      // this.isDisabled = false
      this.selectQueryArray.push(id)
    } else {
      if (this.selectQueryArray.includes(id)) {
        let indexValue = this.selectQueryArray.indexOf(id)
        console.log(indexValue);

        this.selectQueryArray.splice(indexValue, 1)
      }

    }

    console.log(this.selectQueryArray);


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

  validationUpdate(event: any) {
    if (event.checked == true) {
      this.serviceRequestForm.controls['textArea'].setValidators(Validators.required);

    } else if (event.checked == false) {
      this.serviceRequestForm.controls['textArea'].updateValueAndValidity();
      this.serviceRequestForm.controls['textArea'].clearValidators();
    }

    this.serviceRequestForm.controls['textArea'].updateValueAndValidity();
  }

  updateSetting(event:any) {
    this.gridsize = event.value;
  }

  formatLabel(value: number): string {
    if (value >= 10000) {
      return Math.round(value / 10000) + 'k';
    }

    return `${value}`;
  }


}
























