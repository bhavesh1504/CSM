import {
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  NgZone
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map } from 'rxjs';
import { LoanDetailService } from '../../../core1/loan-details/service/loan-detail.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { LoanDetailsElement } from '../../../core1/loan-details/models/loan-details';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { LoanDetailsDialogComponent } from './loan-details-dialog/loan-details-dialog.component';
import { NgxHttpLoaderService } from 'ngx-http-loader';
import { PaidpopupDailogComponent } from './paidpopup-dailog/paidpopup-dailog.component';
import { HttpClient } from '@angular/common/http';
import {DatePipe} from '@angular/common';
import { PaymentDialogComponent } from './payment-dialog/payment-dialog.component';
declare var Razorpay: any;

export interface PeriodicElement {
  ReqNo: number;
  name: string;
  LoanNo: number;
  TATCount: number;
  Requesttype: string;
  Requestfor: string;
  RequestDate: string;
  Status: string;
}

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.css'],
})
export class LoanDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('imgFileInput', { static: false })

  // @ViewChild('searchBranchType') searchBranchType!: ElementRef;
  imgFileInput!: ElementRef;

  onSelectOption!: string;

  datas: any = [];
  dataDetails: any;
  loanAccount: any;
  show: boolean = false;
  textValue: string = '';
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
  serviceId: any;
  selectedLoanAccount: any;
  serviceRequest: any;
  branchTypeName: any = [];
  filterBranchTypeName: any = this.branchTypeName;
  searchBranchTypeTextboxControl = new FormControl();
  queryNames: any;
  isDisabled: boolean = false;
  showCard: boolean = false;

  fileName: any = [];
  imgUploadFilename: any;
  imgUpoloadFilecode: any;
  imgUpoladFiletype: any;
  imagUploadArray: any = [];
  urls: any = [];
  percent: any = 0;
  showProgressBar: boolean = false;
  ifVerifyHideImgDesable: boolean = true;
  myFiles: any[] = [];
  displayFileCount: any = 'Select File';
  serviceRequestid: any;
  serviceLoan: any;
  imp: any;
  hima: any;
  paidMsg:string = 'Paid Service';

  overDueAmount: boolean = false;
  showTopUp: boolean = false;

  sortedData: any = [];
  sortColumn: string = 'ReqNo';
  sortDirection: string = 'asc';

  razorPay: any;
  paymentStatus:string = 'failed';
  topUpStatus:string = 'open';
  otherDetails: any;
  gridsize: any;
  someDateVar: any;
  descListArray: any;
  

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
      this.service.createPayment(this.razorPay,this.datas[0].loanAcctNo,this.datas[0].customerName,this.datas[0].dueInstallment,this.paymentStatus,this.someDateVar).subscribe(res=>{
        console.log('yyyy',res);
        this.zone.run(() =>this.dialog.open(PaymentDialogComponent, {
          width: '550px',
          autoFocus: false,
          data: {result: this.razorPay}
        }));  
      })    
    } 
  };

  requestType = [
    { name: 'Query' },
    { name: 'Complaint' },
    { name: 'Request' },
    { name: 'Top-Up' },
  ];

  query = [
    { value: 1, viewValue: 'Loan Information Query' },
    { value: 2, viewValue: 'Top-up Loan /New loan' },
    { value: 3, viewValue: 'EMI Amount overdue amount EMI Bounce Details' },
    { value: 4, viewValue: 'NOC/NDC  Not Received' },
    { value: 5, viewValue: 'Query on Disbursement Amount' },
    { value: 6, viewValue: 'Multiple Reminder Calls / SMS' },
    { value: 7, viewValue: 'Swapping mode of repayment / Change of EMI Date' },
    { value: 8, viewValue: 'Query on CIBIL Updation' },
    { value: 9, viewValue: 'CIBIL – Suppression of Loan' },
    { value: 10, viewValue: 'Receipt Updation' },
  ];

  complaint = [
    { value: 1, viewValue: 'Swapping of Repayment Mode' },
    { value: 2, viewValue: 'CIBIL – Account Closed' },
    { value: 3, viewValue: 'CIBIL – Wrongly Updated' },
    {
      value: 4,
      viewValue:
        'Complaint on E-mail ID/contact number /mailing add /Name updation/modification',
    },
    { value: 5, viewValue: 'Disbursement Amount Not Received' },
    { value: 6, viewValue: 'Dispute in EMI Amount / Loan Tenure' },
    { value: 7, viewValue: 'Dispute in EMI Bounced Reason' },
    { value: 8, viewValue: 'Dispute in Rate of Interest' },
    { value: 9, viewValue: 'Dispute on Charges Waiver' },
    { value: 10, viewValue: 'EMI Not Debited' },
  ];

  request = [
    { value: 1, viewValue: 'Swapping of Repayment Mode' },
    { value: 2, viewValue: 'Welcome Kit' },
    { value: 3, viewValue: 'Interest Certificate' },
    { value: 4, viewValue: 'Foreclosure Statement' },
    { value: 5, viewValue: 'Repayment Schedule' },
    { value: 6, viewValue: 'Statement of Account' },
    { value: 7, viewValue: 'List of Documents' },
    { value: 8, viewValue: 'EMI Due Date/ EMI End Date' },
    { value: 9, viewValue: 'Top-up Loan /New loan Enquiry' },
    { value: 10, viewValue: 'EMI Bounced Reason' },
  ];

  ELEMENT_DATA: PeriodicElement[] = [
    {
      ReqNo: 1,
      name: 'Hydrogen',
      LoanNo: 1.0079,
      TATCount: 1,
      Requesttype: 'query',
      Requestfor: 'complaint',
      RequestDate: '1-12-2001',
      Status: 'open',
    },
    {
      ReqNo: 2,
      name: 'Helium',
      LoanNo: 4.0026,
      TATCount: 1,
      Requesttype: 'request',
      Requestfor: 'welcome kit',
      RequestDate: '2-04-2009',
      Status: 'in progress',
    },
    {
      ReqNo: 3,
      name: 'Lithium',
      LoanNo: 6.941,
      TATCount: 1,
      Requesttype: 'top-up',
      Requestfor: 'avinash',
      RequestDate: '4-12-2001',
      Status: 'in review',
    },
    {
      ReqNo: 4,
      name: 'Beryllium',
      LoanNo: 9.0122,
      TATCount: 1,
      Requesttype: 'complaint',
      Requestfor: 'vaibhav',
      RequestDate: '10-12-2001',
      Status: 'open',
    },
    {
      ReqNo: 5,
      name: 'Boron',
      LoanNo: 10.811,
      TATCount: 1,
      Requesttype: 'query',
      Requestfor: 'sahil',
      RequestDate: '11-1-2001',
      Status: 'close',
    },
  ];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  // @ViewChild('checkBoxVAlue',{ static: false }) checkBoxValue!: boolean;

  queryList: any = [];
  descList: any = [];
  requestList: any = [];
  selectedFile!: File;
  filesArray: any = [];
  ELEMENT_DATAS!: LoanDetailsElement[];
  dataSource = new MatTableDataSource<LoanDetailsElement>(this.ELEMENT_DATAS);
  checkBoxValue: boolean = false;

  displayedColumns: string[] = [
    'ReqNo',
    'name',
    'LoanNo',
    'phone',
    'Requesttype',
    'RequestDate',
    'Status',
  ];
  // dataSource = this.ELEMENT_DATA;

  // sliderValue = new FormControl(10000);

  // enquireForm = new FormGroup({
  //   sliderValue:this.sliderValue
  // });

  showRequest: boolean = false;

  selectQueryArray: any = [];
  queryListArray: any;
  @ViewChild('textAreaRef') textAreaRef!: ElementRef;
  constructor(
    private service: LoanDetailService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private toaster: ToastrService,
    private http: HttpClient,
    public datepipe: DatePipe,
    private zone: NgZone,
    private ngxhttploader: NgxHttpLoaderService
  ) {
    this.loanDetailsForm = new FormGroup({
      // Define your form controls here
    });
    this.transcatForm = new FormGroup({
      // Define your form controls here
    });
    this.transcatForm = new FormGroup({
      // Define your form controls here
    });
    this.queryForm = new FormGroup({
      // Define your form controls here
    });
  }

  ngOnInit(): void {
    this.loanData();
    this.serviceForm();
    this.getServiceRequestList();
    // this.myRequest();
    this.getLoanDetail();
    // this.viewDownload(this.data.id);
    this.sortedData = this.dataSource.data.slice();
    let myDate = new Date(); 
    this.someDateVar = this.datepipe.transform(myDate, 'yyyy-MM-dd');
    console.log(this.someDateVar);
  }

  editViewAction(id: any) {
    this.viewDownload(id);
    this.showRequest = true;
    this.service.getReasonMasterById(id).subscribe((res) => {
      console.log('res', res.data);
      this.serviceRequest = res.data;
    });
  }

  serviceForm() {
    this.serviceRequestForm = this.fb.group({
      id: [''],
      loanMasterId: ['', Validators.compose([Validators.required])],
      requestType: ['', Validators.compose([Validators.required])],
      rbiQueries: [''],
      requestItemId: [''],
      zip_codes: this.fb.array([]),
      selectFileUpload: [''],
      file_upload: [''],
      topUpAmount: [''],
      textArea: ['', []],
    });
  }

  getLoanDetail() {
    this.service
      .getLoanDetails()
      .pipe(
        map((res) => {
          // this.datas = res.data
          this.dataDetails = res.data;
        })
      )
      .subscribe();
  }

  loanData() {
    this.service
      .getLoanDetails()
      .pipe(
        map((res) => {
          this.loanAccount = res.data;
          console.log(this.loanAccount);
        })
      )
      .subscribe();
  }

  viewDownload(id: any) {
    this.service.viewUploadFile(id).subscribe((res) => {
      this.filesArray = res.data;
    });
  }

  makePayment() {
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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  openFile() {
    this.imgFileInput.nativeElement.click();
  }

  somethingChanged(enent: any) {
    this.queryList = [];
    this.descList = [];
    console.log(enent);
    let queryListArray = this.branchTypeName.find(
      (res: { itemId: any }) => res.itemId == enent
    );

    for (let i = 0; i < queryListArray.requestTypes.length; i++) {
      this.queryList.push(queryListArray.requestTypes[i]);
    }
    console.log(this.queryList);
    this.descListArray = this.branchTypeName.find(
      (res: { itemId: any }) => res.itemId == enent
    );
    console.log('vai:', this.descListArray.description);
    if (this.descListArray.description == 'Others') {
      this.isDisabled = true;
      this.serviceRequestForm.controls['textArea'].setValidators(
        Validators.required
      );
      // this.showCard = true;
      console.log(this.queryList[0].requestTypeId);

      if (this.queryList[0].requestTypeId) {
        this.checkBoxValue = true;
        this.hima = this.queryList[0].requestTypeId;
        
      }
      this.showTopUp = false;
      console.log(this.checkBoxValue);
    }
    if (this.descListArray.description == 'Query') {
      this.isDisabled = false;
      this.serviceRequestForm.controls['textArea'].updateValueAndValidity();
      this.serviceRequestForm.controls['textArea'].clearValidators();
      this.showCard = true;
      this.checkBoxValue = false;
      this.showTopUp = false;
    } else if (this.descListArray.description == 'Complain') {
      this.isDisabled = false;
      this.serviceRequestForm.controls['textArea'].updateValueAndValidity();
      this.serviceRequestForm.controls['textArea'].clearValidators();
      this.showCard = true;
      this.checkBoxValue = false;
      this.showTopUp = false;
    } else if (this.descListArray.description == 'Request') {
      this.isDisabled = false;
      this.serviceRequestForm.controls['textArea'].updateValueAndValidity();
      this.serviceRequestForm.controls['textArea'].clearValidators();
      this.showCard = true;
      this.checkBoxValue = false;
      this.showTopUp = false;
    }
    else if (this.descListArray.description == 'Top-Up') {
      this.isDisabled = false;
      this.serviceRequestForm.controls['textArea'].updateValueAndValidity();
      this.serviceRequestForm.controls['textArea'].clearValidators();
      this.showCard = false;
      if (this.queryList[0].requestTypeId) {
        this.checkBoxValue = true;
        this.hima = this.queryList[0].requestTypeId;
      }
      this.showTopUp = true;

    }
    this.serviceRequestForm.controls['textArea'].updateValueAndValidity();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.sortData();
  }

  // ngOnChanges() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;

  // };

  myRequest() {
    setTimeout(() => {
      this.service.getAllServiceRequest().subscribe((res) => {
        console.log(res.data);
        this.dataSource.data = res.data as LoanDetailsElement[];
        let queryListArray = this.dataSource.data;
        console.log(queryListArray);
        // for(let i = 0; i< queryListArray.requestTypes.length;i++){
        //       this.queryList.push(queryListArray.requestTypes[i])
        //     }

        this.requestList = [];
        let requestListArray = queryListArray;
        console.log(requestListArray);

        // for (let i = 0; i < requestListArray.requests.length; i++) {
        //   this.requestList.push(requestListArray.requests[i])
        // }

        console.log(this.requestList);
      });
    }, 500);
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRequestDetails() {
    this.showRequest = false;
    this.paginator?.firstPage();
    // console.log('vaibhav',this.serviceLoan);
  }

  showOptions(event: MatCheckboxChange) {
    this.show = event.checked;
    // console.log(this.show);
  }

  getServiceRequestList() {
    this.service
      .getReasonMasterList()
      .pipe(
        map((res) => {
          this.branchTypeName = res.data;
          this.filterBranchTypeName = this.branchTypeName;
          console.log('data', this.filterBranchTypeName);

          // for(let i =0; i< this.branchTypeName.length;i++){
          //   for(let j =0; j< this.branchTypeName[i].requestTypes.length;j++){
          //     this.queryList.push(this.branchTypeName[i].requestTypes[j])
          //   }
          // }

          // this.queryNames= res.data[0]
          // console.log('req',this.queryNames);
        })
      )
      .subscribe();
  }

  clearSearch(event: any, type: any) {
    if (type == 'requestType') {
      event.stopPropagation();
      this.searchBranchTypeTextboxControl.patchValue('');
      this.filterBranchTypeName = this.branchTypeName;
    }
  }

  searchDropdown(searchText: any, type: any) {
    if (type == 'requestType') {
      if (searchText != '') {
        this.filterBranchTypeName = this.branchTypeName.filter(
          (Option: { description: string } ) => {
            return Option?.description
              ?.toLocaleLowerCase()
              .includes(searchText?.toLowerCase());
          }
        );
      } else {
        this.filterBranchTypeName = this.branchTypeName;
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

  // clearSearchBar(){
  //   this.searchBranchType.nativeElement.value = ''
  //   this.filterBranchTypeName=this.branchTypeName
  // }

  createAddEditForm() {
    if (this.serviceRequestForm.invalid) {
      this.serviceRequestForm.markAllAsTouched();
      return;
    }
    let _msg = 'Your Service Request has be Submitted Successfully';
    if (this.show) {
      if (this.textAreaRef.nativeElement.validity.valid) {
        console.log('textarea is valid');
      } else {
        console.log('text area is invalid');
      }
    }
     if (this.checkBoxValue) {
      this.selectQueryArray.push(this.hima)
    }
    let filterBranchTypeNameValue = this.filterBranchTypeName.find(
      (res: { itemId: any }) =>
        res.itemId == this.serviceRequestForm.get('requestType')?.value
    );
    console.log(filterBranchTypeNameValue.description);

    this._addEditFormData = this.serviceRequestForm.value;
    this._addEditFormData.requestTypeId = this.selectQueryArray;
    this._addEditFormData.requestType = filterBranchTypeNameValue.description;
    this._addEditFormData.remark = this.serviceRequestForm.controls['textArea'].value;
    this._addEditFormData.topUpAmount =  this.gridsize
    console.log(this._addEditFormData);
    if(this.descListArray.description == 'Request' || this.descListArray.description == 'Others' || this.descListArray.description == 'Query' || this.descListArray.description == 'Complain'){
      this.service.createReasonMaster(this._addEditFormData).subscribe((res) => {
        this.serviceId = res;
        console.log('yyy', this.serviceId);
        if (this.serviceId) {
          const dialogRef = this.dialog.open(LoanDetailsDialogComponent, {
            width: '550px',
            autoFocus: false,
            data: { result: this.serviceId.data, id: this.serviceId.days },
          });
        }
  
        if (this.myFiles.length != 0) {
          this.service.fileUpload(res.data, this.myFiles).subscribe((res) => {});
        }
      });
    }

    if (this.descListArray.description == 'Top-Up'){
      this.service.createReasonMaster(this._addEditFormData).subscribe((res) => {
        this.serviceId = res;
        console.log('yyy', this.serviceId);
        if (this.serviceId) {
          const dialogRef = this.dialog.open(LoanDetailsDialogComponent, {
            width: '550px',
            autoFocus: false,
            data: { result: this.serviceId.data, id: this.serviceId.days },
          });
        }
  
        if (this.myFiles.length != 0) {
          this.service.fileUpload(res.data, this.myFiles).subscribe((res) => {});
        }
      });
      setTimeout(() => {
        
        this.service.createTopUps(this.datas[0].loanAcctNo,this.datas[0].customerName,this.datas[0].pancard,this.gridsize,this.datas[0].mobileNumber, this.topUpStatus,this.someDateVar).subscribe(res=>{
          console.log('topup',res);
          if(res.msgKey == 'Success'){
          this.toaster.success(res.message)
      }})
      }, 500);

    }
   

    this.service.getAllServiceRequest().subscribe((res) => {
      console.log(res.data);
      this.serviceRequestid = res.data;
    });

    this.toaster.success(_msg);

    if (this.serviceId) {
      let dialogRef = this.dialog.open(LoanDetailsDialogComponent, {
        width: '550px',
        autoFocus: false,
        data: { result: this.serviceId },
      });
    }
    this.dialog.afterAllClosed.subscribe((res) => {
      this.ngxhttploader.show();
      setTimeout(() => {
        this.ngxhttploader.hide();
        this.serviceRequestForm.reset();
        // this.serviceRequestForm.controls['loanMasterId'].updateValueAndValidity();
        // this.serviceRequestForm.controls['requestType'].updateValueAndValidity();
        this.showCard = false;
        this.isDisabled = false;
      }, 1000);

      // this.serviceRequestForm.controls['loanMasterId'].clearValidators();
      // this.serviceRequestForm.controls['requestType'].clearValidators();
    });
  }

  selectLoanAmount(loanId: any) {
    console.log(this.datas);
    let loanData: any = [];
    this.datas = [];
    // let loanData= this.datas.find((res: { id: any; })=>res.id === loanId);
    for (let i = 0; i < this.dataDetails.length; i++) {
      if (this.dataDetails[i].id == loanId) {
        this.datas.push(this.dataDetails[i]);
      }
    }
    // this.datas = loanData[0]
    console.log(loanId, loanData, this.datas);
  }

  clickQuryFormSelect(type: any, id: any, index: any) {
    console.log(type);
    // if (type.checked === false) {
    //   this.isDisabled = true
    // }
    this.imp = type;

    console.log('bha', this.imp);
    if (this.checkBoxValue) {
      type.checked = true;
    }

    // console.log(type.target.checked,id);
    if (type.checked === true) {
      // this.isDisabled = false
      this.selectQueryArray.push(id);
    } else {
      if (this.selectQueryArray.includes(id)) {
        let indexValue = this.selectQueryArray.indexOf(id);
        console.log(indexValue);

        this.selectQueryArray.splice(indexValue, 1);
      }
    }

    console.log(this.selectQueryArray);
  }

  loanAcc(id: any) {
    this.service.getLoanDetailsByAcc(id).subscribe((res) => {
      this.serviceLoan = res.data;
      console.log('res', this.serviceLoan);
      this.dataSource.data = res.data as LoanDetailsElement[];
    });
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      // this.ngxhttploader.show();
      this.showProgressBar = true;
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        this.fileName.push(event.target.files[i].name);
        this.imgUploadFilename = event.target.files[i].name;
        this.imgUpoladFiletype = event.target.files[i].type;
        var reader = new FileReader();

        reader.onload = (event: any) => {
          this.urls.push({
            data: event.target.result,
            name: this.imgUploadFilename,
            type: this.imgUpoladFiletype,
          });
          this.imgUpoloadFilecode = event.target.result;
          // console.log(this.urls);
        };
        reader.readAsDataURL(event.target.files[i]);

        reader.addEventListener('progress', (event) => {
          this.percent = Math.round((event.loaded / event.total) * 100);
          // const loadingBar = Array(10)
          //     .fill('▒')
          //     .map((item, index) => Math.round(this.percent / 10) > index ? '█' : '▒')
          //     .join('')

          //document.location.hash = `${loadingBar}(${this.percent}%)`
        });
        // reader.addEventListener('load', event => console.log(event.target.result))
      }
      // this.ngxhttploader.hide();
    }

    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(<File>event.target.files[i]);
    }
    if (this.myFiles.length == 1) {
      this.displayFileCount = this.myFiles.length + ' File Selected';
    } else if (this.myFiles.length == 0) {
      this.displayFileCount = 'Select File';
    } else {
      this.displayFileCount = this.myFiles.length + ' Files Selected';
    }
  }

  validationUpdate(event: any) {
    if (event.checked == true) {
      this.serviceRequestForm.controls['textArea'].setValidators(
        Validators.required
      );
    } else if (event.checked == false) {
      this.serviceRequestForm.controls['textArea'].updateValueAndValidity();
      this.serviceRequestForm.controls['textArea'].clearValidators();
    }

    this.serviceRequestForm.controls['textArea'].updateValueAndValidity();
  }

  showOverDueAmount() {
    this.overDueAmount = true;
  }

  sortData() {
    const data = this.dataSource.data.slice();
    if (!this.sort.active || this.sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'ReqNo':
          return this.compare(a.serviceRequestId, b.serviceRequestId, isAsc);
        case 'name':
          return this.compare(
            a.loanMaster.customerName,
            b.loanMaster.customerName,
            isAsc
          );
        case 'LoanNo':
          return this.compare(
            a.loanMaster.loanAcctNo,
            b.loanMaster.loanAcctNo,
            isAsc
          );
        case 'phone':
          return this.compare(
            a.loanMaster.mobileNumber,
            b.loanMaster.mobileNumber,
            isAsc
          );
        case 'Requesttype':
          return this.compare(a.requestType, b.requestType, isAsc);
        case 'RequestDate':
          return this.compare(
            new Date(a.requestDate),
            new Date(b.requestDate),
            isAsc
          );
        case 'Status':
          return this.compare(a.requestStatus, b.requestStatus, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: any, b: any, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  openPaidPopUp(requestTypeId:any){

      this.dialog.open(PaidpopupDailogComponent, {
      width: '550px',
      autoFocus: false,
      data: { result: this.queryList ,'requestTypeId':requestTypeId}
    });
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
