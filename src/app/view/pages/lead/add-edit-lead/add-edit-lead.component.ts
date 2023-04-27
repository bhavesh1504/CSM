import { Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LeadService } from '../../../../core/lead/service/lead.service';
import { LeadElement } from '../../../../core/lead/models/lead.model'
import { StatesElement } from 'src/app/core/geography-masters/states/models/states.model';
import { StatesService } from 'src/app/core/geography-masters/states/service/states.service';
import { CitiesElement } from 'src/app/core/geography-masters/cities/models/cities.model';
import { CitiesService } from 'src/app/core/geography-masters/cities/service/cities.service';
import { CountriesElement } from 'src/app/core/geography-masters/countries/models/countries.model';
import { CountriesService } from 'src/app/core/geography-masters/countries/service/countries.service';
import { PincodeElement } from 'src/app/core/geography-masters/pincode/models/pincode.model';
import { PincodeService } from 'src/app/core/geography-masters/pincode/service/pincode.service';
import { LeadSourceElement } from 'src/app/core/lead-source/models/leadSource.model';
import { LeadSourceService } from 'src/app/core/lead-source/service/leadSource.service';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import * as moment from 'moment';
import { LeadStatusElement } from 'src/app/core/lead-status/models/leadStatus.model';
import { LeadStatusService } from 'src/app/core/lead-status/service/leadStatus.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewUploadedFilesComponent } from '../../work-list/view-uploaded-files/view-uploaded-files.component';
import { EnquiryService } from 'src/app/core/enquiry/service/enquiry.service';
import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { WorkListService } from 'src/app/core/work-list/service/work-list.service';
import { UserService } from 'src/app/core/user/service/user.service';
import { RejectReasonElement } from 'src/app/core/reject-reason/models/reject-reason.model';
import { RejectReasonService } from 'src/app/core/reject-reason/service/reject-reason.service';
import { VerifyMobileComponent } from '../verify-mobile/verify-mobile.component';
@Component({
  selector: 'app-add-edit-lead',
  templateUrl: './add-edit-lead.component.html',
  styleUrls: ['./add-edit-lead.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AddEditLeadComponent implements OnInit {
  addEditForm: FormGroup
  @ViewChild('searchPincode', { static: false }) searchPincodeElement!: ElementRef;

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

  countryName: CountriesElement[] = [];
  StateName: StatesElement[] = [];
  CityName: CitiesElement[] = [];
  PincodeName: PincodeElement[] = [];
  LeadSourceName: LeadSourceElement[] = [];
  LeadStatusName: LeadStatusElement[] = [];
  AssignToName: any = [];

  queryParamData: any;
  saveBtn: boolean = true;
  createBtn: boolean = true;
  addEditHeadTitle: any;
  createAddEditBtnName = '';
  _addEditFormData: any;
  countryPlaceHolder = 'Select Country'
  cityPlaceHolder = 'Select City'
  satetPlaceHolder = 'Select State'
  pincodePlaceHolder = 'Select Pincode'
  leadSourcePlaceHolder = 'Select Lead Source'
  AsssinedToPlaceHolder = 'Select Asssined To'
  leadStatusPlaceholderName: any = 'Open';
  forValue: any = ''

  isValidAge = false;
  userDetails: any;
  userDetailAtoBValue: any = '';
  roleArray: any = [];
  maxDob: Date;
  assignToHideForSales: boolean = true;
  allLeadDetails: any = '';
  viewLeadAllDetailsOnly: boolean = false;
  hideAddEditForm: boolean = true;
  hideOnlySealesSchecdule: boolean = true;
  salesRole: boolean = false;
  spliteRoleName: any;
  makeaRoleArray: any;
  leadCreatedByName: any = '';
  hideAssignTo: boolean = false;
  hideRejectReason: boolean = false

  filterPincodeName: PincodeElement[] = [];
  searchPincodeTextboxControl = new FormControl();

  checkArray: any[] = []
  checkLeadArray: any[] = []
  checkMobileNo: any[] = []
  panNoCheck: any[] = []

  viewDropdownSpan: boolean = false
  mobileExistError: boolean = false
  mobileMax10Error: boolean = false
  panExistError: boolean = false
  panPatternError: boolean = false

  hidePincodeDropAreaName: boolean = true;

  datePipe = new DatePipe("en-US");

  DeviationDeatilaArray: any = [];
  CreditUsernameArray: any = [];
  RejectReasonNameArray: any = [];
  CreditUsername = ''
  lastApprovalDate: any;
  RejectReasonName: any;

  VerifyBtnDiv: boolean = false;//true;

  constructor(private toastr: ToastrService, private leadStatusService: LeadStatusService, private authService: AuthService, private pincodeService: PincodeService, private countriesService: CountriesService, private statesService: StatesService, private citiesService: CitiesService, private fb: FormBuilder, private router: Router, private leadService: LeadService, private routes: ActivatedRoute, private leadSourceService: LeadSourceService,
    public dialogRef: MatDialogRef<AddEditLeadComponent>, public dialog: MatDialog, private enquiryService: EnquiryService, private rejectReasonService: RejectReasonService,
    @Inject(MAT_DIALOG_DATA) public data: any, private dateAdapter: DateAdapter<Date>, private workListService: WorkListService, private userService: UserService
  ) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy

    this.spliteRoleName = sessionStorage.getItem('role');
    this.makeaRoleArray = this.spliteRoleName?.split(',');


    for (let j = 0; j < this.makeaRoleArray.length; j++) {

      if (this.makeaRoleArray[j] == 'Sales') {
        //this.VerifyBtnDiv=true;
        this.salesRole = true
      }
    }

    const today = new Date();
    this.maxDob = new Date(
      today.getFullYear() - 18,//age more than 18
      today.getMonth(),
      today.getDate()
    );

    this.addEditForm = this.fb.group({
      id: [''],
      salutation: [''],
      firstName: ['', Validators.compose([Validators.required])],
      middleName: [''],
      lastName: [''],
      mobileNo: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(/^-?(0|[1-9]\d*)?$/),])],
      alternateMobileNo: ['', Validators.compose([Validators.maxLength(10), Validators.minLength(10), Validators.pattern(/^-?(0|[1-9]\d*)?$/),])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      dateOfBirth: ['', Validators.compose([Validators.required])],
      gender: ['', Validators.compose([Validators.required])],
      pan: ['', Validators.compose([Validators.required, Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')])],
      aadhar: [''],
      city: ['', Validators.compose([Validators.required])],
      country: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      postalCode: ['', Validators.compose([Validators.required])],
      leadSource: ['', Validators.compose([Validators.required])],
      leadStage: [''],
      userId: [''],//, Validators.compose([Validators.required])
      area: [''],
      createdBy: [''],
      leadStatus: ['']
    })

    //this.countryPlaceHolder='Select Country'
  }

  ngOnInit(): void {

    if (this.authService.isLoggedIn()) {
      this.userDetails = sessionStorage.getItem('UserDetails')
      this.userDetailAtoBValue = JSON.parse(atob(this.userDetails));
      for (let i = 0; i < this.userDetailAtoBValue.role.length; i++) {
        this.roleArray.push(this.userDetailAtoBValue.role[i].roleName)
      }
      if (this.roleArray.includes('Sales')) {
        // this
        this.assignToHideForSales = false;
        // this.addEditForm.get('userId')?.clearValidators
        // this.addEditForm.get('userId')?.updateValueAndValidity;
        this.addEditForm.get('userId')?.patchValue(this.userDetailAtoBValue.id)
        this.addEditForm.get('createdBy')?.patchValue('Sales')
        this.leadCreatedByName = 'Sales';
      }
      // if(this.roleArray.includes('Call Center'))
      // {
      //   this.addEditForm.get('createdBy')?.patchValue('Call Cente')
      // }
      // if(this.roleArray.includes('Agency'))
      // {
      //   this.addEditForm.get('createdBy')?.patchValue('Agency')
      // }

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
        this.searchPincodeElement?.nativeElement?.focus()
      }, 50)
    }

    this.routes.queryParams.subscribe(res => this.queryParamData = res);
    if (this.data.type == 'edit') {
      this.saveBtn = true;
      this.createBtn = true;
      this.addEditHeadTitle = 'Edit Lead'
      this.createAddEditBtnName = 'Submit'
      this.getDropdownData()
      setTimeout(() => {
        this.getSingleData(this.data.id)
      }, 500);

    } else if (this.data.type == 'view') {
      this.addEditHeadTitle = 'Lead Details'
      this.saveBtn = false;
      this.createBtn = false;
      this.getSingleData(this.data.id);
      this.addEditForm.disable();

      this.viewLeadAllDetailsOnly = true;
      this.hideAddEditForm = false;

      if (this.roleArray.includes('Sales')) {
        this.assignToHideForSales = true;
        this.hideOnlySealesSchecdule = false
        this.addEditForm.get('userId')?.patchValue(this.userDetailAtoBValue.id)
      }
    }
    else {
      this.addEditHeadTitle = 'Create Lead'
      // this.createAddEditBtnName='Create'
      this.createAddEditBtnName = 'Create'
      this.getDropdownData()
      // this.addEditHeadTitle='View'
      // this.saveBtn=false;
      // this.createBtn=false;
      // this.viewLeadAllDetailsOnly = true;
      // this.hideAddEditForm = false;

    }

    this.addEditForm.get('state')?.disable();
    this.addEditForm.get('country')?.disable();
    this.addEditForm.get('city')?.disable();
    this.addEditForm.get('userId')?.disable();
    this.addEditForm.get('area')?.disable();
    this.addEditForm.get('leadStatus')?.disable();


    if (this.data.type != 'view') {

      this.enquiryService.getEnquiryList().subscribe(res => {
        this.checkArray = res.data
      });

      this.leadService.getLeadList().subscribe(res => {
        this.checkLeadArray = res.data
      });
    }
    //

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
    // this.getCountryData();
    //this.getStateData();
    // this.getCityData();
    this.getPincodeData();
    this.getLeadSourceData();
    // this.getLeadStatusData();
  }

  getLeadStatusData() {
    this.leadStatusService.getLeadStatusList().subscribe(res => {
      this.LeadStatusName = res.data;
    });
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
      this.filterPincodeName = this.PincodeName
    });
  }
  getLeadSourceData() {
    this.leadSourceService.getLeadSourceList().subscribe(res => {
      this.LeadSourceName = res.data;
    });
  }
  getSingleData(id: any) {
    this.leadService.getLeadById(id).subscribe(res => {
      this.allLeadDetails = res.data;
      this.addEditForm.patchValue(res.data);

      // this.addEditForm.get('state')?.patchValue(res.data.state.stateId)
      // this.addEditForm.get('country')?.patchValue(res.data.country.countryId)

      if (res.data.user != null) {
        this.addEditForm.get('userId')?.patchValue(res.data.user.id)
        this.hideAssignTo = true;
        this.AsssinedToPlaceHolder = res.data.user.firstName + " " + res.data.user.lastName;
      }
      if (res.data.rejectReason != null) {
        this.hideRejectReason = true;
      }

      for (let i = 0; i < this.CityName.length; i++) {
        if (this.CityName[i].id == res.data.city) {
          this.cityPlaceHolder = this.CityName[i].cityName
        }
      }
      for (let i = 0; i < this.StateName.length; i++) {
        if (this.StateName[i].id == res.data.state) {
          this.satetPlaceHolder = this.StateName[i].stateName
        }
      }
      for (let i = 0; i < this.LeadSourceName.length; i++) {
        if (this.LeadSourceName[i].id == res.data.leadSource) {
          this.leadSourcePlaceHolder = this.LeadSourceName[i].leadSourceName
        }
      }

      //
      // business Rule Engine -> getDeviationByLeadId
      if (this.allLeadDetails.creditAssigned != null) {
        this.workListService.getDeviationByLeadId(this.data.id).subscribe(res => {
          // console.log(res);
          if (res.data) {
            this.DeviationDeatilaArray = res.data;

            for (let j = 0; j < this.DeviationDeatilaArray.length; j++) {
              if (true == this.DeviationDeatilaArray[j].isApproved || false == this.DeviationDeatilaArray[j].isApproved) {
                this.lastApprovalDate = this.DeviationDeatilaArray[j].lastModifiedTime
              }
            }
          }
        });
        //user List
        this.userService.getUserList().subscribe(res => {
          //delay(1000)
          this.CreditUsernameArray = res
          for (let i = 0; i < this.CreditUsernameArray.length; i++) {
            if (this.allLeadDetails.creditAssigned == this.CreditUsernameArray[i].id) {
              this.CreditUsername = this.CreditUsernameArray[i].firstName + " " + this.CreditUsernameArray[i].lastName
            }
          }
        });
        //rejectReasonService
        //  this.rejectReasonService.getRejectReasonList().subscribe(res => {
        //   this.RejectReasonNameArray = res.data

        //   for(let i=0;i<this.RejectReasonNameArray.length;i++){
        //     if(this.allLeadDetails.rejectReason == this.RejectReasonNameArray[i].id){
        //       this.RejectReasonName=this.RejectReasonNameArray[i].rejectReasonName
        //     }
        //    }

        // });

        // setTimeout(() => {

        // }, 500);
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

  placeHolderSetValue(arrayname: any, placeholdername: any, id: any, objName: any) {

    for (let i = 0; i < arrayname.length; i++) {
      if (arrayname[i].id == id) {
        placeholdername = arrayname[i].objName
      }
    }
  }
  //selectyion change

  countrySelect(id: any) {
    //this.addEditForm.get('state')?.enable();
    this.countriesService.getStateListByCountryId(id).subscribe(res => {
      this.StateName = res;


    });
    // this.cityPlaceHolder='Select City'
    // this.satetPlaceHolder='Select State'
    // this.pincodePlaceHolder='Select Pincode'
    // this.AsssinedToPlaceHolder='Select Asssined To'
  }
  stateSelect(id: any) {
    //this.addEditForm.get('city')?.enable();
    this.statesService.getCityListByStateId(id).subscribe(res => {
      this.CityName = res;
    });
    // this.satetPlaceHolder='Select State'
    // this.pincodePlaceHolder='Select Pincode'
    // this.AsssinedToPlaceHolder='Select Asssined To'
  }
  citySelect(id: any) {
    // this.addEditForm.get('postalCode')?.enable();
    this.citiesService.getPincodeListByCityId(id).subscribe(res => {
      this.PincodeName = res;
    });
    this.citiesService.getAlldetailsByCityId(id).subscribe(res => {
      // this.PincodeName=res;
      this.addEditForm.get('country')?.patchValue(res.data.countryId)
      this.addEditForm.get('state')?.patchValue(res.data.stateId)
      this.satetPlaceHolder = res.data.stateName
      this.countryPlaceHolder = res.data.countryName
    });

    // this.pincodePlaceHolder='Select Pincode'
    // this.AsssinedToPlaceHolder='Select Asssined To'
  }

  pincodeSelect(id: any) {
    const areaValue = this.PincodeName.filter(res => res.id == id)
    this.addEditForm.get('area')?.patchValue(areaValue[0].areaName)

    this.pincodeService.getPincodeById(id).subscribe(res => {

      // this.PincodeName=res;
      // this.filterPincodeName=this.PincodeName

      // this.CityPlaceholderName=res.city.cityName
      // this.addEditForm.get('cityId')?.patchValue(res.city.id)

      this.viewDropdownSpan = true

      this.cityPlaceHolder = res.city.cityName
      this.countryPlaceHolder = res.city.country.countryName
      this.satetPlaceHolder = res.city.state.stateName
      this.addEditForm.get('city')?.patchValue(res.city.cityId)
      this.addEditForm.get('country')?.patchValue(res.city.country.id)
      this.addEditForm.get('state')?.patchValue(res.city.state.id)
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

  checkMobileAlreadyExit(event: any) {
    // console.log(this.checkMobileNo,this.panNoCheck);
    //  if(this.checkMobileNo.includes(this.addEditForm.get('mobileNo')?.value)){

    if (this.addEditForm.get('mobileNo')?.value.length != 10 && this.addEditForm.get('mobileNo')?.value.length <= 10) {
      this.mobileMax10Error = true
      this.addEditForm.get('mobileNo')?.setErrors({ incorrect: true });
    } else if (this.checkMobileNo.includes(this.addEditForm.get('mobileNo')?.value)) {
      this.mobileExistError = true
      this.mobileMax10Error = false
      this.addEditForm.get('mobileNo')?.setErrors({ incorrect: true });
    } else {
      this.mobileExistError = false;
      this.addEditForm.get('mobileNo')?.setErrors(null);
    }

    //  }mobileMax10Error

    // console.log( this.mobileExistError,this.addEditForm.get('mobileNo')?.value);

  }

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
    // this.router.navigateByUrl('home/lead', { skipLocationChange: true });
    this.dialogRef.close();
  }
  saveAddEditForm() {

  }
  createAddEditForm() {

    if (this.addEditForm.invalid) {
      this.addEditForm.markAllAsTouched()
      return;
    }
    this._addEditFormData = this.addEditForm.value;
    // create temp data

    this.leadService.templead(this._addEditFormData).subscribe(res => {


      const dialogRef = this.dialog.open(VerifyMobileComponent, {
        width: '500px',
        data: { mobileNo: this.addEditForm.get('mobileNo')?.value },
        autoFocus: false,
        maxHeight: '90vh',
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        // this.getAllDataTable();

        if (result == 'Success') {

          this.addEditForm.get('leadStage')?.patchValue('New');
          this._addEditFormData = this.addEditForm.value;

          // if(this.data.type=='edit'){
          //   this.leadService.updateLeadById(this.data.id,this._addEditFormData).subscribe(res => {
          //     this.toastr.success('Lead Updated Successfully','', { timeOut: 2000 });
          //    // this.router.navigateByUrl('home/lead', { skipLocationChange: true });
          //    this.dialogRef.close();
          //   });
          // }
          // else{

          if (this.addEditForm.get('userId')?.value == '')
            this._addEditFormData.userId = 0;

          const today = new Date(this.addEditForm.get('dateOfBirth')?.value);
          let maxDob = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 1
          );
          // console.log(today,maxDob);
          this._addEditFormData.dateOfBirth = maxDob
          this._addEditFormData.city = this.addEditForm.get('city')?.value
          this._addEditFormData.country = this.addEditForm.get('country')?.value
          this._addEditFormData.state = this.addEditForm.get('state')?.value
          this._addEditFormData.area = this.addEditForm.get('area')?.value
          this._addEditFormData.createdBy = this.addEditForm.get('createdBy')?.value
          this._addEditFormData.userId = this.addEditForm.get('userId')?.value

          setTimeout(() => {
            this.leadService.createLead(this._addEditFormData).subscribe(res => {
              this.toastr.success('Lead Created Successfully', '', { timeOut: 2000 });
              // this.dialogRef.close();
              setTimeout(() => {
                this.workListService.panDetailsNew(res.data).subscribe((res: any) => {
                  // console.log(res);
                });
                this.dialogRef.close();
              }, 500);
            });
          }, 500);

        }
      });

    });
  }

  autoAssignUserByRoleLead() {
    this.leadService.autoAssignUserByRole(this.userDetailAtoBValue.id, this.roleArray).subscribe(res => {
    });
  }


  searchDropdown(searchText: any, type: any) {
    if (type == 'pincode') {
      if (searchText != '') {
        this.filterPincodeName = this.PincodeName.filter(Option => {
          return Option.areaName.toLocaleLowerCase().startsWith(searchText.toLowerCase()) || Option.pincode.toLocaleLowerCase().startsWith(searchText.toLowerCase())
        })
      } else {
        this.filterPincodeName = this.PincodeName
      }
    }
  }

  /**
* Clearing search textbox value
*/
  clearSearch(event: any, type: any) {
    if (type == 'pincode') {
      event.stopPropagation();
      this.searchPincodeTextboxControl.patchValue('');
      this.filterPincodeName = this.PincodeName
    }


  }


  pincideSelect(id: any, event: any) {
    const areaValue = this.PincodeName.filter(res => res.id == id)
    //this.areaValue=areaValue[0].areaName
    this.addEditForm.get('area')?.patchValue(areaValue[0].areaName)
    //  this.addEditForm.get('area')?.patchValue(this.areaValue)
    // this.addEditForm.get('area')?.disable();
    this.hidePincodeDropAreaName = true
    setTimeout(() => {
      this.searchPincodeElement?.nativeElement?.focus()
    }, 20)
    // event.preventDefault();
    // event.stopPropagation();
  }

  hidePincodeDropAreaNameFalse(event: any) {
    this.hidePincodeDropAreaName = false
    // event.preventDefault();
    // event.stopPropagation();
  }
  hidePincodeDropAreaNameTrue() {

    setTimeout(() => {
      this.searchPincodeElement?.nativeElement?.focus()
    }, 20)
    this.hidePincodeDropAreaName = true
    // event.preventDefault();
    // event.stopPropagation();
  }
  closeDropdown() {

  }


  closeClickOutside(event: any) {
    this.hidePincodeDropAreaName = false
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
