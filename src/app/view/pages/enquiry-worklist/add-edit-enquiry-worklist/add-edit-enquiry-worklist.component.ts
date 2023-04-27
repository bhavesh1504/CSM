import { DatePipe } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NgxHttpLoaderService } from 'ngx-http-loader';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { EnquiryStatusElement } from 'src/app/core/enquiry-status/models/enquiryStatus.model';
import { EnquiryStatusService } from 'src/app/core/enquiry-status/service/enquiryStatus.service';
import { EnquiryWorklistService } from 'src/app/core/enquiry-worklist/service/enquiry-worklist.service';
import { EnquiryService } from 'src/app/core/enquiry/service/enquiry.service';
import { CitiesElement } from 'src/app/core/geography-masters/cities/models/cities.model';
import { CitiesService } from 'src/app/core/geography-masters/cities/service/cities.service';
import { CountriesElement } from 'src/app/core/geography-masters/countries/models/countries.model';
import { CountriesService } from 'src/app/core/geography-masters/countries/service/countries.service';
import { PincodeElement } from 'src/app/core/geography-masters/pincode/models/pincode.model';
import { PincodeService } from 'src/app/core/geography-masters/pincode/service/pincode.service';
import { StatesElement } from 'src/app/core/geography-masters/states/models/states.model';
import { StatesService } from 'src/app/core/geography-masters/states/service/states.service';
import { LeadSourceElement } from 'src/app/core/lead-source/models/leadSource.model';
import { LeadSourceService } from 'src/app/core/lead-source/service/leadSource.service';
import { LeadStatusElement } from 'src/app/core/lead-status/models/leadStatus.model';
import { LeadStatusService } from 'src/app/core/lead-status/service/leadStatus.service';
import { LeadService } from 'src/app/core/lead/service/lead.service';
import { DateAdapter } from '@angular/material/core';
import { VerifyMobileComponent } from '../verify-mobile/verify-mobile.component';

