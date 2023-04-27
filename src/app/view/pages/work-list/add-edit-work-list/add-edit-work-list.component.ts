import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, NgModel } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CitiesElement } from 'src/app/core/geography-masters/cities/models/cities.model';
import { CitiesService } from 'src/app/core/geography-masters/cities/service/cities.service';
import { LeadSourceElement } from 'src/app/core/lead-source/models/leadSource.model';
import { LeadSourceService } from 'src/app/core/lead-source/service/leadSource.service';
import { WorkListService } from '../../../../core/work-list/service/work-list.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError, tap, timer } from 'rxjs';
import { StatesElement } from 'src/app/core/geography-masters/states/models/states.model';
import { StatesService } from 'src/app/core/geography-masters/states/service/states.service';
import { LeadStatusElement } from 'src/app/core/lead-status/models/leadStatus.model';
import { LeadStatusService } from 'src/app/core/lead-status/service/leadStatus.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewUploadedFilesComponent } from '../view-uploaded-files/view-uploaded-files.component';
import { NgxHttpLoaderService } from 'ngx-http-loader';
import { RejectReasonService } from 'src/app/core/reject-reason/service/reject-reason.service';
import { RejectReasonElement } from 'src/app/core/reject-reason/models/reject-reason.model';
import { DatePipe, Location } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { ProductMasterElement } from 'src/app/core/product-master/models/ProductMaster.model';
import { LoanTypeElement } from 'src/app/core/loan-type/models/loanType.model';
import { LoanTypeService } from 'src/app/core/loan-type/service/loanType.service';
import { ProductMasterService } from 'src/app/core/product-master/service/ProductMaster.service';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { environment } from 'src/environments/environment.prod';
import { NotMatchFeildComponent } from '../not-match-feild/not-match-feild.component';
import { DateAdapter } from '@angular/material/core';
// import  $ from 'jquery';
// import * as $ from 'jquery';

declare var $: any;

