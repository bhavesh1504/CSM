import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { LoginDetailService } from 'src/app/core/login-details/service/login-detail.service';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { LoanDetailsElement } from 'src/app/core/login-details/service/models/loandetails';
import { MatTableDataSource } from '@angular/material/table';

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
  styleUrls: ['./loan-details.component.css']
})



export class LoanDetailsComponent implements OnInit {

  @ViewChild('imgFileInput', { static: false })
  // @ViewChild('searchBranchType') searchBranchType!: ElementRef;

  imgFileInput!: ElementRef;

  onSelectOption!: string;

  datas: any=[];
  dataDetails: any;
  loanAccount: any;
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

  selectedLoanAccount: any;

  branchTypeName: any = [];
  filterBranchTypeName: any = this.branchTypeName;
  searchBranchTypeTextboxControl = new FormControl();
  queryNames: any

  requestType = [
    { name: 'Query' },
    { name: 'Complaint' },
    { name: 'Request' },
    { name: 'Top-Up' }
  ]

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
    { value: 10, viewValue: 'Receipt Updation' }
  ]

  complaint = [
    { value: 1, viewValue: 'Swapping of Repayment Mode' },
    { value: 2, viewValue: 'CIBIL – Account Closed' },
    { value: 3, viewValue: 'CIBIL – Wrongly Updated' },
    { value: 4, viewValue: 'Complaint on E-mail ID/contact number /mailing add /Name updation/modification' },
    { value: 5, viewValue: 'Disbursement Amount Not Received' },
    { value: 6, viewValue: 'Dispute in EMI Amount / Loan Tenure' },
    { value: 7, viewValue: 'Dispute in EMI Bounced Reason' },
    { value: 8, viewValue: 'Dispute in Rate of Interest' },
    { value: 9, viewValue: 'Dispute on Charges Waiver' },
    { value: 10, viewValue: 'EMI Not Debited' }
  ]

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
    { value: 10, viewValue: 'EMI Bounced Reason' }
  ]

  ELEMENT_DATA: PeriodicElement[] = [
    { ReqNo: 1, name: 'Hydrogen', LoanNo: 1.0079, TATCount: 1, Requesttype: 'query', Requestfor: 'complaint', RequestDate: '1-12-2001', Status: 'open' },
    { ReqNo: 2, name: 'Helium', LoanNo: 4.0026, TATCount: 1, Requesttype: 'request', Requestfor: 'welcome kit', RequestDate: '2-04-2009', Status: 'in progress' },
    { ReqNo: 3, name: 'Lithium', LoanNo: 6.941, TATCount: 1, Requesttype: 'top-up', Requestfor: 'avinash', RequestDate: '4-12-2001', Status: 'in review' },
    { ReqNo: 4, name: 'Beryllium', LoanNo: 9.0122, TATCount: 1, Requesttype: 'complaint', Requestfor: 'vaibhav', RequestDate: '10-12-2001', Status: 'open' },
    { ReqNo: 5, name: 'Boron', LoanNo: 10.811, TATCount: 1, Requesttype: 'query', Requestfor: 'sahil', RequestDate: '11-1-2001', Status: 'close' }
  ];

  queryList: any = []
  selectedFile!: File;
  ELEMENT_DATAS!: LoanDetailsElement[];
  dataSource = new MatTableDataSource<LoanDetailsElement>(this.ELEMENT_DATAS);

  displayedColumns: string[] = ['ReqNo', 'LoanNo', 'name', 'TATCount', 'Requesttype', 'Requestfor', 'RequestDate', 'Status'];
  // dataSource = this.ELEMENT_DATA;


  // sliderValue = new FormControl(10000);

  // enquireForm = new FormGroup({
  //   sliderValue:this.sliderValue
  // });

  showRequest: boolean = false

  selectQueryArray:any=[]

  constructor(private service: LoginDetailService, private fb: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loanData();
    this.serviceForm();
    this.getServiceRequestList();
    this.myRequest();
    this.getLoanDetail()
  }

  editViewAction(id: any) {

    this.service.getReasonMasterById(id).subscribe()

  }

  serviceForm() {
    this.serviceRequestForm = this.fb.group({
      id: [''],
      loanMasterId:[''],
      requestType: ['', Validators.compose([Validators.required])],
      rbiQueries: [''],
      requestItemId: [''],
      zip_codes : this.fb.array([])
    })
  }

  getLoanDetail() {
    this.service.getLoanDetails().pipe(map((res) => {
      // this.datas = res.data
      this.dataDetails = res.data
    })).subscribe();
  }

  loanData() {
    this.service.getLoanDetails().pipe(map((res) => {
      this.loanAccount = res.data
      console.log(this.loanAccount)

    })).subscribe();
  }



  makePayment() {

  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]
  }

  openFile() {
    this.imgFileInput.nativeElement.click()
  }

  somethingChanged(enent: any) {
    this.queryList = []
    console.log(enent);
    let queryListArray = this.branchTypeName.find((res: { itemId: any; }) => res.itemId == enent)

    for (let i = 0; i < queryListArray.requestTypes.length; i++) {
      this.queryList.push(queryListArray.requestTypes[i])
    }


    console.log(this.queryList);

  }




  myRequest() {
    setTimeout(() => {
      this.service.getAllServiceRequest().subscribe(res => {
        console.log(res.data);
        this.dataSource.data = res.data as LoanDetailsElement[]
        let queryListArray = this.dataSource.data
        console.log(queryListArray);
        // for(let i = 0; i< queryListArray.requestTypes.length;i++){
        //       this.queryList.push(queryListArray.requestTypes[i])
        //     }
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

      // for(let i =0; i< this.branchTypeName.length;i++){
      //   for(let j =0; j< this.branchTypeName[i].requestTypes.length;j++){
      //     this.queryList.push(this.branchTypeName[i].requestTypes[j])
      //   }
      // }

      // this.queryNames= res.data[0]
      // console.log('req',this.queryNames);



    })).subscribe();
  }

  clearSearch(event: any, type: any) {
    if (type == 'requestItemId') {
      event.stopPropagation();
      this.searchBranchTypeTextboxControl.patchValue('');
      this.filterBranchTypeName = this.branchTypeName;
    }
  }

  searchDropdown(searchText: any, type: any) {
    if (type == 'requestItemId') {
      if (searchText != '') {
        this.filterBranchTypeName = this.branchTypeName.filter((Option: { requestItemId: { description: string; }; }) => {
          return Option.requestItemId?.description.toLocaleLowerCase().startsWith(searchText.toLowerCase())
        })
      } else {
        this.filterBranchTypeName = this.branchTypeName
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
    let filterBranchTypeNameValue = this.filterBranchTypeName.find((res: { itemId: any; })=>res.itemId == this.serviceRequestForm.get('requestType')?.value)
console.log(filterBranchTypeNameValue.description);

    this._addEditFormData = this.serviceRequestForm.value
    this._addEditFormData.requestTypeId= this.selectQueryArray
    this._addEditFormData.requestType=filterBranchTypeNameValue.description
    console.log(this._addEditFormData);
    
    this.service.createReasonMaster(this._addEditFormData).subscribe(res => {
      console.log(res);
    })

  }

  selectLoanAmount(loanId: any) {
  console.log(this.datas);
  let loanData:any=[]
  this.datas=[]
   // let loanData= this.datas.find((res: { id: any; })=>res.id === loanId);
    for(let i=0 ; i< this.dataDetails.length;i++){
      if(this.dataDetails[i].id == loanId){
        this.datas.push(this.dataDetails[i])
      }
      
    }
    // this.datas = loanData[0]
    console.log(loanId,loanData,this.datas);
    
  }

  clickQuryFormSelect(type:any,id:any,index:any){
    console.log(type);
    
    // console.log(type.target.checked,id);
    if(type._checked === true){
      this.selectQueryArray.push(id)
    }else{
      if(this.selectQueryArray.includes(id)){
        let indexValue = this.selectQueryArray.indexOf(id)
        console.log(indexValue);
        
        this.selectQueryArray.splice(indexValue,1)
      }
      
    }
    
    console.log( this.selectQueryArray);
    

  }

}