@Component({
  selector: 'app-add-edit-enquiry-worklist',
  templateUrl: './add-edit-enquiry-worklist.component.html',
  styleUrls: ['./add-edit-enquiry-worklist.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddEditEnquiryWorklistComponent implements OnInit {

  @ViewChild('searchEnquiryStatus', { static: false }) searchEnquiryStatusElement!: ElementRef;

  addEditForm: FormGroup
  genderName = [
    { value: 'Male', viewValue: 'Male' },
    { value: 'Female', viewValue: 'Female' }
  ];
  salutationArray = [
    { value: '1', viewValue: 'Mr.' },
    { value: '2', viewValue: 'Mrs.' },
    { value: '3', viewValue: 'Ms.' },
    { value: '4', viewValue: 'Miss' },
    { value: '5', viewValue: 'Sir' }
  ];
  // EnquiryStatusName=[
  //   {value: '1', viewValue: 'Close'},
  //   {value: '2', viewValue: 'Convert to Lead'},
  // ];
  countryName: CountriesElement[] = [];
  StateName: StatesElement[] = [];
  CityName: CitiesElement[] = [];
  PincodeName: PincodeElement[] = [];
  LeadSourceName: LeadSourceElement[] = [];
  AssignToName: any = [];
  EnquiryStatusName: EnquiryStatusElement[] = [];

  filterEnquiryStatusName: EnquiryStatusElement[] = [];
  searchEnquiryStatusTextboxControl = new FormControl();

  queryParamData: any;
  saveBtn: boolean = true;
  createBtn: boolean = true;
  addEditHeadTitle: any;
  createAddEditBtnName = '';
  // _addEditFormData:any;
  countryPlaceHolder = 'Select Country'
  cityPlaceHolder = 'Select City'
  satetPlaceHolder = 'Select State'
  pincodePlaceHolder = 'Select Pincode'
  leadSourcePlaceHolder = 'Select Lead Source'
  AsssinedToPlaceHolder = 'Select Asssined To'
  forValue: any = ''

  userDetails: any;
  userDetailAtoBValue: any = '';
  roleArray: any = [];
  maxDob: Date;
  assignToHideForSales: boolean = true;

  ConvenientTime = [
    { value: 1, viewValue: 'Morning between 9:00 AM - 11:59 AM' },
    { value: 2, viewValue: 'Afternoon between 12:00 PM - 4:00 PM' },
    { value: 3, viewValue: 'Evening between 04:01 PM - 07:30 PM' }
  ];
  enquiryStatusPlaceholderName: any = 'Select Enquiry Status';
  allLeadDetails: any = '';

  crateleadBtnName: string = ''
  // enquiryStage='New';
  allScheduleDetails: any = []
  ViewEnquiryScheduleScreen: boolean = false;
  ViewEnquiryScheduleCommentsScreen: boolean = false;
  enguiryScheduleScreen: boolean = false
  EnquiryRemainingScreen: boolean = false
  crateleadBtnNameBtn: boolean = true
  CloseEnquiryBtn: boolean = true
  ReScheduledBtn: boolean = true;
  ViewEnquiryRemainingScreen: boolean = false
  ReScheduledBtnName = '';
  isValidAge = false;
  CountryStateDeatils: any = []

  checkArray: any[] = []
  checkLeadArray: any[] = []
  // checkMobileNo:any[]=[]
  panNoCheck: any[] = []
  panExistError: boolean = false
  panPatternError: boolean = false

  todayDate: Date = new Date();
  constructor(private toastr: ToastrService, private authService: AuthService, private pincodeService: PincodeService, private countriesService: CountriesService, private statesService: StatesService, private citiesService: CitiesService, private fb: FormBuilder, private router: Router, private enquiryWorklistService: EnquiryWorklistService, private routes: ActivatedRoute, private leadSourceService: LeadSourceService,
    public dialogRef: MatDialogRef<AddEditEnquiryWorklistComponent>, public dialog: MatDialog, private enquiryStatusService: EnquiryStatusService, private ngxhttploader: NgxHttpLoaderService, private enquiryService: EnquiryService, private leadService: LeadService,
    @Inject(MAT_DIALOG_DATA) public data: any, private dateAdapter: DateAdapter<Date>
  ) {

    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy

    const today = new Date();
    this.maxDob = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    this.addEditForm = this.fb.group({
      id: [''],
      firstName: [''],
      middleName: [''],
      lastName: [''],
      mobileNo: [''],
      product: [''],
      city: [''],
      postalCode: [''],
      enquiryID: [''],
      scheduleDate: [''],
      convenientTime: [''],
      leadScheduleStatus: [''],
      scheduledRemark: [''],
      email: [''],
      dateOfBirth: [''],
      gender: [''],
      pan: ['', Validators.compose([Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')])],
      aadhar: [''],
      userId: ['']
    })



  }

  ngOnInit(): void {

    if (this.authService.isLoggedIn()) {
      this.userDetails = sessionStorage.getItem('UserDetails')
      this.userDetailAtoBValue = JSON.parse(atob(this.userDetails));
      for (let i = 0; i < this.userDetailAtoBValue.role.length; i++) {
        this.roleArray.push(this.userDetailAtoBValue.role[i].roleName)
      }

      if (this.roleArray.includes('Sales')) {
        this.assignToHideForSales = false;
        // this.addEditForm.get('userId')?.clearValidators
        // this.addEditForm.get('userId')?.updateValueAndValidity;

        this.addEditForm.get('userId')?.patchValue(this.userDetailAtoBValue.id)
      }
    }

    this.routes.queryParams.subscribe(res => this.queryParamData = res);
    if (this.data.type == 'edit') {
      this.saveBtn = true;
      this.createBtn = true;
      this.addEditHeadTitle = 'Edit'
      this.createAddEditBtnName = 'Update'
      setTimeout(() => {
        this.getSingleData(this.data.id)
      }, 500);

    } else if (this.data.type == 'view') {
      this.addEditHeadTitle = 'View'
      this.saveBtn = false;
      this.createBtn = false;
      this.getSingleData(this.data.id);
      this.addEditForm.disable();
      this.ReScheduledBtn = false
      this.crateleadBtnNameBtn = false
      this.CloseEnquiryBtn = false
    }
    else {
      this.addEditHeadTitle = 'Update'
      this.createAddEditBtnName = 'Update'
    }

    this.addEditForm.get('city')?.disable();


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

    if (this.data.type != 'view') {
      // this.getCountryData();
      // this.getStateData();
      // this.getCityData();
      // this.getPincodeData();
      // this.getLeadSourceData();
      this.getEnquiryStatusData();
      //this.countryPlaceHolder='Select Country'

      this.enquiryService.getEnquiryList().subscribe(res => {
        this.checkArray = res.data
      });
      this.leadService.getLeadList().subscribe(res => {
        this.checkLeadArray = res.data
      });
    }
    setTimeout(() => {
      for (let i = 0; i < this.checkArray.length; i++) {
        if (this.checkArray[i].pan != null)
          this.panNoCheck.push(this.checkArray[i].pan)
      }
      for (let i = 0; i < this.checkLeadArray.length; i++) {
        if (this.checkLeadArray[i].pan != null)
          this.panNoCheck.push(this.checkLeadArray[i].pan)
      }
    }, 500);
  }

  getCountryData() {
    this.countriesService.getCountriesList().subscribe(res => {
      this.countryName = res.data;
    });
  }
  getStateData() {
    this.statesService.getStatesList().subscribe(res => {
      this.StateName = res;
    });
  }
  getCityData() {
    this.citiesService.getCitiesList().subscribe(res => {
      this.CityName = res.data;
    });
  }
  getPincodeData() {
    this.pincodeService.getPincodeList().subscribe(res => {
      this.PincodeName = res;
    });
  }
  getLeadSourceData() {
    this.leadSourceService.getLeadSourceList().subscribe(res => {
      this.LeadSourceName = res.data;
    });
  }
  getEnquiryStatusData() {
    this.enquiryStatusService.getEnquiryStatusList().subscribe(res => {
      this.EnquiryStatusName = res.data;
      this.filterEnquiryStatusName = this.EnquiryStatusName
    });
  }
  getSingleData(id: any) {
    this.enquiryWorklistService.getEnquiryWorklistById(id).subscribe(res => {

      this.addEditForm.patchValue(res.data);
      this.allLeadDetails = res.data;
      if (res.data.enquiryStage == 'New') {
        if (this.data.type == 'edit') {
          this.ReScheduledBtn = true;
          this.enguiryScheduleScreen = true

          this.crateleadBtnName = 'Proceed'
          this.ViewEnquiryScheduleScreen = false
          this.ViewEnquiryScheduleCommentsScreen = false

        }


        this.EnquiryRemainingScreen = false
        this.enquiryWorklistService.getSchduleDetailsByEnquiryId(id).subscribe(res => {
          if (res.data != null) {
            this.allScheduleDetails = res.data
            // let allScheduleDetailsLength = this.allScheduleDetails.length
            // console.log(this.allScheduleDetails[this.allScheduleDetails.length-1].scheduleDate,
            //             this.allScheduleDetails[this.allScheduleDetails.length-1].convenientTime);
            // console.log(new DatePipe('en-US').transform(this.allScheduleDetails[this.allScheduleDetails.length-1].convenientTime, 'hh:mm a'));

            // console.log(new DatePipe('en-US').transform(this.allScheduleDetails[this.allScheduleDetails.length-1].createdTime, 'dd/MM/yyyy'));

            this.addEditForm.get('scheduleDate')?.patchValue(this.allScheduleDetails[this.allScheduleDetails.length - 1]?.scheduleDate)
            this.addEditForm.get('convenientTime')?.patchValue(new DatePipe('en-US').transform(this.allScheduleDetails[this.allScheduleDetails.length - 1]?.convenientTime, 'hh:mm a'))
          }

          this.ReScheduledBtnName = this.allScheduleDetails.length == 0 ? 'Save' : 'Re-Scheduled'
        });
        this.addEditForm.get('scheduledRemark')?.setValidators([Validators.required])
        this.addEditForm.get('scheduledRemark')?.updateValueAndValidity
        this.addEditForm.get('leadScheduleStatus')?.setValidators([Validators.required])
        this.addEditForm.get('leadScheduleStatus')?.updateValueAndValidity
        this.addEditForm.get('leadScheduleStatus')?.patchValue(res.data?.enquiryStatus?.id)
        // this.addEditForm.get('scheduleDate')?.markAsTouched()
      }
      // else if(this.enquiryStage=='reScheduled'){
      //   this.ReScheduledBtn = false;
      //   this.crateleadBtnName = 'Proceed'
      //   this.enguiryScheduleScreen=true
      // }
      else if (res.data.enquiryStage == 'Scheduled') {
        this.ReScheduledBtn = false;
        this.crateleadBtnName = 'Convert to Lead'
        this.enguiryScheduleScreen = false
        // if(this.data.type=='edit'){
        // this.EnquiryRemainingScreen=true
        // }
        this.enquiryWorklistService.getSchduleDetailsByEnquiryId(id).subscribe(res => {
          this.ngxhttploader.show();
          // console.log(this.allScheduleDetails);
          // setTimeout(() => {
          if (res.data != null)
            this.allScheduleDetails = res.data
          if (this.data.type == 'edit') {
            if (this.allScheduleDetails.length == 1) {

              this.ViewEnquiryScheduleScreen = true
              this.ViewEnquiryScheduleCommentsScreen = false

            } else {

              this.ViewEnquiryScheduleScreen = false
              this.ViewEnquiryScheduleCommentsScreen = true
            }
          }

          this.ngxhttploader.hide();
          // }, 500);

        });

        this.makeEnquiryRemainingScreenLogic();
      }
    });

    if (this.data.type == 'view') {
      // this.addEditHeadTitle='View'
      // debugger
      this.saveBtn = false;
      this.createBtn = false;
      // this.addEditForm.disable();
      this.ReScheduledBtn = false
      this.crateleadBtnNameBtn = false
      this.CloseEnquiryBtn = false
      this.EnquiryRemainingScreen = false

      setTimeout(() => {
        if (this.allLeadDetails?.isConvertedToLead == true) {
          this.ViewEnquiryRemainingScreen = true
        }
      }, 1000);



      //   if(this.allScheduleDetails.length == 0){
      //     console.log(111);

      //       this.ViewEnquiryScheduleScreen=false
      //       this.ViewEnquiryScheduleCommentsScreen=false

      //  }else

      setTimeout(() => {
        if (this.allScheduleDetails.length == 1) {

          this.ViewEnquiryScheduleScreen = true
          this.ViewEnquiryScheduleCommentsScreen = false
        } else if (this.allScheduleDetails.length >= 2) {
          this.ViewEnquiryScheduleScreen = false
          this.ViewEnquiryScheduleCommentsScreen = true
        }
      }, 500);

    }
  }

  makeEnquiryRemainingScreenLogic() {
    if (this.data.type == 'edit') {
      this.EnquiryRemainingScreen = true
    }
    this.ReScheduledBtn = false;
    this.enguiryScheduleScreen = false
    this.crateleadBtnName = 'Convert to Lead'
    this.addEditForm.get('email')?.setValidators([Validators.required, Validators.email])
    this.addEditForm.get('email')?.updateValueAndValidity
    this.addEditForm.get('dateOfBirth')?.setValidators([Validators.required])
    this.addEditForm.get('dateOfBirth')?.updateValueAndValidity
    this.addEditForm.get('gender')?.setValidators([Validators.required])
    this.addEditForm.get('gender')?.updateValueAndValidity
    this.addEditForm.get('pan')?.setValidators(Validators.compose([Validators.required, Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]))
    this.addEditForm.get('pan')?.updateValueAndValidity
    // this.addEditForm.get('aadhar')?.setValidators([Validators.required])
    // this.addEditForm.get('aadhar')?.updateValueAndValidity

    this.addEditForm.get('scheduledRemark')?.removeValidators
    this.addEditForm.get('scheduledRemark')?.updateValueAndValidity
    this.addEditForm.get('leadScheduleStatus')?.removeValidators
    this.addEditForm.get('leadScheduleStatus')?.updateValueAndValidity

    this.citiesService.getAlldetailsByCityId(this.allLeadDetails.city.cityId).subscribe(res => {
      this.CountryStateDeatils = res.data;

    });
  }

  placeHolderSetValue(arrayname: any, placeholdername: any, id: any, objName: any) {

    for (let i = 0; i < arrayname.length; i++) {
      if (arrayname[i].id == id) {
        placeholdername = arrayname[i].objName
      }
    }
  }
  //selectyion change

  countrySelect(id: any) {
    this.addEditForm.get('state')?.enable();
    this.countriesService.getStateListByCountryId(id).subscribe(res => {
      this.StateName = res;
    });
    this.cityPlaceHolder = 'Select City'
    this.satetPlaceHolder = 'Select State'
    this.pincodePlaceHolder = 'Select Pincode'
    this.AsssinedToPlaceHolder = 'Select Asssined To'
  }
  stateSelect(id: any) {
    this.addEditForm.get('city')?.enable();
    this.statesService.getCityListByStateId(id).subscribe(res => {
      this.CityName = res;
    });
    this.satetPlaceHolder = 'Select State'
    this.pincodePlaceHolder = 'Select Pincode'
    this.AsssinedToPlaceHolder = 'Select Asssined To'
  }
  citySelect(id: any) {
    this.addEditForm.get('postalCode')?.enable();
    this.citiesService.getPincodeListByCityId(id).subscribe(res => {
      this.PincodeName = res;
    });
    this.pincodePlaceHolder = 'Select Pincode'
    this.AsssinedToPlaceHolder = 'Select Asssined To'
  }

  pincodeSelect(id: any) {
    this.addEditForm.get('userId')?.enable();
    this.pincodeService.getUserByPincodeId(id).subscribe(res => {
      this.AssignToName = res;
    });
    this.AsssinedToPlaceHolder = 'Select Asssined To'
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

  checkAlreadyExit(event: any) {
    // console.log(this.panNoCheck, this.addEditForm.get('pan')?.value);
    // console.log(this.panNoCheck.includes(this.addEditForm.get('pan')?.value))
    //  let perrrnn= '[A-Z]{5}[0-9]{4}[A-Z]{1}'
    //  let valurpeert =this.addEditForm.get('pan')?.value
    //  console.log(valurpeert.test(perrrnn));


    var panVal = this.addEditForm.get('pan')?.value
    var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

    // console.log(regpan.test(panVal));

    //  if (this.panNoCheck.includes(this.addEditForm.get('pan')?.value)) {
    //   this.panExistError=true
    //   this.addEditForm.get('pan')?.setErrors({ incorrect: true });
    // } else if (!this.panNoCheck.includes(this.addEditForm.get('pan')?.value)){
    //   this.panExistError = false;
    //   this.addEditForm.get('pan')?.setErrors(null);
    // }


    //  if (this.panNoCheck.includes(this.addEditForm.get('pan')?.value)) {
    //   this.panExistError=true
    //   this.panPatternError=false
    //   this.addEditForm.get('pan')?.setErrors({ incorrect: true });
    // } else if(this.addEditForm.get('pan')?.value?.match('[A-Z]{5}[0-9]{4}[A-Z]{1}')){
    //   this.panPatternError=true
    //   this.panExistError=false
    //   this.addEditForm.get('pan')?.setErrors({ incorrect: true });
    //  }else
    // {
    //   this.panExistError = false;
    //   this.addEditForm.get('pan')?.setErrors(null);
    // }

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

    //  }


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
    // this.router.navigateByUrl('home/enquiry-worklist', { skipLocationChange: true });
    this.dialogRef.close();
  }
  saveAddEditForm() {

  }
  createAddEditForm() {


    // if (this.addEditForm.invalid) {
    //   this.addEditForm.markAllAsTouched()
    //   return;
    // }
    // this.addEditForm.get('enquiryStatus')?.patchValue('Convert to Lead');

    // const _addEditFormData = this.addEditForm.value;

    if (this.data.type == 'edit') {

      if (this.EnquiryRemainingScreen == false) {

        if (this.addEditForm.invalid) {
          this.addEditForm.get('scheduledRemark')?.markAsTouched()
          this.addEditForm.get('leadScheduleStatus')?.markAsTouched()

          if (this.addEditForm.get('scheduleDate')?.invalid) {
            this.toastr.info('Please Change Enquiry Scheduled Date', '', { timeOut: 2000 });
          }
          return;
        }

        if (this.addEditForm.get('scheduledRemark')?.value != '') {
          const _addEditFormData = this.addEditForm.value;
          if (this.addEditForm.get('convenientTime')?.value != null) {
            _addEditFormData.convenientTime = this.getTime(this.addEditForm.get('convenientTime')?.value);
          }

          this.enquiryWorklistService.ProceedSchduledetails(this.data.id, _addEditFormData).subscribe(res => {
            this.toastr.success('Enquiry Scheduled Details Updated Successfully', '', { timeOut: 2000 });
            this.addEditForm.get('scheduleDate')?.disable()
            this.addEditForm.get('convenientTime')?.disable()
            this.addEditForm.get('scheduledRemark')?.disable()
            this.addEditForm.get('leadScheduleStatus')?.disable()
          });
        }
        setTimeout(() => {
          this.enquiryWorklistService.getSchduleDetailsByEnquiryId(this.data.id).subscribe(res => {
            if (res.data != null)
              this.allScheduleDetails = res.data

            setTimeout(() => {

              if (this.allScheduleDetails.length == 1) {
                this.ViewEnquiryScheduleScreen = true
                this.ViewEnquiryScheduleCommentsScreen = false
              } else {
                this.ViewEnquiryScheduleScreen = false
                this.ViewEnquiryScheduleCommentsScreen = true
              }

              this.makeEnquiryRemainingScreenLogic();

            }, 500);
          });
        }, 500);

        // setTimeout(() => {

        //   if (this.allScheduleDetails.length == 1) {
        //     this.ViewEnquiryScheduleScreen = true
        //     this.ViewEnquiryScheduleCommentsScreen = false
        //   } else {
        //     this.ViewEnquiryScheduleScreen = false
        //     this.ViewEnquiryScheduleCommentsScreen = true
        //   }

        //   this.makeEnquiryRemainingScreenLogic();

        // }, 500);






        // });

        //

        // if (this.addEditForm.invalid) {
        //   this.addEditForm.get('scheduledRemark')?.markAsTouched()
        //   this.addEditForm.get('leadScheduleStatus')?.markAsTouched()
        //   return;
        // }
        // this.enquiryWorklistService.updateEnquiryWorklistById(this.data.id,_addEditFormData).subscribe(res => {
        // this.toastr.success('Enquiry Proceed to Scheduled Successfully','', { timeOut: 2000 });

        // this.addEditForm.get('scheduledRemark')?.disable()
        // this.addEditForm.get('leadScheduleStatus')?.disable()

      }
      else {
        // console.log(this.allLeadDetails,this.addEditForm,this.CountryStateDeatils);


        if (this.addEditForm.invalid) {
          this.addEditForm.markAllAsTouched()
          return;
        }
        const _addEditFormData = this.addEditForm.value;

        const dialogRef = this.dialog.open(VerifyMobileComponent, {
          width: '500px',
          data: { mobileNo: this.allLeadDetails.mobileNo },
          autoFocus: false,
          maxHeight: '90vh',
        });

        dialogRef.afterClosed().subscribe((result: any) => {
          // this.getAllDataTable();

          if (result == 'Success') {

            const today = new Date(this.addEditForm.get('dateOfBirth')?.value);
            let maxDob = new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate() + 1
            );
            // console.log(today,maxDob);

            const config = {

              "cityId": this.allLeadDetails.city.cityId,
              "countryId": this.CountryStateDeatils.countryId,
              "pincodeId": this.allLeadDetails.pincode.id,
              "stateId": this.CountryStateDeatils.stateId,

              "area": this.allLeadDetails.pincode.areaName,

              "firstName": this.allLeadDetails.firstName,
              "middleName": this.allLeadDetails.middleName,
              "lastName": this.allLeadDetails.lastName,
              "mobileNo": this.allLeadDetails.mobileNo,
              "enquiryId": this.allLeadDetails.id,
              "product": this.allLeadDetails.product.id,
              "leadStage": 'Scheduled',

              "pan": this.addEditForm.get('pan')?.value,
              "gender": this.addEditForm.get('gender')?.value,
              // "dateOfBirth": this.addEditForm.get('dateOfBirth')?.value,
              "dateOfBirth": maxDob,
              "email": this.addEditForm.get('email')?.value,
              "aadhar": this.addEditForm.get('aadhar')?.value,
              "userId": this.addEditForm.get('userId')?.value,
              "isMobileVerified": true,
            }

            const updateWorklist = {

              "pan": this.addEditForm.get('pan')?.value,
              "gender": this.addEditForm.get('gender')?.value,
              // "dateOfBirth": this.addEditForm.get('dateOfBirth')?.value,
              "dateOfBirth": maxDob,
              "email": this.addEditForm.get('email')?.value,
              "aadhar": this.addEditForm.get('aadhar')?.value,

            }

            this.enquiryWorklistService.updateEnquiryWorklistById(this.allLeadDetails.id, updateWorklist).subscribe(res => {

              this.enquiryWorklistService.converToLead(config).subscribe(res => {
                if (res.msgKey == "Success") {
                  this.toastr.success('Enquiry Converted To Lead Successfully', '', { timeOut: 2000 });

                  setTimeout(() => {
                    this.enquiryWorklistService.panDetailsNew(res.data).subscribe((res: any) => {
                      // console.log(res);
                    });
                  }, 500);

                  this.dialogRef.close();
                }
                else {
                  this.toastr.error(res.message, '', { timeOut: 2000 });
                }

                // this.toastr.success('Enquiry Converted To Lead Successfully','', { timeOut: 2000 });

                // this.router.navigateByUrl('home/lead', { skipLocationChange: true });
                // this.autoAssignUserByRoleLead()

              });
            });
          }
        });
      }

    }
  }

  autoAssignUserByRoleLead() {
    this.enquiryWorklistService.autoAssignUserByRole(this.userDetailAtoBValue.id, this.roleArray).subscribe();
  }

  CloseEnquiry() {
    this.addEditForm.get('enquiryStatus')?.patchValue('Closed');

    this.enquiryWorklistService.CloseEnquiry(this.data.id).subscribe(res => {
      this.toastr.success('Enquiry Closed Successfully', '', { timeOut: 2000 });
      this.dialogRef.close();
    });



  }

  ConverttoLead() {
    this.addEditForm.get('enquiryStatus')?.patchValue('Converted to Lead');
    this.toastr.success('Enquiry Convert to Lead Successfully', '', { timeOut: 2000 });
    this.dialogRef.close();
  }

  ReScheduled() {
    if (this.addEditForm.invalid) {
      // this.addEditForm.markAllAsTouched()
      // this.addEditForm.get('scheduleDate')?.markAsTouched()
      // this.addEditForm.get('convenientTime')?.markAsTouched()
      this.addEditForm.get('scheduledRemark')?.markAsTouched()
      this.addEditForm.get('leadScheduleStatus')?.markAsTouched()
      return;
    }

    const _addEditFormData = this.addEditForm.value;
    if (this.addEditForm.get('convenientTime')?.value != null) {
      _addEditFormData.convenientTime = this.getTime(this.addEditForm.get('convenientTime')?.value);
    }

    this.enquiryWorklistService.addSchduledetails(this.data.id, _addEditFormData).subscribe(res => {
      this.toastr.success('Lead Scheduled Details Updated Successfully', '', { timeOut: 2000 });
      this.dialogRef.close();
      this.addEditForm.get('scheduleDate')?.disable()
      this.addEditForm.get('convenientTime')?.disable()
      this.addEditForm.get('scheduledRemark')?.disable()
      this.addEditForm.get('leadScheduleStatus')?.disable()
    });
  }

  getTime(event: any) {
    var today = new Date();
    var date = new Date(moment(today).format('DD-MMM-YYYY') + ' ' + event);
    return date?.toISOString();
  }

  searchDropdown(searchText: any, type: any) {
    if (type == 'leadScheduleStatus') {
      if (searchText != '') {
        this.filterEnquiryStatusName = this.EnquiryStatusName.filter(Option => {
          return Option.enquiryStatusName.toLocaleLowerCase().startsWith(searchText.toLowerCase())
        })
      } else {
        this.filterEnquiryStatusName = this.EnquiryStatusName
      }
    }
  }

  /**
* Clearing search textbox value
*/
  clearSearch(event: any, type: any) {
    if (type == 'leadScheduleStatus') {
      event.stopPropagation();
      this.searchEnquiryStatusTextboxControl.patchValue('');
      this.filterEnquiryStatusName = this.EnquiryStatusName
    }
  }

  focusEnquiryLoanStatus() {
    setTimeout(() => {
      this.searchEnquiryStatusElement?.nativeElement?.focus()
    }, 20)
  }

  changeDate() {

  }
}

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY'
  }
};