@Component({
  selector: 'app-add-edit-work-list',
  templateUrl: './add-edit-work-list.component.html',
  styleUrls: ['./add-edit-work-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddEditWorkListComponent implements OnInit {

  @ViewChild('imgFileInput', { static: false })
  imgFileInput!: ElementRef;

  @ViewChild('sentOTP', { static: false })
  sentOTP!: ElementRef;

  @ViewChild('searchLoanType', { static: false }) searchLoanTypeElement!: ElementRef;
  @ViewChild('searchProduct', { static: false }) searchProductElement!: ElementRef;
  @ViewChild('searchleadLoanStatus', { static: false }) searchleadLoanStatusElement!: ElementRef;

  @ViewChild('rejectReason', { static: false }) rejectReasonElementId!: NgModel;



  addEditForm: FormGroup;
  genderName = [
    { value: 'Male', viewValue: 'Male' },
    { value: 'Female', viewValue: 'Female' }
  ];
  TenureArray = [
    { value: '6', viewValue: '6 Months' },
    { value: '12', viewValue: '12 Months' },
    { value: '24', viewValue: '24 Months' },
    { value: '36', viewValue: '36 Months' },
    { value: '48', viewValue: '48 Months' },
    { value: '60', viewValue: '60 Months' }
  ];


  // LeadStatusName = [
  //   { id: '1', leadStatusName: 'Maharastra' },
  //   { id: '2', leadStatusName: 'Delhi' },
  //   { id: '3', leadStatusName: 'Chennai' },
  //   { id: '4', leadStatusName: 'Gujarat' }
  // ];
  // cityName = [
  //   {value: '1', viewValue: 'Mumabi'},
  //   {value: '2', viewValue: 'Pune'},
  //   {value: '3', viewValue: 'Nashik'},
  //   {value: '4', viewValue: 'Nagpur'}
  // ];
  ConvenientTime = [
    { value: 1, viewValue: 'Morning between 9:00 AM - 11:59 AM' },
    { value: 2, viewValue: 'Afternoon between 12:00 PM - 4:00 PM' },
    { value: 3, viewValue: 'Evening between 04:01 PM - 07:30 PM' }
  ];
  documentUploadType = [
    { value: '1', viewValue: 'Pan Card' },
    { value: '2', viewValue: 'Adhhar Card' },
    { value: '3', viewValue: 'Passport' },
    { value: '4', viewValue: 'Driving Licence' }
  ];

  LeadApprovalArray: any = [
    // { value: '1', viewValue: 'Approved' },
    { value: '1', viewValue: 'Reject' },
    // { value: '3', viewValue: 'Under Review' },
  ];
  // LeadApprovalArray = [
  //   { value: '1', viewValue: 'Approved' },
  //   { value: '2', viewValue: 'Reject' },
  //   // { value: '3', viewValue: 'Under Review' },
  // ];

  CityName: CitiesElement[] = [];
  StateName: StatesElement[] = [];
  LeadSourceName: LeadSourceElement[] = [];
  LeadStatusName: LeadStatusElement[] = [];
  RejectReasonName: RejectReasonElement[] = [];
  BussinessRuleEngineArray: [] = [];

  queryParamData: any;
  saveBtn: boolean = true;
  saveLeadApprovedBtn: boolean = false;
  createBtn: boolean = true;
  addEditHeadTitle: any;
  crateleadBtnName: string = ''
  urls: any = [];
  fileName: any = [];
  mobileVerifyBtn: boolean = false;
  emailVerifyBtn: boolean = false;
  VerifyBtnDiv: boolean = false;//true;
  leadApprovalScreen: boolean = false;//true;
  RejectReasonSelect: boolean = false;

  spliteRoleName: any;
  makeaRoleArray: any;

  imgUploadFilename: any;
  imgUpoloadFilecode: any;
  imgUpoladFiletype: any;
  imagUploadArray: any = [];

  salesRole: boolean = false;
  adminRole: boolean = false;
  creditRole: boolean = false;

  mobileVerifyText = 'Verify'
  emailVerifyText = 'Verify'

  LeadScheduleScreen: boolean = false;
  ViewLeadScheduleScreen: boolean = false;
  LeadLoanScreen: boolean = false;
  ViewLeadLoanScreen: boolean = false;
  leadScheduleStatusOnlyView: boolean = true;
  leadApprovedStatusOnlyViewNotEdit: boolean = false
  IFLeadCreateBySeales: any

  getMobileNoFromRes: any
  getEmailNoFromRes: any

  getMobileNoFromResBtnDisable: boolean = false;
  getEmailNoFromResBtnDisabl: boolean = false;
  dateOfBirthFormate: any
  AsssinedToPlaceHolder: any

  statePlaceholderName: any
  cityPlaceholderName: any
  leadSourcePlaceholderName: any
  leadStatusPlaceholderName: any = 'Select Lead Status';
  leadStatusLoanPlaceholderName: any = 'Select Lead Status';
  leadStatusApprovedPlaceholderName: any = 'Select Lead Status';

  viewLeadStage: any
  ViewleadStatus: any

  allLeadDetails: any = '';
  allScheduleDetails: any = []
  byteFileData: any;
  myFiles: any[] = [];
  displayFileCount: any = 'Select File';

  percent: any = 0
  showProgressBar: boolean = false;

  currentYear = new Date()
  todayDate: Date = new Date();

  ReScheduledBtn: boolean = false;
  isScheduleProceed: boolean = false;
  ViewLeadScheduleCommentsScreen: boolean = false;

  filterProductName: ProductMasterElement[] = [];
  searchProductTextboxControl = new FormControl();
  SelectProductPlaceholder: any = 'Select Product'
  ProductName: ProductMasterElement[] = [];

  filterLoanTypeName: LoanTypeElement[] = [];
  searchLoanTypeTextboxControl = new FormControl();
  SelectLoanTypePlaceholder: any = 'Select Loan Type'
  LoanTypeName: LoanTypeElement[] = [];

  isBRageCheck: boolean = false;
  BRcibilScroreCheck: boolean = false;
  BRisEmailVerifiedCheck: boolean = false;
  BRisMobileVerifiedCheck: boolean = false;
  BRisPanlVerifiedCheck: boolean = false;

  BRageID = ''
  BRcibilScroreID = ''
  BRisEmailVerifiedID = ''
  BRisMobileVerifiedID = ''
  BRisPanlVerifiedID = ''

  DeviationDeatilaArray: any = [];
  checkDeviationTrueArray: any = [];
  checkDeviationDescriptionArray: any = [];
  BussinessRuleEngineIdFlag: boolean = false;

  userDetails: any;
  userDetailAtoBValue: any = '';

  filterLoanStatusSelectName: LeadStatusElement[] = [];
  searchleadLoanStatusTextboxControl = new FormControl();

  showApprovedOnly: boolean = false
  PassDeviationDeatilaArrayChecked: any = [];

  datePipe = new DatePipe("en-US");

  ReSentOtpTimmer: boolean = false;
  ReSentOtpTimmerBoleean: boolean = false;
  countDown!: Subscription;
  counter = 60;
  tick = 1000

  ifVerifyHideImgDesable: boolean = true;

  maxDob!: Date;
  isValidAge = false;

  checkArray: any[] = []
  checkLeadArray: any[] = []
  checkMobileNo: any[] = []
  panNoCheck: any[] = []

  mobileExistError: boolean = false
  mobileMax10Error: boolean = false
  panExistError: boolean = false
  panPatternError: boolean = false

  NSDLMissMatch: boolean = false
  PANdataName: boolean = false
  PanDateodBirth: boolean = false

  clickRejectBtn: boolean = false;
  clickApprovedBtn: boolean = false;

  checkDeviationApproRejArray: any = [];

  constructor(private leadStatusService: LeadStatusService, private statesService: StatesService, private toastr: ToastrService, private fb: FormBuilder, private router: Router, private workListService: WorkListService, private routes: ActivatedRoute, private citiesService: CitiesService, private leadSourceService: LeadSourceService,
    public dialogRef: MatDialogRef<AddEditWorkListComponent>, public dialog: MatDialog, private rejectReasonService: RejectReasonService, private loanTypeService: LoanTypeService, private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any, private ngxhttploader: NgxHttpLoaderService, private location: Location, private productMasterService: ProductMasterService, private dateAdapter: DateAdapter<Date>, private cdr: ChangeDetectorRef,
  ) {

    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy

    this.spliteRoleName = sessionStorage.getItem('role');
    this.makeaRoleArray = this.spliteRoleName?.split(',');


    for (let j = 0; j < this.makeaRoleArray.length; j++) {

      if (this.makeaRoleArray[j] == 'Sales') {
        //this.VerifyBtnDiv=true;
        this.salesRole = true
      }
      if (this.makeaRoleArray[j] == 'Credit') {
        this.leadApprovalScreen = true;
        this.creditRole = true;
      }
    }

    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    const today = new Date();
    this.maxDob = new Date(
      today.getFullYear() - 18,//age more than 18
      today.getMonth(),
      today.getDate()
    );

    this.addEditForm = this.fb.group({
      id: [''],
      leadId: [''],
      name: [''],

      firstName: [''],
      middleName: [''],
      lastName: [''],

      mobileNo: [''],
      email: [''],
      dateOfBirth: [''],
      pan: [''],
      aadhar: [''],
      city: [''],
      gender: [''],
      leadSource: [''],
      leadMaintainceStatus: [''],
      assign_To: [''],
      state: [''],
      scheduleDate: [''],
      convenientTime: [''],
      leadScheduleStatus: [''],
      scheduledRemark: [''],
      selectFileUpload: [''],

      area: [''],
      loanAmount: [''],
      product: [''],
      tenor: [''],
      remarkLeadLoan: [''],
      cibilScoreLeadLoan: [''],
      // file_upload: this.fb.array([]),
      file_upload: [''],
      cibilScore: [''],
      leadLoanStatus: [''],
      mobileNoVarification: [''],
      emailIdVarification: [''],

      leadStage: [''],
      // rejectReason: [''],
      approvedRemark: [''],
      leadApprovedStatus: [''],
      loanType: [''],

      // BRage: false,
      // BRcibilScrore: false,
      // BRisEmailVerified: false,
      // BRisMobileVerified: false,
      // BRisPanlVerified: false,

      // BRageID: false,
      // BRcibilScroreID: false,
      // BRisEmailVerifiedID: false,
      // BRisMobileVerifiedID: false,
      // BRisPanlVerifiedID: false,

      Age: false,
      cibil_score: false,
      IsEmailVerified: false,
      IsMobileVerified: false,
      IsPanVerified: false,
    })

    if (this.authService.isLoggedIn()) {
      this.userDetails = sessionStorage.getItem('UserDetails')
      this.userDetailAtoBValue = JSON.parse(atob(this.userDetails));
    }
  }

  ngOnInit(): void {

    this.routes.queryParams.subscribe(res => this.queryParamData = res);

    if (this.data.type == 'edit') {
      this.saveBtn = true;
      this.createBtn = true;
      this.addEditHeadTitle = 'Update Lead Worklist';
      if (this.leadApprovalScreen == false) {
        this.getDropdownData()
        this.getSingleData(this.data.id)
      }




      // if(this.IFLeadCreateBySeales != "Sales"){
      //   this.LeadScheduleScreen = true
      //   this.crateleadBtnName = 'Save'
      //   this.saveBtn = false;
      // this.addEditForm.get('scheduleDate')?.setValidators([Validators.required])
      // this.addEditForm.get('scheduleDate')?.updateValueAndValidity
      // this.addEditForm.get('convenientTime')?.setValidators([Validators.required])
      // this.addEditForm.get('convenientTime')?.updateValueAndValidity
      // this.addEditForm.get('scheduledRemark')?.setValidators([Validators.required])
      // this.addEditForm.get('scheduledRemark')?.updateValueAndValidity
      // }
      // else{
      //   this.makeLeadLoanScreenLogic();
      // }

      if (this.leadApprovalScreen == true) {
        this.addEditHeadTitle = 'Lead Approval';
        this.saveBtn = true;
        this.createBtn = true;
        this.ReScheduledBtn = false;
        this.crateleadBtnName = 'Submit'
        this.getSingleData(this.data.id);
        this.saveLeadApprovedBtn = true


        this.addEditForm.get('leadStage')?.setValidators([Validators.required])
        this.addEditForm.get('leadStage')?.updateValueAndValidity
        this.addEditForm.get('approvedRemark')?.setValidators([Validators.required])
        this.addEditForm.get('approvedRemark')?.updateValueAndValidity
        // this.addEditForm.get('leadApprovedStatus')?.setValidators([Validators.required])
        // this.addEditForm.get('leadApprovedStatus')?.updateValueAndValidity
        // this.crateleadBtnName = 'Verify'

        // this.addEditForm.get('leadStage')?.clearValidators()
        // this.addEditForm.get('leadStage')?.updateValueAndValidity
        // this.addEditForm.get('remark')?.clearValidators()
        // this.addEditForm.get('remark')?.updateValueAndValidity
      }
      // else {
      //   this.crateleadBtnName = 'Submit'
      // }
    } else if (this.data.type == 'view') {
      this.addEditHeadTitle = 'View Lead Worklist'
      this.saveBtn = false;
      this.createBtn = false;
      this.ReScheduledBtn = false;
      this.getSingleData(this.data.id);
      this.addEditForm.disable();
      //this.viewUploadFile(this.data.id);
    }
    else if (this.leadApprovalScreen == true) {
      // this.addEditHeadTitle = 'Lead Approval';
      // this.saveBtn = true;
      // this.createBtn = true;
      // this.crateleadBtnName = 'Submit'
      // this.getSingleData(this.data.id);
      // this.addEditForm.get('loanAmount')?.disable()
      // this.addEditForm.get('product')?.disable()
      // this.addEditForm.get('tenor')?.disable()
      // this.addEditForm.get('remarkLeadLoan')?.disable()
      // this.addEditForm.get('file_upload')?.disable()
      // this.addEditForm.get('loanAmount')?.clearValidators()
      // this.addEditForm.get('loanAmount')?.updateValueAndValidity
      // this.addEditForm.get('product')?.clearValidators()
      // this.addEditForm.get('product')?.updateValueAndValidity
      // this.addEditForm.get('tenor')?.clearValidators()
      // this.addEditForm.get('tenor')?.updateValueAndValidity
      // this.addEditForm.get('remarkLeadLoan')?.clearValidators()
      // this.addEditForm.get('remarkLeadLoan')?.updateValueAndValidity
      // this.addEditForm.get('file_upload')?.clearValidators()
      // this.addEditForm.get('file_upload')?.updateValueAndValidity

      // this.addEditForm.get('leadStage')?.setValidators([Validators.required])
      // this.addEditForm.get('leadStage')?.updateValueAndValidity
      // this.addEditForm.get('remark')?.setValidators([Validators.required])
      // this.addEditForm.get('remark')?.updateValueAndValidity
    }
    else {
      this.addEditHeadTitle = 'Create'
      this.crateleadBtnName = 'Create'
      this.ReScheduledBtn = false;
      //this.getDropdownData()
    }

    setTimeout(() => {
      this.searchLoanTypeElement?.nativeElement?.focus()
      this.searchProductElement?.nativeElement?.focus()
      this.searchleadLoanStatusElement?.nativeElement?.focus()
    }, 50)

    // this.countDown = timer(0, this.tick)
    // .subscribe(() => --this.counter)

    //dob validation 18

    this.addEditForm.get('dateOfBirth')?.valueChanges.subscribe((val: any) => {
      let current = moment();
      let selected = moment(val, 'MM-YYYY');
      let age = moment.duration(current.diff(selected));
      if (age.years() < 18) {
        this.isValidAge = true;
        this.addEditForm.get('dateOfBirth')?.setErrors({ incorrect: true });
      } else {
        this.isValidAge = false;
        this.addEditForm.get('dateOfBirth')?.setErrors(null);
      }
    });

    setTimeout(() => {
      for (let i = 0; i < this.checkArray.length; i++) {

        this.checkMobileNo.push(this.checkArray[i].mobileNo)
        this.panNoCheck.push(this.checkArray[i].pan)
      }
      for (let i = 0; i < this.checkLeadArray.length; i++) {

        this.checkMobileNo.push(this.checkLeadArray[i].mobileNo)
        this.panNoCheck.push(this.checkLeadArray[i].pan)
      }
    }, 500);
  }

  getDropdownData() {
    // this.getStateData();
    // this.getCityData();
    // this.getLeadSourceData();
    this.getLeadStatusData();
    this.getLoanTypeData();
    this.getProductData();
  }

  makeLeadLoanScreenLogic() {
    if (this.data.type == 'edit') {
      this.LeadLoanScreen = true
      this.createBtn = true;
      // this.crateleadBtnName = 'Verify'
      this.crateleadBtnName = 'Submit'
      this.saveBtn = true;
      this.addEditForm.get('loanAmount')?.setValidators([Validators.required])
      this.addEditForm.get('loanAmount')?.updateValueAndValidity
      this.addEditForm.get('product')?.setValidators([Validators.required])
      this.addEditForm.get('product')?.updateValueAndValidity
      this.addEditForm.get('tenor')?.setValidators([Validators.required])
      this.addEditForm.get('tenor')?.updateValueAndValidity
      this.addEditForm.get('loanType')?.setValidators([Validators.required])
      this.addEditForm.get('loanType')?.updateValueAndValidity
      this.addEditForm.get('remarkLeadLoan')?.setValidators([Validators.required])
      this.addEditForm.get('remarkLeadLoan')?.updateValueAndValidity
      // this.addEditForm.get('file_upload')?.setValidators([Validators.required])
      // this.addEditForm.get('file_upload')?.updateValueAndValidity
      this.addEditForm.get('cibilScoreLeadLoan')?.setValidators([Validators.required])
      this.addEditForm.get('cibilScoreLeadLoan')?.updateValueAndValidity
      this.addEditForm.get('leadLoanStatus')?.setValidators([Validators.required])
      this.addEditForm.get('leadLoanStatus')?.updateValueAndValidity
      // this.addEditForm.get('loanAmount')?.markAsTouched()
    }

  }

  getCityData() {
    this.citiesService.getCitiesList().subscribe(res => {
      this.CityName = res.data;
    });
  }
  getLeadSourceData() {
    this.leadSourceService.getLeadSourceList().subscribe(res => {
      this.LeadSourceName = res.data;
    });
  }
  getLeadStatusData() {
    this.leadStatusService.getLeadStatusList().subscribe(res => {
      this.LeadStatusName = res.data;
      this.filterLoanStatusSelectName = this.LeadStatusName
    });
  }
  getStateData() {
    this.statesService.getStatesList().subscribe(res => {
      this.StateName = res;
    });
  }

  getLoanTypeData() {
    this.loanTypeService.getLoanTypeList().subscribe(res => {
      this.LoanTypeName = res.data;
      this.filterLoanTypeName = this.LoanTypeName
    });
  }

  getProductData() {
    this.productMasterService.getProductMasterList().subscribe(res => {
      this.ProductName = res.data
      this.filterProductName = this.ProductName
    });
  }

  getSingleData(id: any) {
    // debugger
    this.workListService.getLeadById(id).subscribe(res => {
      this.allLeadDetails = res.data;

      this.viewLeadStage = res.data.leadStage
      this.ViewleadStatus = res.data.leadStatus
      this.addEditForm.get('area')?.patchValue(res.data.pincode.areaName)
      this.AsssinedToPlaceHolder = res.data.assignTo.firstName + " " + res.data.assignTo.lastName
      this.statePlaceholderName = res.data.state.stateName
      this.cityPlaceholderName = res.data.city.cityName
      if (res.data.leadSource != null)
        this.leadSourcePlaceholderName = res.data?.leadSource?.leadSourceName

      this.addEditForm.patchValue(res.data)
      this.IFLeadCreateBySeales = res.data.createdBy
      this.getMobileNoFromRes = res.data.mobileNo
      this.getEmailNoFromRes = res.data.email
      this.dateOfBirthFormate = res.data.dateOfBirth

      this.addEditForm.get('cibilScore')?.patchValue(res.data.cibilScore)
      this.addEditForm.get('product')?.patchValue(res.data.product?.id)
      this.addEditForm.get('loanType')?.patchValue(res.data.product?.loanType?.id)
      // this.addEditForm.get('tenor')?.patchValue(Number(res.data.product?.minLoanTenure))
      // this.addEditForm.get('loanAmount')?.patchValue(Number(res.data.product?.currency))
      // console.log(res.data?.product?.minLoanTenure);

      if (res.data?.product?.minLoanTenure) {
        this.addEditForm.get('loanAmount')?.patchValue((res.data?.product?.minLoanTenure))
      } else if (res.data.loanAmount == 0) {
        this.addEditForm.get('loanAmount')?.patchValue('')
      }

      // if(res.data.loanAmount==0){
      //   console.log(1);
      //   this.addEditForm.get('loanAmount')?.patchValue('')
      // }

      // else{
      //   console.log(2);
      //   this.addEditForm.get('loanAmount')?.patchValue(res.data?.product?.minLoanTenure)
      // }

      if (res.data.user != null) {
        this.addEditForm.get('userId')?.patchValue(res.data.user.id)
        this.AsssinedToPlaceHolder = res.data.user.firstName + " " + res.data.user.lastName;
      }
      // if(this.IFLeadCreateBySeales != "Sales" && res.data.leadStage=='New'){
      //   this.LeadScheduleScreen = true
      //   this.ViewLeadScheduleScreen=false
      //   this.crateleadBtnName = 'Proceed'
      //   this.saveBtn = false;
      //   this.ReScheduledBtn = true;

      //   this.workListService.getSchduleDetailsByLeadId(id).subscribe(res => {
      //     this.allScheduleDetails=res.data

      //     const isActiveArray: any[]=[];

      //     for(let i=0;i<this.allScheduleDetails.length;i++){
      //       isActiveArray.push(this.allScheduleDetails[i].isActive)

      //     }
      //     //
      //     setTimeout(() => {
      //       if(isActiveArray.includes(true)){
      //         this.isScheduleProceed=true
      //       }
      //     }, 500);
      //   });
      // this.addEditForm.get('scheduleDate')?.setValidators([Validators.required])
      // this.addEditForm.get('scheduleDate')?.updateValueAndValidity
      // this.addEditForm.get('convenientTime')?.setValidators([Validators.required])
      // this.addEditForm.get('convenientTime')?.updateValueAndValidity
      // this.addEditForm.get('scheduledRemark')?.setValidators([Validators.required])
      // this.addEditForm.get('scheduledRemark')?.updateValueAndValidity
      // this.addEditForm.get('leadScheduleStatus')?.setValidators([Validators.required])
      // this.addEditForm.get('leadScheduleStatus')?.updateValueAndValidity
      // this.addEditForm.get('leadScheduleStatus')?.patchValue(res.data.leadStatus.id)
      // this.addEditForm.get('scheduleDate')?.markAsTouched()
      //   //this.firstname.nativeElement.focus();
      // }
      // else
      if (res.data.isPanNameValid == false) {
        if (this.data.type == 'edit') {
          this.NSDLMissMatch = true;
          this.createBtn = false;
        }

      } else if (res.data.isPanValid == false) {
        if (this.data.type == 'edit') {
          this.NSDLMissMatch = true;
          this.createBtn = false;
        }

      } else {
        if (this.IFLeadCreateBySeales == "Sales" && res.data.leadStage == 'New') {
          this.makeLeadLoanScreenLogic();
          this.leadScheduleStatusOnlyView = false
          this.addEditForm.get('leadLoanStatus')?.patchValue(res.data?.leadStatus?.id)
        }
        else if (res.data.leadStage == 'Scheduled') {

          // this.workListService.getSchduleDetailsByLeadId(id).subscribe(res => {

          //   setTimeout(() => {
          //     this.allScheduleDetails=res.data

          //     if(this.allScheduleDetails.length == 1){
          //       this.LeadScheduleScreen = false
          //       this.ViewLeadScheduleScreen=true
          //       this.ViewLeadScheduleCommentsScreen=false
          //     }else{
          //       this.LeadScheduleScreen = false
          //       this.ViewLeadScheduleScreen=false
          //       this.ViewLeadScheduleCommentsScreen=true
          //     }
          //   }, 500);

          // });

          // this.LeadScheduleScreen = false
          // this.ViewLeadScheduleScreen=true
          this.addEditForm.get('scheduleDate')?.disable()
          this.addEditForm.get('convenientTime')?.disable()
          this.addEditForm.get('scheduledRemark')?.disable()
          this.addEditForm.get('leadScheduleStatus')?.disable()
          this.leadStatusPlaceholderName = res.data?.leadStatus?.leadStatus
          this.leadScheduleStatusOnlyView = false
          this.makeLeadLoanScreenLogic();
          this.addEditForm.get('leadLoanStatus')?.patchValue(res.data?.leadStatus?.id)
        }
      }


      const fullName = res.data.firstName + " " + res.data.lastName
      this.addEditForm.get('name')?.patchValue(fullName);
      this.addEditForm.get('leadId')?.patchValue(res.data.leadId);
      this.addEditForm.get('remarkLeadLoan')?.patchValue(res.data.loanRemark);
      this.addEditForm.get('leadMaintainceStatus')?.patchValue(res.data.leadStage);
      // this.addEditForm.get('assign_To')?.patchValue('');
      //this.leadStatusLoanPlaceholderName=res.data.leadStage

      if (res.data.tenor == 0)
        this.addEditForm.get('tenor')?.patchValue('')

      if (res.data?.cibilScoreLeadLoan == 0)
        this.addEditForm.get('cibilScoreLeadLoan')?.patchValue('')

      // if(res.data.loanAmount==0){
      //   this.addEditForm.get('loanAmount')?.patchValue('')
      // }else{
      //   this.addEditForm.get('loanAmount')?.patchValue(res.data.product.minLoanTenure)
      // }


      if (res.data.convenientTime == 0)
        this.addEditForm.get('convenientTime')?.patchValue('')

      this.addEditForm.get('city')?.disable()
      this.addEditForm.get('gender')?.disable()
      this.addEditForm.get('state')?.disable()
      this.addEditForm.get('area')?.disable()
      // this.addEditForm.get('dateOfBirth')?.disable()
      this.addEditForm.get('leadId')?.disable()
      this.addEditForm.get('name')?.disable()
      this.addEditForm.get('mobileNo')?.disable()
      this.addEditForm.get('email')?.disable()
      // this.addEditForm.get('pan')?.disable()
      this.addEditForm.get('aadhar')?.disable()
      this.addEditForm.get('leadSource')?.disable()
      this.addEditForm.get('leadMaintainceStatus')?.disable()
      // this.addEditForm.get('assign_To')?.disable()
      // this.addEditForm.get('scheduleDate')?.disable()
      // this.addEditForm.get('convenientTime')?.disable()
      // this.addEditForm.get('scheduledRemark')?.disable()

      if (this.leadApprovalScreen == true) {
        if (this.IFLeadCreateBySeales != "Sales" && res.data.leadStage == 'Under process') {
          this.LeadScheduleScreen = false
          this.ViewLeadScheduleScreen = true
        } else if (this.IFLeadCreateBySeales == "Sales" && res.data.leadStage == 'Under process') {
          this.LeadLoanScreen = false
          this.ViewLeadLoanScreen = true
        }
        //this.crateleadBtnName = 'Submit';
        this.LeadLoanScreen = false
        this.ViewLeadLoanScreen = true
        if (this.addEditForm.get('leadStage')?.value == 'Under process') {
          this.leadStatusLoanPlaceholderName = res.data?.leadStatus?.leadStatus
          this.addEditForm.get('leadStage')?.patchValue('')
          this.addEditForm.get('remarkLeadLoan')?.patchValue(res.data.loanRemark)
        }

        this.addEditForm.get('scheduleDate')?.disable()
        this.addEditForm.get('convenientTime')?.disable()
        this.addEditForm.get('scheduledRemark')?.disable()
        this.addEditForm.get('leadScheduleStatus')?.disable()
        this.leadScheduleStatusOnlyView = false
        this.addEditForm.get('loanAmount')?.disable()
        this.addEditForm.get('product')?.disable()
        this.addEditForm.get('tenor')?.disable()
        this.addEditForm.get('cibilScoreLeadLoan')?.disable()
        this.addEditForm.get('remarkLeadLoan')?.disable()
        this.addEditForm.get('file_upload')?.disable()
        this.addEditForm.get('leadLoanStatus')?.disable()
        this.addEditForm.get('selectFileUpload')?.disable()
        this.addEditForm.get('loanType')?.disable()
        this.addEditForm.get('leadStage')?.setValidators([Validators.required])
        this.addEditForm.get('leadStage')?.updateValueAndValidity
        this.addEditForm.get('approvedRemark')?.setValidators([Validators.required])
        this.addEditForm.get('approvedRemark')?.updateValueAndValidity
        this.ifVerifyHideImgDesable = false;
        //     this.addEditForm.get('leadApprovedStatus')?.setValidators([Validators.required])
        // this.addEditForm.get('leadApprovedStatus')?.updateValueAndValidity


        if (this.data.type != 'view') {


          this.rejectReasonService.getRejectReasonList().subscribe(res => {
            this.RejectReasonName = res.data
          });

          // business Rule Engine -> getDeviationByLeadId

          this.workListService.getDeviationByLeadId(this.data.id).subscribe(res => {
            // console.log(res);
            if (res.data) {
              this.BussinessRuleEngineIdFlag = true;
              this.DeviationDeatilaArray = res.data;
            }
            // console.log(this.DeviationDeatilaArray);

            for (let br = 0; br < this.DeviationDeatilaArray.length; br++) {
              this.DeviationDeatilaArray[br].clickRejectBtn = false;
              this.DeviationDeatilaArray[br].clickApprovedBtn = false;
              if (this.DeviationDeatilaArray[br].rejectReason != null && this.DeviationDeatilaArray[br].isApproved == false) {
                this.DeviationDeatilaArray[br].clickRejectReasonFeild = true;
              }
              else {
                this.DeviationDeatilaArray[br].clickRejectReasonFeild = false;
              }

              // console.log(this.DeviationDeatilaArray[br]);


              this.checkDeviationTrueArray.push(this.DeviationDeatilaArray[br].isApproved);

              if (this.DeviationDeatilaArray[br].rejectedBy != null && this.DeviationDeatilaArray[br].approvedBy != null) {
                this.checkDeviationApproRejArray.push('true')
              }
              else {
                this.checkDeviationApproRejArray.push('false')
              }

              // this.checkDeviationDescriptionArray.push(this.DeviationDeatilaArray[br].description);
              // this.addEditForm.get(this.DeviationDeatilaArray[br].description)?.patchValue(this.DeviationDeatilaArray[br].isApproved)


              // if(this.DeviationDeatilaArray[br].description == 'Age' && this.DeviationDeatilaArray[br].isApproved == false){
              //   this.isBRageCheck=true;
              //   this.BRageID=this.DeviationDeatilaArray[br].id
              //   console.log(this.BRageID);

              // }
              // if(this.DeviationDeatilaArray[br].description == 'cibil_score' && this.DeviationDeatilaArray[br].isApproved == false){
              //   this.BRcibilScroreCheck=true;
              //   this.BRcibilScroreID=this.DeviationDeatilaArray[br].id
              //   console.log(this.BRcibilScroreID);
              // }
              // if(this.DeviationDeatilaArray[br].description == 'IsEmailVerified' && this.DeviationDeatilaArray[br].isApproved == false){
              //   this.BRisEmailVerifiedCheck=true;
              //   this.BRisEmailVerifiedID=this.DeviationDeatilaArray[br].id
              //   console.log(this.BRisEmailVerifiedID);
              // }
              // if(this.DeviationDeatilaArray[br].description == 'IsMobileVerified' && this.DeviationDeatilaArray[br].isApproved == false){
              //   this.BRisMobileVerifiedCheck=true;
              //   this.BRisMobileVerifiedID=this.DeviationDeatilaArray[br].id
              //   console.log(this.BRisMobileVerifiedID);
              // }
              // if(this.DeviationDeatilaArray[br].description == 'IsPanVerified' && this.DeviationDeatilaArray[br].isApproved == false){
              //   this.BRisPanlVerifiedCheck=true;
              //   this.BRisPanlVerifiedID=this.DeviationDeatilaArray[br].id
              //   console.log(this.BRisPanlVerifiedID);
              // }
            }




            // if(res.data.age == false){
            //   this.isBRageCheck=true;
            // }
            // if(res.data.cibilScore == false){
            //   this.BRcibilScroreCheck=true;
            // }
            // if(res.data.isEmailVerified == false){
            //   this.BRisEmailVerifiedCheck=true;
            // }
            // if(res.data.isMobileVerified == false){
            //   this.BRisMobileVerifiedCheck=true;
            // }
            // if(res.data.isPanVerified == false){
            //   this.BRisPanlVerifiedCheck=true;
            // }
          });

          // setTimeout(() => {
          //   console.log(this.checkDeviationTrueArray);
          // }, 500);
          // console.log(this.DeviationDeatilaArray.length)

          // if(this.DeviationDeatilaArray.length === 0 ){
          //   this.LeadApprovalArray.push({ value: '1', viewValue: 'Approved' })
          // }

          setTimeout(() => {
            if (this.DeviationDeatilaArray.length == 0) {
              this.LeadApprovalArray.push({ value: '1', viewValue: 'Approved' })
            }
          }, 400);

        }
      }
      if (this.data.type == 'view') {
        if (res.data.scheduleDate == null) {
          this.LeadScheduleScreen = false
          this.ViewLeadScheduleScreen = false
        }
        if (res.data.product == null) {
          this.LeadLoanScreen = false
          this.ViewLeadLoanScreen = false
        }
        if (res.data.approvedRemark == null) {
          this.leadApprovalScreen = false
          //this.leadScheduleStatusOnlyView=false
        }
        if (res.data.leadStage == 'Scheduled') {
          this.leadScheduleStatusOnlyView = true
        }
        this.saveBtn = false;
        this.leadStatusLoanPlaceholderName = res.data?.leadStatus?.leadStatus
        this.leadApprovedStatusOnlyViewNotEdit = true
      }
    });
  }

  viewUploadFile(id: any) {

    const dialogRef = this.dialog.open(ViewUploadedFilesComponent, {
      width: '1200px',
      data: { id: id },
      autoFocus: false,
      maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  editNotMatchFeilds(id: any, type: any) {
    const dialogRef = this.dialog.open(NotMatchFeildComponent, {
      width: '700px',
      data: { id: id },
      autoFocus: false,
      maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.addEditForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  omitCharacters(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  omitSpecialChar(event: any) {
    let k;
    k = event.charCode; //         k = event.keyCode;  (Both can be used)
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      k == 32 ||
      (k >= 48 && k <= 57)
    );
  }

  acceptChar(event: any) {
    let k;
    k = event.charCode; //         k = event.keyCode;  (Both can be used)
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      (k >= 48 && k <= 57) ||
      k == 47
      || k == 32       //accept forward slash for DL
    );
  }

  cancelAddEditForm() {
    // this.router.navigateByUrl('home/worklist', { skipLocationChange: true });
    this.dialogRef.close();
  }
  saveDataMissmatch(AllData: any) {
    // this.cdr.detectChanges();
    const _addEditFormData = this.addEditForm.value;
    setTimeout(() => {
      const today = new Date(this.addEditForm.get('dateOfBirth')?.value);
      let maxDob = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1
      );
      _addEditFormData.dateOfBirth = maxDob
      this.workListService.updateLeadPandata(this.data.id, _addEditFormData).subscribe((res: any) => {
        // console.log(res);
        setTimeout(() => {
          this.workListService.panDetailsNew(this.data.id).subscribe((res: any) => {
            // console.log(res);

            if(res?.data?.statusCode == 101){

            // if(res?.result?.dobMatch == true){
            //   this.PanDateodBirth = true
            //   this.allLeadDetails.isPanVerified = true
            // }
            // if(res?.result?.nameMatch == true){
            //   this.PANdataName = true
            // }
            this.workListService.getLeadById(this.data.id).subscribe(res => {
              this.allLeadDetails = res.data;
            });
            //

            // this.cdr.detectChanges();
            this.saveBtn = true;
            this.NSDLMissMatch = false;

            // this.addEditForm?.setErrors(null);
            // this.addEditForm.updateValueAndValidity();

            //if (AllData.leadStage == 'New') {

              // this.makeLeadLoanScreenLogic();

              this.leadScheduleStatusOnlyView = false
              this.addEditForm.get('leadLoanStatus')?.patchValue(AllData?.leadStatus?.id)


              this.LeadLoanScreen = true
              this.createBtn = true;
              // this.crateleadBtnName = 'Verify'
              this.crateleadBtnName = 'Submit'
              this.saveBtn = true;
              this.addEditForm.get('loanAmount')?.setValidators([Validators.required])
              this.addEditForm.get('loanAmount')?.markAsUntouched()
              this.addEditForm.get('loanAmount')?.updateValueAndValidity
              this.addEditForm.get('product')?.setValidators([Validators.required])
              this.addEditForm.get('product')?.updateValueAndValidity
              this.addEditForm.get('product')?.markAsUntouched()
              this.addEditForm.get('tenor')?.setValidators([Validators.required])
              this.addEditForm.get('tenor')?.updateValueAndValidity
              this.addEditForm.get('loanType')?.setValidators([Validators.required])
              this.addEditForm.get('loanType')?.updateValueAndValidity
              this.addEditForm.get('remarkLeadLoan')?.setValidators([Validators.required])
              this.addEditForm.get('remarkLeadLoan')?.updateValueAndValidity
              this.addEditForm.get('cibilScoreLeadLoan')?.setValidators([Validators.required])
              this.addEditForm.get('cibilScoreLeadLoan')?.updateValueAndValidity
              this.addEditForm.get('leadLoanStatus')?.setValidators([Validators.required])
              this.addEditForm.get('leadLoanStatus')?.updateValueAndValidity

          //  }

            }else{
              this.toastr.error('Please Enter Valid Data', '', { timeOut: 2000 });
            }


          });
        }, 10);
      });
    }, 10);


  }
  openFile() {
    this.imgFileInput.nativeElement.click()
  }
  ReScheduled() {
    if (this.addEditForm.invalid) {
      // this.addEditForm.markAllAsTouched()
      this.addEditForm.get('scheduleDate')?.markAsTouched()
      this.addEditForm.get('convenientTime')?.markAsTouched()
      this.addEditForm.get('scheduledRemark')?.markAsTouched()
      this.addEditForm.get('leadScheduleStatus')?.markAsTouched()
      return;
    }
    const _addEditFormData = this.addEditForm.value;
    this.workListService.addSchduledetails(this.data.id, _addEditFormData).subscribe(res => {
      this.toastr.success('Lead Scheduled Details Updated Successfully', '', { timeOut: 2000 });
      this.dialogRef.close();
      this.addEditForm.get('scheduleDate')?.disable()
      this.addEditForm.get('convenientTime')?.disable()
      this.addEditForm.get('scheduledRemark')?.disable()
      this.addEditForm.get('leadScheduleStatus')?.disable()
    });
  }


  createAddEditForm() {





    // this.workListService.nsdlPanCorsVarification().subscribe(res => {
    //   console.log(res);

    // });

    //     const config123 = {
    //       "pan": "BQGPA8191R",
    //       "consent": "Y",
    //       "name": "VAIBHAV SANJAY APRAJ",
    //       "dob": "07/02/1997"
    //   }
    //   const httpOptions = {
    //     headers: new HttpHeaders({
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Origin': '*',
    //         'Access-Control-Allow-Credentials': 'true',

    //         'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    //         'Access-Control-Allow-Headers': 'Special-Request-Header',
    //         'key': 'x-api-key',
    //         'value': 'NNctr6Tjrw9794gFXf3fi6zWBZ78j6Gv3UCb3y0x',
    //         'x-karza-key': 'Caji3tT5JsbndrT5',
    //     })
    // };

    //     $.post(`https://testapi.karza.in/v2/pan-authentication`,httpOptions, function(){

    //     });


    // const options = {
    //   method: 'POST',
    //   headers: {
    //     accept: 'application/json',
    //     Token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE2NzE1MzI1NTQsInBhcnRuZXJJZCI6IlBTMDA5NjUiLCJyZXFpZCI6Ijg3NjU0MzQ1NjcifQ.ohpmVSmAb051S995PvHxd9VP51c9XKXPxOhqbtxsLyk',
    //     Authorisedkey:'N2U2ZTBhMThmY2VkMDJjNTAzNDgxZDc3ZmNiM2JhYTk='
    //   },
    //   body: JSON.stringify({pannumber: 'PE95CIL06203', referenceid: '33333333'})
    // };

    // $.post('https://paysprint.in/service-api/api/v1/service/pan/verify', options,function(){
    // console.log('final pan');

    // });

    // .then(response => response.json())
    // .then(response => console.log(response))
    // .catch(err => console.error(err));


    //old pan verification

    //   let passPanVToBackend= { 'dobMatch': '', 'nameMatch': '', 'status': '', 'duplicate': '', 'leadId': this.data.id }
    //   let fullName=this.allLeadDetails.firstName+" "+this.allLeadDetails.middleName+" "+this.allLeadDetails.lastName;
    //   const config = {
    //     "pan": this.allLeadDetails.pan,
    //     "consent": "Y",
    //     "name": fullName.toUpperCase(),
    //     "dob": this.datePipe.transform(this.allLeadDetails.dateOfBirth, 'dd/MM/yyyy')
    //   }
    //   $.ajax({
    //     url: 'https://testapi.karza.in/v2/pan-authentication',
    //     type: 'POST',
    //     data: JSON.stringify(config),
    //     headers: {
    //       // 'Access-Control-Allow-Origin': 'http://192.168.0.228:9999/fintech/',
    //       // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    //       // "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
    //       'Content-Type': 'application/json',
    //       'x-karza-key': 'Caji3tT5JsbndrT5',

    //       //'Access-Control-Allow-Origin': 'http://110.227.192.222:4200',

    //       // 'Access-Control-Allow-Credentials': 'true',
    //       // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    //       // 'Access-Control-Allow-Headers': 'Special-Request-Header',
    //       // 'Authorization': undefined,//undefined tells angular to not to add this header
    //       // 'pragma': undefined,
    //       // 'cache-control': undefined,
    //       // 'if-modified-since': undefined
    //     },
    //     dataType: 'json',
    //     success: function (data: any) {
    //       console.log(data.result, Object.keys(data.result).length === 0,passPanVToBackend);

    //       if(Object.keys(data.result).length != 0){

    //         passPanVToBackend.dobMatch=data.result?.dobMatch
    //         passPanVToBackend.nameMatch=data.result?.nameMatch
    //         passPanVToBackend.status=data.result?.status
    //         passPanVToBackend.duplicate=data.result?.duplicate
    //         // passPanVToBackend.leadId=this.data.id
    //       }
    //         console.log(data);
    //     },
    //     error: function (data:any){
    //       console.log(data);
    //   }
    // });
    // setTimeout(() => {
    //   console.log(passPanVToBackend);

    //   this.workListService.addPanVerificationLog(passPanVToBackend).subscribe((res: any) => {
    //     console.log(res);
    //  });
    // }, 1000);



    //services Api

    //   this.workListService.payPrintPan().subscribe((res: any) => {
    //     console.log(res);
    //  });

    //  this.workListService.nsdlPanCorsVarification().subscribe((res: any) => {
    //   console.log(res);
    // });




    //const config1 = {pannumber: 'BQGPA8191R', referenceid: '53333393'}
    //   //ajax
    //   $.ajax({
    //     url: 'https://paysprint.in/service-api/api/v1/service/pan/verify',
    //     type: 'POST',
    //     data: JSON.stringify({pannumber: this.allLeadDetails.pan, referenceid: this.allLeadDetails.leadId}),
    //     headers: {
    //       accept: 'application/json',
    //       Token: 'eyJhbGciOiJIUzI1NiIsInR5eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE2NzIwMzM3MzksInBhcnRuZXJJZCI6IlBTMDA5NjUiLCJyZXFpZCI6IjEyMjg3NzMzMyJ9.Q6P8fxPwzsYwgO1LB79gZiIHQHY665xB3yI29ZtS6rscCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE2NzE1MzI1NTQsInBhcnRuZXJJZCI6IlBTMDA5NjUiLCJyZXFpZCI6Ijg3NjU0MzQ1NjcifQ.ohpmVSmAb051S995PvHxd9VP51c9XKXPxOhqbtxsLyk',
    //       Authorisedkey:'NN2U2ZTBhMThmY2VkMDJjNTAzNDgxZDc3ZmNiM2JhYTk=',
    //     },
    //     dataType: 'json',
    //     success: function (data: any) {
    //         console.log(data);
    //     },
    //     error: function (data:any){
    //       console.log(data);
    //   }
    // });




    // //paysprint website code
    // const options ={
    //   method:'POST',
    //   headers: {
    //     accept: 'application/json',
    //          Token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE2NzE1MzI1NTQsInBhcnRuZXJJZCI6IlBTMDA5NjUiLCJyZXFpZCI6Ijg3NjU0MzQ1NjcifQ.ohpmVSmAb051S995PvHxd9VP51c9XKXPxOhqbtxsLyk',
    //          Authorisedkey:'N2U2ZTBhMThmY2VkMDJjNTAzNDgxZDc3ZmNiM2JhYTk=',
    //          'Content-Type': 'application/json'
    //   },
    //   body:JSON.stringify({pannumber: this.allLeadDetails.pan, referenceid: this.allLeadDetails.leadId}),
    // };

    // fetch('https://paysprint.in/service-api/api/v1/service/pan/verify',options)
    // .then(respose=>console.log(respose.json()))
    // .then(respose=>console.log(respose))
    // .catch(err=>console.error(err))

    // const xhr = new XMLHttpRequest();
    // xhr.open("POST", "https://paysprint.in/service-api/api/v1/service/pan/verify");
    // xhr.setRequestHeader("X-PINGOTHER", "pingpong");
    // xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.setRequestHeader("Authorisedkey", "N2U2ZTBhMThmY2VkMDJjNTAzNDgxZDc3ZmNiM2JhYTk=");
    // xhr.setRequestHeader("Token", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE2NzE1MzI1NTQsInBhcnRuZXJJZCI6IlBTMDA5NjUiLCJyZXFpZCI6Ijg3NjU0MzQ1NjcifQ.ohpmVSmAb051S995PvHxd9VP51c9XKXPxOhqbtxsLyk');


    // xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:4200 | *");
    // xhr.setRequestHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    // xhr.setRequestHeader("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type");
    // xhr.setRequestHeader("Access-Control-Max-Age", "86400");
    // xhr.setRequestHeader("Vary", "origin");
    // xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");

    // // xhr.onreadystatechange = handler;

    // xhr.onreadystatechange = (event) => { }
    // xhr.send(JSON.stringify({pannumber: this.allLeadDetails.pan, referenceid: this.allLeadDetails.leadId}));















    // console.log(this.addEditForm)
    //  debugger
    // console.log(this.addEditForm.value)

    // if (this.addEditForm.invalid) {
    //   this.addEditForm.markAllAsTouched()
    //   return;
    // }
    //if(!this.leadApprovalScreen){
    if ((this.salesRole == true && this.creditRole == true) || this.salesRole == true) {
      if (this.LeadLoanScreen == false) {
        if (this.addEditForm.invalid) {
          // this.addEditForm.markAllAsTouched()
          this.addEditForm.get('scheduleDate')?.markAsTouched()
          this.addEditForm.get('convenientTime')?.markAsTouched()
          this.addEditForm.get('scheduledRemark')?.markAsTouched()
          this.addEditForm.get('leadScheduleStatus')?.markAsTouched()
          return;
        }
        const _addEditFormData = this.addEditForm.value;
        if (this.data.type == 'edit') {
          // _addEditFormData.isActive=false;
          // _addEditFormData.lead_id=this.data.id;
          // _addEditFormData.leadStatus_id=this.addEditForm.get('leadScheduleStatus')?.value;
          this.workListService.updateLeadmaintance(this.data.id, _addEditFormData).subscribe(res => {
            this.toastr.success('Lead Proceed to Loan Successfully', '', { timeOut: 2000 });
            // this.router.navigateByUrl('home/worklist', { skipLocationChange: true });

            // this.dialogRef.close();
            this.addEditForm.get('scheduleDate')?.disable()
            this.addEditForm.get('convenientTime')?.disable()
            this.addEditForm.get('scheduledRemark')?.disable()
            this.addEditForm.get('leadScheduleStatus')?.disable()

            // console.log(this.allScheduleDetails);

            // this.workListService.getSchduleDetailsByLeadId(this.data.id).subscribe(res => {
            //   setTimeout(() => {
            //     this.allScheduleDetails=res.data
            //   }, 500);
            // });

            // console.log(this.allScheduleDetails);


            // if(this.allScheduleDetails.length == 1){
            //   this.LeadScheduleScreen = false
            //   this.ViewLeadScheduleScreen=true
            //   this.ViewLeadScheduleCommentsScreen=false
            // }else{
            //   this.LeadScheduleScreen = false
            //   this.ViewLeadScheduleScreen=false
            //   this.ViewLeadScheduleCommentsScreen=true
            // }
            this.leadScheduleStatusOnlyView = false
            this.makeLeadLoanScreenLogic();
            this.ReScheduledBtn = false;
          });
        }
        //this.makeLeadLoanScreenLogic();
      }

      // else if (this.VerifyBtnDiv == true) {
      else if (this.LeadLoanScreen == true) {

        if (this.addEditForm.invalid) {
          this.addEditForm.markAllAsTouched()
          return;
        }
        this.addEditForm.get('leadStage')?.patchValue('Under Process');
        const _addEditFormData = this.addEditForm.value;
        // _addEditFormData.file_upload=this.imagUploadArray
        _addEditFormData.loanAmount = this.addEditForm.get('loanAmount')?.value
        _addEditFormData.product = this.addEditForm.get('product')?.value
        _addEditFormData.tenor = this.addEditForm.get('tenor')?.value
        _addEditFormData.cibilScoreLeadLoan = this.addEditForm.get('cibilScoreLeadLoan')?.value
        _addEditFormData.remarkLeadLoan = this.addEditForm.get('remarkLeadLoan')?.value
        _addEditFormData.leadLoanStatus = this.addEditForm.get('leadLoanStatus')?.value

        if (this.data.type == 'edit') {
          // && this.emailVerifyBtn == true && this.mobileVerifyBtn == true
          _addEditFormData.isMobileVerified = true
          // _addEditFormData.isEmailVerified=true

          this.workListService.updateWorklist(this.data.id, _addEditFormData).subscribe(res => {
            this.toastr.success('Lead Loan Details Updated Successfully', '', { timeOut: 2000 });
            // this.router.navigateByUrl('home/worklist', { skipLocationChange: true });


            //file upload
            if (this.myFiles.length != 0) {
              this.workListService.fileUpload(this.data.id, this.myFiles).subscribe(res => {
              });
            }



            //NSDL Verification
            //   let passPanVToBackend= { 'dobMatch': '', 'nameMatch': '', 'status': '', 'duplicate': '', 'leadId': this.data.id }
            //   let fullName=this.allLeadDetails.firstName+" "+this.allLeadDetails.middleName+" "+this.allLeadDetails.lastName;
            //   const config = {
            //     "pan": this.allLeadDetails.pan,
            //     "consent": "Y",
            //     "name": fullName.toUpperCase(),
            //     "dob": this.datePipe.transform(this.allLeadDetails.dateOfBirth, 'dd/MM/yyyy')
            //   }
            //   $.ajax({
            //     url: 'https://testapi.karza.in/v2/pan-authentication',
            //     type: 'post',
            //     data: JSON.stringify(config),
            //     headers: {
            //       'Content-Type': 'application/json',
            //       'x-karza-key': 'Caji3tT5JsbndrT5',

            //       // 'Access-Control-Allow-Origin': 'https://testapi.karza.in | *',
            //       // 'Access-Control-Allow-Credentials': 'true',
            //       // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
            //       // 'Access-Control-Allow-Headers': 'Special-Request-Header',
            //     },
            //     dataType: 'json',
            //     success: function (data: any) {
            //       // console.log(data.result, Object.keys(data.result).length === 0,passPanVToBackend);

            //       if(Object.keys(data.result).length != 0){

            //         passPanVToBackend.dobMatch=data.result?.dobMatch
            //         passPanVToBackend.nameMatch=data.result?.nameMatch
            //         passPanVToBackend.status=data.result?.status
            //         passPanVToBackend.duplicate=data.result?.duplicate

            //       }
            //         // console.log(data);
            //     },
            //     error: function (data:any){
            //       console.log(data);
            //   }
            // });
            // setTimeout(() => {
            //   //  console.log(passPanVToBackend);

            //   this.workListService.addPanVerificationLog(passPanVToBackend).subscribe((res: any) => {
            //     // console.log(res);
            //  });
            // }, 1200);


            // // paysprint Wesite Code
            // const options ={
            //   method:'POST',
            //   headers: {
            //     accept: 'application/json',
            //          Token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE2NzE1MzI1NTQsInBhcnRuZXJJZCI6IlBTMDA5NjUiLCJyZXFpZCI6Ijg3NjU0MzQ1NjcifQ.ohpmVSmAb051S995PvHxd9VP51c9XKXPxOhqbtxsLyk',
            //          Authorisedkey:'N2U2ZTBhMThmY2VkMDJjNTAzNDgxZDc3ZmNiM2JhYTk=',
            //          'Content-Type': 'application/json'
            //   },
            //   body:JSON.stringify({pannumber: this.allLeadDetails.pan, referenceid: this.allLeadDetails.leadId}),
            // };

            // fetch('https://paysprint.in/service-api/api/v1/service/pan/verify',options)
            // .then(respose=>respose.json())
            // .then(respose=>console.log(respose))
            // .catch(err=>console.error(err))

            // // NSDL Pan Verifed Api

            // setTimeout(() => {
            //   this.workListService.panDetailsNew(this.data.id).subscribe((res: any) => {
            //     // console.log(res);

            //
            setTimeout(() => {
              //business Rule Engine
              this.workListService.getBussinessRuleEngineId(this.data.id).subscribe(res => {
                //  console.log(res);
                // this.dialogRef.close();
              });
              this.dialogRef.close();
            }, 10);

            // });
            // }, 10);


            // //
            // setTimeout(() => {
            //   //business Rule Engine
            //   this.workListService.getBussinessRuleEngineId(this.data.id).subscribe(res => {
            //     //  console.log(res);
            //     // this.dialogRef.close();
            //   });
            //   this.dialogRef.close();
            // }, 1000);

          });

        }
        // else {
        //   this.toastr.error('Please Verify', '', { timeOut: 2000 });

        //   if (this.mobileVerifyBtn == false)
        //     this.addEditForm.get('mobileNoVarification')?.setErrors({ 'incorrect': true });
        // }
      }
      else {

        // this.addEditForm.get('loanAmount')?.setValidators([Validators.required])
        // this.addEditForm.get('loanAmount')?.updateValueAndValidity
        // this.addEditForm.get('product')?.setValidators([Validators.required])
        // this.addEditForm.get('product')?.updateValueAndValidity
        // this.addEditForm.get('tenor')?.setValidators([Validators.required])
        // this.addEditForm.get('tenor')?.updateValueAndValidity
        // this.addEditForm.get('loanType')?.setValidators([Validators.required])
        // this.addEditForm.get('loanType')?.updateValueAndValidity
        // this.addEditForm.get('remarkLeadLoan')?.setValidators([Validators.required])
        // this.addEditForm.get('remarkLeadLoan')?.updateValueAndValidity
        // this.addEditForm.get('cibilScoreLeadLoan')?.setValidators([Validators.required])
        // this.addEditForm.get('cibilScoreLeadLoan')?.updateValueAndValidity
        // this.addEditForm.get('leadLoanStatus')?.setValidators([Validators.required])
        // this.addEditForm.get('leadLoanStatus')?.updateValueAndValidity

        if (this.addEditForm.invalid) {
          this.addEditForm.get('loanAmount')?.markAsTouched()
          this.addEditForm.get('product')?.markAsTouched()
          this.addEditForm.get('tenor')?.markAsTouched()
          this.addEditForm.get('cibilScoreLeadLoan')?.markAsTouched()
          this.addEditForm.get('remarkLeadLoan')?.markAsTouched()
          this.addEditForm.get('file_upload')?.markAsTouched()
          this.addEditForm.get('leadLoanStatus')?.markAsTouched()
          this.addEditForm.get('loanType')?.markAsTouched()
          return;
        }

        // for (let j = 0; j < this.urls.length; j++) {
        //   console.log(this.fileName);
        //   this.imagUploadArray.push({ 'fileName': this.fileName[j], 'data': this.urls[j] ,'fileType':this.imgUpoladFiletype[j]})
        // }
        // console.log(this.imagUploadArray);

        this.VerifyBtnDiv = true;
        this.crateleadBtnName = 'Submit';
        this.addEditForm.get('scheduleDate')?.disable()
        this.addEditForm.get('convenientTime')?.disable()
        this.addEditForm.get('scheduledRemark')?.disable()
        this.addEditForm.get('leadScheduleStatus')?.disable()
        this.addEditForm.get('loanAmount')?.disable()
        this.addEditForm.get('product')?.disable()
        this.addEditForm.get('tenor')?.disable()
        this.addEditForm.get('loanType')?.disable()
        this.addEditForm.get('cibilScoreLeadLoan')?.disable()
        this.addEditForm.get('remarkLeadLoan')?.disable()
        this.addEditForm.get('file_upload')?.disable()
        this.addEditForm.get('leadLoanStatus')?.disable()
        this.addEditForm.get('selectFileUpload')?.disable()

        this.addEditForm.get('mobileNoVarification')?.setValidators([Validators.required])
        this.addEditForm.get('mobileNoVarification')?.updateValueAndValidity

        this.ifVerifyHideImgDesable = false;
        // this.addEditForm.get('emailIdVarification')?.setValidators([Validators.required])
        // this.addEditForm.get('emailIdVarification')?.updateValueAndValidity
        // this.addEditForm.get('leadApprovedStatus')?.setValidators([Validators.required])
        // this.addEditForm.get('leadApprovedStatus')?.updateValueAndValidity


        // this.workListService.mobileNoVarification(this.data.id, this.getMobileNoFromRes).subscribe(res => {
        //   this.toastr.success(res.message,'', { timeOut: 2000 });
        //   // const textmassage = 'Enter OTP '+ res.data +' to login into KFSL portal which is for one time use only and within 5 minutes from the time of the request. NEVER SHARE THE OTP WITH ANYONE';
        //   // // this.workListService.mobileNoSentOTPVarification(textmassage, this.getMobileNoFromRes).subscribe(res => {
        //   // // });
        //   // $.post(`https://push3.aclgateway.com/servlet/com.aclwireless.pushconnectivity.listeners.TextListener?userId=karvyalt&pass=karvyalt2&appid=karvyalt&subappid=karvyalt&contenttype=1&to=`+this.getMobileNoFromRes+`&from=KARVYF&text=`+textmassage+`&selfid=true&alert=1&dlrreq=true&intflag=false`, function(){
        //   //   //alert("Data: ");
        //   //   // console.log('SMS Send');
        //   // });
        // });

        //hide for sir told

        // setTimeout(() => {
        //   this.workListService.mobileOtpCheck(this.data.id).subscribe((res: any) => {
        //     // console.log(res);
        //   });
        // }, 200);
      }
    }
    //
    // if(this.leadApprovalScreen){
    else if (this.creditRole == true) {

      if (this.data.type == 'edit') {

        // console.log(this.DeviationDeatilaArray);
        // console.log(this.addEditForm);

        this.rejectReasonElementId?.control.markAsTouched(),
          this.rejectReasonElementId?.control.updateValueAndValidity();

        // let deviationDecision
        let deviationDecisionArray: any = []
        for (let d = 0; d < this.DeviationDeatilaArray.length; d++) {
          deviationDecisionArray.push(this.DeviationDeatilaArray[d].isApproved)
        }
        setTimeout(() => {
          // const deviationDecisionArrayAJ = deviationDecisionArray.every((val: any, i: any, arr: any) => val === true)
          // const deviationDecisionArrayAJF = deviationDecisionArray.some((val: any, i: any, arr: any) => val === false)
          // console.log(deviationDecisionArray);

          if (deviationDecisionArray.includes(null)) {
            this.toastr.warning('Please Select Deviation !!!', '', { timeOut: 2000 });
            return;
          }
          else if (deviationDecisionArray.includes(false)) {
            // console.log(this.DeviationDeatilaArray);
            // console.log(this.addEditForm);
            this.addEditForm.get('leadStage')?.patchValue('Reject');
          }
          else if (deviationDecisionArray.includes(true)) {
            // console.log(this.DeviationDeatilaArray);
            // console.log(this.addEditForm);
            this.addEditForm.get('leadStage')?.patchValue('Approved');
          }


        }, 200);
        // this.checkvalidation('leadStage', this.addEditForm.get('leadStage')?.value)
        // this.checkvalidation('remark', this.addEditForm.get('remark')?.value)
        if (this.rejectReasonElementId?.control.invalid) {
          this.toastr.warning('Please Select Reject Reason', '', { timeOut: 2000 });
          return;
        }

        if (this.addEditForm.invalid) {
          this.addEditForm.markAllAsTouched()
          return;
        }

        setTimeout(() => {
          this.workListService.updateDeviation(this.DeviationDeatilaArray).subscribe(res => {
          });
          this.workListService.updateLeadApproval(this.data.id, _addEditFormData).subscribe(res => {
            this.toastr.success('Lead Approval Details Updated Successfully', '', { timeOut: 2000 });
            this.dialogRef.close();
          });
        }, 200);

        // this.addEditForm.get('leadStage')?.setValidators([Validators.required])
        // this.addEditForm.get('leadStage')?.updateValueAndValidity
        // this.addEditForm.get('remark')?.setValidators([Validators.required])
        // this.addEditForm.get('remark')?.updateValueAndValidity

        const _addEditFormData = this.addEditForm.value;


        // if (this.data.type == 'edit') {

        //   // console.log(this.checkDeviationTrueArray);

        //   let checkDeviationvariable: boolean = true
        //   // let checkDeviationDescriptionArrayTureFalse:any=[]
        //   // for(let des=0;des<this.checkDeviationDescriptionArray.length;des++){
        //   //   checkDeviationDescriptionArrayTureFalse.push(this.addEditForm.get(this.checkDeviationDescriptionArray[des])?.value)
        //   // }
        //   // for(let br=0; br < checkDeviationDescriptionArrayTureFalse.length ; br++){
        //   //   if(checkDeviationDescriptionArrayTureFalse[br] == false){
        //   //     checkDeviationvariable=false
        //   //   }
        //   // }
        //   for (let br = 0; br < this.checkDeviationTrueArray.length; br++) {
        //     if (this.checkDeviationTrueArray[br] == false) {
        //       checkDeviationvariable = false
        //     }
        //   }

        //   const ifCheckBoxValueTrue = this.checkDeviationTrueArray.some((val: any, i: any, arr: any) => val === true)

        //   console.log(ifCheckBoxValueTrue);
        //   // setTimeout(() => {

        //   // console.log(checkDeviationvariable);
        //   // if(this.addEditForm.get('leadStage')?.value == 'Reject'){

        //   // if (checkDeviationvariable == true) {
        //     if (ifCheckBoxValueTrue == true) {
        //     // if(!this.checkDeviationTrueArray.includes(true)){

        //     // console.log(this.PassDeviationDeatilaArrayChecked);
        //     // console.log(this.addEditForm.get('leadStage')?.value);

        //     if (this.addEditForm.get('leadStage')?.value == 'Approved') {
        //       for (let ap = 0; ap < this.PassDeviationDeatilaArrayChecked.length; ap++) {
        //         this.PassDeviationDeatilaArrayChecked[ap].approvedBy = this.userDetailAtoBValue.id
        //         this.PassDeviationDeatilaArrayChecked[ap].rejectedBy = 0
        //       }
        //     } else if (this.addEditForm.get('leadStage')?.value == 'Reject') {
        //       for (let ap = 0; ap < this.PassDeviationDeatilaArrayChecked.length; ap++) {
        //         this.PassDeviationDeatilaArrayChecked[ap].rejectedBy = this.userDetailAtoBValue.id
        //         this.PassDeviationDeatilaArrayChecked[ap].approvedBy = 0
        //       }
        //     }

        //     // setTimeout(() => {
        //     //   $.put(environment.baseUrl+`api/v1/updateDeviations`,this.PassDeviationDeatilaArrayChecked, function(){
        //     //   });
        //     // }, 300);


        //     // setTimeout(() => {
        //     //   for(let ap=0; ap< this.PassDeviationDeatilaArrayChecked.length; ap++){
        //     //     console.log(this.PassDeviationDeatilaArrayChecked[ap].id,this.PassDeviationDeatilaArrayChecked[ap].approvedBy,this.PassDeviationDeatilaArrayChecked[ap].isApproved,this.PassDeviationDeatilaArrayChecked[ap].rejectedBy);

        //     //   this.workListService.updateDeviation2(this.PassDeviationDeatilaArrayChecked[ap].id,this.PassDeviationDeatilaArrayChecked[ap].approvedBy,this.PassDeviationDeatilaArrayChecked[ap].isApproved,this.PassDeviationDeatilaArrayChecked[ap].rejectedBy).subscribe(res => {
        //     //   });
        //     // }
        //     // }, 200);


        //     // console.log(JSON.stringify(this.PassDeviationDeatilaArrayChecked));

        //     setTimeout(() => {
        //       this.workListService.updateDeviation(this.PassDeviationDeatilaArrayChecked).subscribe(res => {
        //       });
        //       this.workListService.updateLeadApproval(this.data.id, _addEditFormData).subscribe(res => {
        //         this.toastr.success('Lead Approval Details Updated Successfully', '', { timeOut: 2000 });
        //         this.dialogRef.close();
        //       });
        //     }, 200);

        //     // console.log(JSON.parse(JSON.stringify(this.PassDeviationDeatilaArrayChecked)));



        //     // console.log('got to approved stage');

        //     // console.log(Object.assign({}, this.PassDeviationDeatilaArrayChecked));
        //     // console.log(Object.assign({}, JSON.stringify(this.PassDeviationDeatilaArrayChecked)));


        //   }
        //   else {
        //     this.toastr.warning('Please Select Deviation !!!', '', { timeOut: 2000 });
        //   }
        //   // }

        //   // }, 200);
        // }
      }
    }
  }

  productSelect(id: any) {

  }

  loanTypeSelect(id: any) {
    this.loanTypeService.getLoanTypeById(id).subscribe(res => {
      this.ProductName = res.data.product
      this.filterProductName = this.ProductName
    });
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

  ngDoCheck() {
    if (this.percent == 100) {
      this.showProgressBar = false
      this.percent = 0
    }
    // else if(this.percent != 0 || this.percent != 100){
    //   this.showProgressBar=true
    // }
  }
  // onUploadFiles(files:File[]){
  //   const formData = new FormData();
  //   for( const file of files){
  //     formData.append('files',file,file.name);
  //   }
  //   this.workListService.fileUpload(this.data.id, formData).subscribe(res => {
  //     console.log(res, "imagUploadArray");
  //     //this.toastr.success(res.message,'', { timeOut: 2000 });
  //   });
  // }

  removeFile(id: any) {
    this.fileName.splice(id, 1);
    this.urls.splice(id, 1);

    this.myFiles.splice(id, 1);
    if (this.myFiles.length == 1) {
      this.displayFileCount = this.myFiles.length + " File Selected"
    }
    else if (this.myFiles.length == 0) {
      this.displayFileCount = "Select File"

    }
    else {
      this.displayFileCount = this.myFiles.length + " Files Selected"
    }

    // console.log(this.fileName.length);
    // const fileSize=this.fileName.length;
    // this.addEditForm.get('file_upload')?.patchValue(fileSize)
    this.showProgressBar = false
    this.percent = 0
  }

  addMoreImage() {
    const addMoreImage = this.addEditForm.get('file_upload') as FormArray;
    addMoreImage.push(this.fb.group({
      type: "",
      file: "",
      name: "",
    }))
  }

  //varification
  mobileVerify() {
    if (this.addEditForm.get('mobileNoVarification')?.invalid) {
      this.addEditForm.get('mobileNoVarification')?.markAsTouched()
      return;
    }
    this.workListService.mobileNoOTPVarification(this.data.id, this.addEditForm.get('mobileNoVarification')?.value).subscribe(res => {
      if (res.msgKey == 'Success') {
        this.mobileVerifyBtn = true;
        this.mobileVerifyText = 'Verified';
        this.getMobileNoFromResBtnDisable = true
        this.addEditForm.get('mobileNoVarification')?.disable()
        this.toastr.success(res.message, '', { timeOut: 2000 });
      } else {
        this.toastr.error(res.message, '', { timeOut: 2000 });
        // this.addEditForm.get('mobileNoVarification')?.setValidators([Validators.required])
        // this.addEditForm.get('mobileNoVarification')?.updateValueAndValidity
        this.addEditForm.get('mobileNoVarification')?.setErrors({ 'incorrect': true });
      }
    });
  }

  OTPChnage(event: any) {
    // console.log(event);

  }

  emailVerify() {
    // this.workListService.emailIOTPVarification(this.data.id, this.getEmailNoFromRes).subscribe(res => {
    //   console.log(res, "edit");
    this.emailVerifyBtn = true;
    this.emailVerifyText = 'Verified'
    this.getEmailNoFromResBtnDisabl = true
    this.addEditForm.get('emailIdVarification')?.disable()
    // });

  }

  //LeadApprovalChange if reject
  LeadApprovalChange(event: any, i: any) {

    if (event == 'Reject') {
      // console.log('a');
      // this.clickRejectBtn=true;
      // this.clickApprovedBtn=false;
      // this.DeviationDeatilaArray[i].clickRejectBtn=true;
      this.DeviationDeatilaArray[i].clickRejectReasonFeild = true;
      // this.RejectReasonSelect = true;
      this.DeviationDeatilaArray[i].clickRejectBtn = true;
      this.DeviationDeatilaArray[i].clickApprovedBtn = false;
      this.DeviationDeatilaArray[i].isApproved = false;
      this.DeviationDeatilaArray[i].rejectedBy = this.userDetailAtoBValue.id
      this.DeviationDeatilaArray[i].approvedBy = 0
      // this.DeviationDeatilaArray[i].rejectReason='';
      // this.addEditForm.get('rejectReason')?.setValidators([Validators.required])
      // this.addEditForm.get('rejectReason')?.updateValueAndValidity()
    }
    else {
      // console.log('b');
      // this.clickRejectBtn=false;
      // this.clickApprovedBtn=true;
      this.DeviationDeatilaArray[i].clickRejectBtn = false;
      this.DeviationDeatilaArray[i].clickApprovedBtn = true;
      // this.RejectReasonSelect = false;
      this.DeviationDeatilaArray[i].clickRejectReasonFeild = false;
      this.DeviationDeatilaArray[i].rejectReason = '';
      this.DeviationDeatilaArray[i].isApproved = true;
      this.DeviationDeatilaArray[i].approvedBy = this.userDetailAtoBValue.id
      this.DeviationDeatilaArray[i].rejectedBy = 0
      // this.addEditForm.get('rejectReason')?.clearValidators()
      // this.addEditForm.get('rejectReason')?.updateValueAndValidity()
    }
  }

  checkvalidation(contronname: any, value: any) {
    if (value == "Generated") {
      this.addEditForm.get(contronname)?.setErrors({ 'incorrect': true })
      this.addEditForm.get(contronname)?.updateValueAndValidity()
    }
  }

  sendMobileSMS(event: any) {
    // const linkHref='https://push3.aclgateway.com/servlet/com.aclwireless.pushconnectivity.listeners.TextListener?userId=karvyalt&pass=karvyalt2&appid=karvyalt&subappid=karvyalt&contenttype=1&to=7083572452&from=KARVYF&text=Enter%20OTP%201299%20to%20login%20into%20KFSL%20portal%20which%20is%20for%20one%20time%20use%20only%20and%20within%205%20minutes%20from%20the%20time%20of%20the%20request.%20NEVER%20SHARE%20THE%20OTP%20WITH%20ANYONE&selfid=true&alert=1&dlrreq=true&intflag=false'
    // location.href=linkHref, { skipLocationChange: true };
    // this.router.onSameUrlNavigation = "reload";
    // this.router.navigate([linkHref]);

    // //location.href
    // // this.sentOTP.nativeElement.href
    //  this.sentOTP.nativeElement.href='https://push3.aclgateway.com/servlet/com.aclwireless.pushconnectivity.listeners.TextListener?userId=karvyalt&pass=karvyalt2&appid=karvyalt&subappid=karvyalt&contenttype=1&to=8482806133&from=KARVYF&text=Enter%20OTP%201299%20to%20login%20into%20KFSL%20portal%20which%20is%20for%20one%20time%20use%20only%20and%20within%205%20minutes%20from%20the%20time%20of%20the%20request.%20NEVER%20SHARE%20THE%20OTP%20WITH%20ANYONE&selfid=true&alert=1&dlrreq=true&intflag=false'
    //   this.sentOTP.nativeElement.class='d-none'
    //   event.preventDefault();
    // //  event.stopPropagation();
    //  console.log(1);

    // this.workListService.mobileNoVarification(this.data.id, this.getMobileNoFromRes).subscribe(res => {
    //   this.toastr.success(res.message,'', { timeOut: 2000 });
    //   const textmassage = 'Enter OTP 4000 to login into KFSL portal which is for one time use only and within 5 minutes from the time of the request. NEVER SHARE THE OTP WITH ANYONE';
    //   this.workListService.mobileNoSentOTPVarification(textmassage, this.getMobileNoFromRes).subscribe(res => {
    //   });
    // });

    // $(".hrefCloick").click(function(){

    // $.post("https://push3.aclgateway.com/servlet/com.aclwireless.pushconnectivity.listeners.TextListener?userId=karvyalt&pass=karvyalt2&appid=karvyalt&subappid=karvyalt&contenttype=1&to=8482806133&from=KARVYF&text=Enter%20OTP%204444%20to%20login%20into%20KFSL%20portal%20which%20is%20for%20one%20time%20use%20only%20and%20within%205%20minutes%20from%20the%20time%20of%20the%20request.%20NEVER%20SHARE%20THE%20OTP%20WITH%20ANYONE&selfid=true&alert=1&dlrreq=true&intflag=false", function(){
    //   alert("Data: ");
    // });

    // });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',

        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers': 'Special-Request-Header',
        'key': 'x-api-key',
        'value': 'NNctr6Tjrw9794gFXf3fi6zWBZ78j6Gv3UCb3y0x',

      })
    };
    //   $.ajax({

    //     url: 'https://push3.aclgateway.com/servlet/com.aclwireless.pushconnectivity.listeners.TextListener?userId=karvyalt&pass=karvyalt2&appid=karvyalt&subappid=karvyalt&contenttype=1&to=8482806133&from=KARVYF&text=Enter%20OTP%208888%20to%20login%20into%20KFSL%20portal%20which%20is%20for%20one%20time%20use%20only%20and%20within%205%20minutes%20from%20the%20time%20of%20the%20request.%20NEVER%20SHARE%20THE%20OTP%20WITH%20ANYONE&selfid=true&alert=1&dlrreq=true&intflag=false',
    //     // data: myData,
    //     type: 'GET',
    //     crossDomain: true,
    //     dataType: 'jsonp',
    //     success: function() { alert("Success"); },
    //     error: function() { alert('Failed!'); },
    //     beforeSend: httpOptions
    // });
  }


  searchDropdown(searchText: any, type: any) {
    if (type == 'loanType') {
      if (searchText != '') {
        this.filterLoanTypeName = this.LoanTypeName.filter(Option => {
          return Option.loanTypeName.toLocaleLowerCase().startsWith(searchText.toLowerCase())
        })
      } else {
        this.filterLoanTypeName = this.LoanTypeName
      }
    } else if (type == 'product') {
      if (searchText != '') {
        this.filterProductName = this.ProductName.filter(Option => {
          return Option.productName.toLocaleLowerCase().startsWith(searchText.toLowerCase())
        })
      } else {
        this.filterProductName = this.ProductName
      }
    } else if (type == 'leadLoanStatus') {
      if (searchText != '') {
        this.filterLoanStatusSelectName = this.LeadStatusName.filter(Option => {
          return Option.leadStatus.toLocaleLowerCase().startsWith(searchText.toLowerCase())
        })
      } else {
        this.filterLoanStatusSelectName = this.LeadStatusName
      }
    }
  }

  /**
* Clearing search textbox value
*/
  clearSearch(event: any, type: any) {
    if (type == 'loanType') {
      event.stopPropagation();
      this.searchLoanTypeTextboxControl.patchValue('');
      this.filterLoanTypeName = this.LoanTypeName
    } else if (type == 'product') {
      event.stopPropagation();
      this.searchProductTextboxControl.patchValue('');
      this.filterProductName = this.ProductName
    } else if (type == 'leadLoanStatus') {
      event.stopPropagation();
      this.searchleadLoanStatusTextboxControl.patchValue('');
      this.filterLoanStatusSelectName = this.LeadStatusName
    }


  }

  BreCheckBoxFn(id: any, type: any, event: any) {
    //  console.log(id,type);

    // const BreCheckBoxFnValue;

    // BreCheckBoxFnValue.approvedBy=this.DeviationDeatilaArray.appId

    var isApprovedName = this.addEditForm.get(type)?.value
    //  console.log(isApprovedName);

    this.workListService.updateDeviation1(id, this.userDetailAtoBValue.id, event.checked).subscribe(res => {
      // console.log(res);
    });

  }

  BreChangeCheckBoxFn(id: any, value: any, DevId: any) {
    // console.log(id,value.checked);
    this.checkDeviationTrueArray.splice(id, 1, value.checked);
    this.PassDeviationDeatilaArrayChecked.push({ "id": DevId, "isApproved": value.checked, "approvedBy": 0, "rejectedBy": 0 })

    // this.showApprovedOnly

    // for(let br=0; br < this.checkDeviationTrueArray.length ; br++){
    //   if(this.checkDeviationTrueArray[br] == false){
    //     this.showApprovedOnly=true
    //   }
    // }

    const ifCheckBoxValueTrue = this.checkDeviationTrueArray.some((val: any, i: any, arr: any) => val === true)

    // console.log(ifCheckBoxValueTrue);

    if (ifCheckBoxValueTrue == true) {
      // this.LeadApprovalArray=[]
      // this.LeadApprovalArray.push({ value: '2', viewValue: 'Approved' })
      if (this.LeadApprovalArray.length < 2)
        this.LeadApprovalArray.push({ value: '2', viewValue: 'Approved' })
      // this.LeadApprovalArray.splice(1, 0);
      setTimeout(() => {
        this.addEditForm.get('leadStage')?.patchValue('Approved');

        this.RejectReasonSelect = false;
        this.addEditForm.get('rejectReason')?.patchValue('');
        this.addEditForm.get('rejectReason')?.clearValidators()
        this.addEditForm.get('rejectReason')?.updateValueAndValidity()
      }, 100);

      for (let i = 0; i < this.LeadApprovalArray.length; i++) {

        this.LeadApprovalArray[i]
      }
    }
    else {
      this.LeadApprovalArray.splice(1, 1);
      // this.LeadApprovalArray=[]
      // this.LeadApprovalArray.push({ value: '1', viewValue: 'Reject' })
      setTimeout(() => {
        this.addEditForm.get('leadStage')?.patchValue('Reject');

        this.RejectReasonSelect = true;
        this.addEditForm.get('rejectReason')?.setValidators([Validators.required])
        this.addEditForm.get('rejectReason')?.updateValueAndValidity()
      }, 100);
    }

  }

  focusLeadLoanStatus() {
    setTimeout(() => {
      this.searchleadLoanStatusElement?.nativeElement?.focus()
    }, 20)
  }

  focusProductSelect() {
    setTimeout(() => {
      this.searchProductElement?.nativeElement?.focus()
    }, 20)
  }

  focusLoanTypeSelect() {
    setTimeout(() => {
      this.searchLoanTypeElement?.nativeElement?.focus()
    }, 20)
  }

  reSentOTP() {
    this.ReSentOtpTimmer = true;
    this.countDown = timer(0, this.tick)
      .subscribe((res) => {
        // console.log(res);
        if (res < 60) {
          this.ReSentOtpTimmerBoleean = true
          --this.counter
        } else {
          this.ReSentOtpTimmer = false;
          this.ReSentOtpTimmerBoleean = false
          this.counter = 60;
          this.tick = 1000
          this.countDown?.unsubscribe();

        }

      })
    // this.workListService.mobileNoVarification(this.data.id, this.getMobileNoFromRes).subscribe(res => {
    //   this.toastr.success(res.message, '', { timeOut: 2000 });
    //   const textmassage = 'Enter OTP ' + res.data + ' to login into KFSL portal which is for one time use only and within 5 minutes from the time of the request. NEVER SHARE THE OTP WITH ANYONE';
    //   // this.workListService.mobileNoSentOTPVarification(textmassage, this.getMobileNoFromRes).subscribe(res => {
    //   // });

    //   $.post(`https://push3.aclgateway.com/servlet/com.aclwireless.pushconnectivity.listeners.TextListener?userId=karvyalt&pass=karvyalt2&appid=karvyalt&subappid=karvyalt&contenttype=1&to=` + this.getMobileNoFromRes + `&from=KARVYF&text=` + textmassage + `&selfid=true&alert=1&dlrreq=true&intflag=false`, function () {
    //   });

    // });

    setTimeout(() => {
      this.workListService.mobileOtpCheck(this.data.id).subscribe((res: any) => {
        // console.log(res);
      });
    }, 200);
  }

  // checkMobileAlreadyExit(event: any)
  // {
  //   // console.log(this.checkMobileNo,this.panNoCheck);
  // //  if(this.checkMobileNo.includes(this.addEditForm.get('mobileNo')?.value)){

  //     if(this.addEditForm.get('mobileNo')?.value.length != 10 && this.addEditForm.get('mobileNo')?.value.length <= 10){
  //       this.mobileMax10Error=true
  //       this.addEditForm.get('mobileNo')?.setErrors({ incorrect: true });
  //     }else if (this.checkMobileNo.includes(this.addEditForm.get('mobileNo')?.value)) {
  //       this.mobileExistError=true
  //       this.mobileMax10Error=false
  //       this.addEditForm.get('mobileNo')?.setErrors({ incorrect: true });
  //     } else {
  //       this.mobileExistError = false;
  //       this.addEditForm.get('mobileNo')?.setErrors(null);
  //     }
  // }

  checkPAnAlreadyExit(event: any) {

    var panVal = this.addEditForm.get('pan')?.value
    var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

    if (!regpan.test(panVal)) {
      this.panPatternError = true
      this.panExistError = false
      this.addEditForm.get('pan')?.setErrors({ incorrect: true });
    } else if (this.panNoCheck.includes(this.addEditForm.get('pan')?.value)) {
      this.panExistError = true
      this.panPatternError = false
      this.addEditForm.get('pan')?.setErrors({ incorrect: true });
    } else {
      this.panExistError = false;
      this.panPatternError = false
      this.addEditForm.get('pan')?.setErrors(null);
    }
  }

  saveDeviation() {
    // console.log(this.checkDeviationApproRejArray);
    // console.log(this.addEditForm);
    // console.log(this.DeviationDeatilaArray);

    this.rejectReasonElementId?.control.markAsTouched(),
      this.rejectReasonElementId?.control.updateValueAndValidity();

    // console.log(this.rejectReasonElementId);

    if (this.rejectReasonElementId?.control.invalid) {
      this.toastr.warning('Please Select Reject Reason', '', { timeOut: 2000 });
      return;
    }
    setTimeout(() => {
      this.workListService.updateDeviation(this.DeviationDeatilaArray).subscribe(res => {
        // this.workListService.updateLeadApproval(this.data.id, this.addEditForm.value).subscribe(res => {
        this.toastr.success('Deviation Saved Successfully', '', { timeOut: 2000 });
        this.dialogRef.close();
        // });
      });

    }, 200);

  }

  rejectReasonSelectionChange(i: any, rejectReason: any) {
    this.DeviationDeatilaArray[i].rejectReason = rejectReason;
  }

  ngAfterViewChecked() {
    //your code to update the model
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.countDown?.unsubscribe();
  }
}
