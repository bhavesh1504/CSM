import { Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/auth/service/auth.service';
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
import { LeadService } from 'src/app/core/lead/service/lead.service';
import { LoanTypeElement } from 'src/app/core/loan-type/models/loanType.model';
import { LoanTypeService } from 'src/app/core/loan-type/service/loanType.service';
import { ProductMasterElement } from 'src/app/core/product-master/models/ProductMaster.model';

declare var $: any;

@Component({
  selector: 'app-add-edit-enquiry',
  templateUrl: './add-edit-enquiry.component.html',
  styleUrls: ['./add-edit-enquiry.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddEditEnquiryComponent implements OnInit {
  @ViewChild('searchPincode',{ static: false }) searchPincodeElement!: ElementRef ;
  @ViewChild('searchLoanType',{ static: false }) searchLoanTypeElement!: ElementRef ;
  @ViewChild('searchProduct',{ static: false }) searchProductElement!: ElementRef ;

  addEditForm: FormGroup

  countryName:CountriesElement[]=[];
  StateName:StatesElement[]=[];
  CityName:CitiesElement[]=[];
  PincodeName:PincodeElement[]=[];
  LeadSourceName:LeadSourceElement[]=[];
  AssignToName:any=[];
  LoanTypeName:LoanTypeElement[]=[];
  ProductName:ProductMasterElement[]=[];
  queryParamData:any;
  saveBtn:boolean=true;
  createBtn:boolean=true;
  addEditHeadTitle:any;
  createAddEditBtnName='';
 // _addEditFormData:any;
   countryPlaceHolder='Select Country'
   cityPlaceHolder='Select City'
   satetPlaceHolder='Select State'
   pincodePlaceHolder='Select Pincode'
   leadSourcePlaceHolder='Select Lead Source'
   AsssinedToPlaceHolder='Select Asssined To'
   forValue:any=''


  userDetails:any;
  userDetailAtoBValue:any='';
  roleArray:any=[];
  assignToHideForSales:boolean=true;

  isMultiplePinAreaView:boolean=false;
  HidepincodeAreaEdit:boolean=true;
  PincodePlaceholdername:any="Select Pincode";
  CityPlaceholderName:any="Select City";
  SelectProductPlaceholder:any='Select Product'
  SelectLoanTypePlaceholder:any='Select Loan Type'

  // filterCityName:CitiesElement[]=[];
  // searchTextboxControl = new FormControl();

  allEnquiryDetails: any = '';
  viewEnquiryID:boolean=false;

  filterCityName:CitiesElement[]=[];
  searchCityTextboxControl = new FormControl();
  filterPincodeName:PincodeElement[]=[];
  searchPincodeTextboxControl = new FormControl();
  filterLoanTypeName:LoanTypeElement[]=[];
  searchLoanTypeTextboxControl = new FormControl();
  filterProductName:ProductMasterElement[]=[];
  searchProductTextboxControl = new FormControl();

  checkArray:any[]=[]
  checkLeadArray:any[]=[]
  checkMobileNo:any[]=[]
  // panNoCheck:any[]=[]
  mobileExistError:boolean=false
  mobileMax10Error:boolean=false
  viewDropdownSpan:boolean=false

  hidePincodeDropAreaName:boolean=true;

  constructor(private toastr: ToastrService,private authService:AuthService,private pincodeService:PincodeService,private countriesService:CountriesService,private statesService:StatesService,private citiesService:CitiesService,private fb: FormBuilder,private router: Router, private enquiryService: EnquiryService,private routes:ActivatedRoute,private leadSourceService:LeadSourceService,
    public dialogRef: MatDialogRef<AddEditEnquiryComponent>,public dialog: MatDialog,private loanTypeService:LoanTypeService, private leadService: LeadService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {

    this.addEditForm = this.fb.group({
      id:[''],
      firstName: ['', Validators.compose([Validators.required])],
      middleName: [''],
      lastName: [''],
      mobileNo: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(/^-?(0|[1-9]\d*)?$/),])],
      product: ['',Validators.compose([Validators.required])],
      cityId: ['', Validators.compose([Validators.required])],
      pincodeId: ['',Validators.compose([Validators.required])],
      loanType: ['',Validators.compose([Validators.required])],
      isClosed:[false],
      area:[''],
      // enquiryStatus: [''],

    })
    //this.getCityData();

    //this.countryPlaceHolder='Select Country'
  }

  ngOnInit(): void {

       if (this.authService.isLoggedIn()) {
      this.userDetails=sessionStorage.getItem('UserDetails')
      this.userDetailAtoBValue=JSON.parse(atob(this.userDetails));
      for(let i=0;i<this.userDetailAtoBValue.role.length;i++)
      {

        this.roleArray.push(this.userDetailAtoBValue.role[i].roleName)
      }

      if(this.roleArray.includes('Sales'))
      {
        this.assignToHideForSales=false;
        // this.addEditForm.get('userId')?.clearValidators
        // this.addEditForm.get('userId')?.updateValueAndValidity;

        this.addEditForm.get('userId')?.patchValue(this.userDetailAtoBValue.id)
      }

      this.enquiryService.getEnquiryList().subscribe(res => {
        this.checkArray=res.data
      });

      this.leadService.getLeadList().subscribe(res => {
        this.checkLeadArray=res.data
      });

    }

    this.routes.queryParams.subscribe(res=>this.queryParamData=res);
    if(this.data.type=='edit')
    {
      this.saveBtn=true;
      this.createBtn=true;
      this.addEditHeadTitle='Edit'
      this.createAddEditBtnName='Submit'
      setTimeout(() => {
        this.getSingleData(this.data.id)
      }, 500);

    }else if(this.data.type=='view'){
      this.addEditHeadTitle='View'
      this.saveBtn=false;
      this.createBtn=false;
      this.getSingleData(this.data.id);
      this.addEditForm.disable();
      this.viewEnquiryID=true;
      this.viewDropdownSpan=true
    }
    else{
      this.addEditHeadTitle='Create'
      this.createAddEditBtnName='Create'

      this.getPincodeData();
      this.getLoanTypeData()
    }

    this.addEditForm.get('cityId')?.disable();
    this.addEditForm.get('area')?.disable();
    //this.addEditForm.get('pincodeId')?.disable();


    setTimeout(() => {
      for(let i=0;i<this.checkArray.length;i++){

        this.checkMobileNo.push(this.checkArray[i].mobileNo)
        // this.panNoCheck.push(this.checkArray[i].pan)
      }
      for(let i=0;i<this.checkLeadArray.length;i++){

        this.checkMobileNo.push(this.checkLeadArray[i].mobileNo)
        // this.panNoCheck.push(this.checkLeadArray[i].pan)
      }
    }, 500);


    // console.log(this.checkMobileNo,this.panNoCheck);
    setTimeout(() => {
      this.searchLoanTypeElement?.nativeElement?.focus()
      this.searchProductElement?.nativeElement?.focus()
      }, 50)
  }

  getCountryData(){
    this.countriesService.getCountriesList().subscribe(res => {
      this.countryName=res.data;
    });
  }
  getStateData(){
    this.statesService.getStatesList().subscribe(res => {
      this.StateName=res;
    });
  }
  getCityData(){
    this.citiesService.getCitiesList().subscribe(res => {
      this.CityName=res.data;
      this.filterCityName= this.CityName
    });
  }
  getPincodeData(){
    this.pincodeService.getPincodeList().subscribe(res => {
      this.PincodeName=res;
      this.filterPincodeName=this.PincodeName
    });
  }
  getLeadSourceData(){
    this.leadSourceService.getLeadSourceList().subscribe(res => {
      this.LeadSourceName=res.data;
    });
  }
  getLoanTypeData(){
    this.loanTypeService.getLoanTypeList().subscribe(res => {
      this.LoanTypeName=res.data;
      this.filterLoanTypeName=this.LoanTypeName
    });
  }

  getSingleData(id:any){
    this.enquiryService.getEnquiryById(id).subscribe(res => {

      this.addEditForm.patchValue(res.data);
      this.allEnquiryDetails=res.data;
     // this.addEditForm.get('cityId')?.patchValue(res.data.city.cityId)
      //this.PincodePlaceholdername=res.data.pincode.pincode + " - "+res.data.pincode.areaName
      this.CityPlaceholderName=res.data.city.cityName
      this.PincodePlaceholdername=res.data.pincode.pincode
      this.SelectProductPlaceholder=res.data.product.productName
      this.SelectLoanTypePlaceholder=res.data.product.loanType.loanTypeName
      // this.SelectProductPlaceholder=
      this.addEditForm.get('cityId')?.patchValue(res.data.city.cityId)
      this.addEditForm.get('pincodeId')?.patchValue(res.data.pincode.id)
      this.addEditForm.get('area')?.patchValue(res.data.pincode.areaName)
      this.addEditForm.get('product')?.patchValue(res.data.product.id)
      this.addEditForm.get('loanType')?.patchValue(res.data.product.loanType.id)
    });
  }


  placeHolderSetValue(arrayname:any,placeholdername:any,id:any,objName:any){

    for(let i=0;i<arrayname.length;i++){
      if(arrayname[i].id == id)
      {
          placeholdername=arrayname[i].objName
      }
    }
  }
  //selectyion change

  countrySelect(id:any)
  {
    this.addEditForm.get('state')?.enable();
    this.countriesService.getStateListByCountryId(id).subscribe(res => {
      this.StateName=res;
    });
    this.cityPlaceHolder='Select City'
    this.satetPlaceHolder='Select State'
    this.pincodePlaceHolder='Select Pincode'
    this.AsssinedToPlaceHolder='Select Asssined To'
  }
  stateSelect(id:any)
  {
      this.addEditForm.get('cityId')?.enable();
      this.statesService.getCityListByStateId(id).subscribe(res => {
        this.CityName=res;
      });
      this.satetPlaceHolder='Select State'
      this.pincodePlaceHolder='Select Pincode'
      this.AsssinedToPlaceHolder='Select Asssined To'
  }
  citySelect(id:any)
  {
      // if(this.data.type=='edit')
      // {
      //   this.addEditForm.get('pincodeId')?.disable();
      //   this.HidepincodeAreaEdit=false
      //   this.toastr.warning('For Update Pincode got to Map Area/Pincode to Branch','', { timeOut: 2000 });
      // }else{
        //this.addEditForm.get('pincodeId')?.enable();
      // }

      // this.addEditForm.get('isMultiplePinArea')?.enable();
      this.citiesService.getPincodeListByCityId(id).subscribe(res => {
        this.PincodeName=res;
        this.filterPincodeName=this.PincodeName
      });
      // this.citiesService.getAlldetailsByCityId(id).subscribe(res => {
      //   console.log(res, "getAlldetailsByCityId Name");
      //  // this.PincodeName=res;
      //  this.addEditForm.get('country')?.patchValue(res.data.countryId)
      //  this.addEditForm.get('state')?.patchValue(res.data.stateId)
      //  this.PincodePlaceholdername="Select Pincode";
      //  this.addEditForm.get('area')?.patchValue('')
      //  //this.AreaPlaceholdername='Enter Area'
      // });
      //this.doReset()
     // this.useStations();
  }

  // pincodeSelect(id:any)
  // {
  //   this.addEditForm.get('userId')?.enable();
  //     this.pincodeService.getUserByPincodeId(id).subscribe(res => {
  //       this.AssignToName=res;
  //     });
  //   this.AsssinedToPlaceHolder='Select Asssined To'
  // }

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
  checkAlreadyExit(event: any)
  {
    // console.log(this.checkMobileNo,this.panNoCheck);
  //  if(this.checkMobileNo.includes(this.addEditForm.get('mobileNo')?.value)){


      if(this.addEditForm.get('mobileNo')?.value.length != 10 && this.addEditForm.get('mobileNo')?.value.length <= 10){
        this.mobileMax10Error=true
        this.addEditForm.get('mobileNo')?.setErrors({ incorrect: true });
      }else if (this.checkMobileNo.includes(this.addEditForm.get('mobileNo')?.value)) {
        this.mobileExistError=true
        this.mobileMax10Error=false
        this.addEditForm.get('mobileNo')?.setErrors({ incorrect: true });
      } else {
        this.mobileExistError = false;
        this.addEditForm.get('mobileNo')?.setErrors(null);
      }

  //  }mobileMax10Error

    // console.log( this.mobileExistError,this.addEditForm.get('mobileNo')?.value);

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

  cancelAddEditForm(){
    // this.router.navigateByUrl('home/enquiry', { skipLocationChange: true });
    this.dialogRef.close();
  }
  saveAddEditForm(){

  }
  createAddEditForm(){
  //   const config = {
  //     "pan": "BQGPA8191R",
  //     "consent": "Y",
  //     "name": "VAIBHAV SANJAY APRAJ",
  //     "dob": "07/02/1997"
  //   }
  //   $.ajax({
  //     url: 'https://testapi.karza.in/v2/pan-authentication',
  //     type: 'post',
  //     data: JSON.stringify(config),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'x-karza-key': 'Caji3tT5JsbndrT5',
  //     },
  //     dataType: 'json',
  //     success: function (data: any) {
  //         console.info(data);
  //     },
  //     error: function (data:any){
  //       console.info(data);
  //   }
  // });

    if (this.addEditForm.invalid) {
      this.addEditForm.markAllAsTouched()
      return;
    }
    //this.addEditForm.get('leadStatus')?.patchValue('New');
    const _addEditFormData = this.addEditForm.value;
    _addEditFormData.enquiryStatusId=1;
    _addEditFormData.enquiryStage='New';
    _addEditFormData.createdBy=this.userDetailAtoBValue.id;
    _addEditFormData.cityId=this.addEditForm.get('cityId')?.value
    if(this.data.type=='edit'){
      this.enquiryService.updateEnquiryById(this.data.id,_addEditFormData).subscribe(res => {
        this.toastr.success('Enquiry Updated Successfully','', { timeOut: 2000 });
        // this.router.navigateByUrl('home/enquiry', { skipLocationChange: true });
        this.dialogRef.close();
      });
    }
    else{

      this.enquiryService.createEnquiry(_addEditFormData).subscribe(res => {
       // this.autoAssignUserByRoleLead()
       this.toastr.success('Enquiry Created Successfully','', { timeOut: 2000 });
      //  this.router.navigateByUrl('home/enquiry', { skipLocationChange: true });
      this.dialogRef.close();
      });
    }


  }

  // autoAssignUserByRoleLead(){
  //   this.leadService.autoAssignUserByRole(this.userDetailAtoBValue.id,this.roleArray).subscribe();
  // }

  pincideSelect(id:any)
  {
      const areaValue =this.PincodeName.filter(res=>res.id==id)
      //this.areaValue=areaValue[0].areaName
      this.addEditForm.get('area')?.patchValue(areaValue[0].areaName)
    //  this.addEditForm.get('area')?.patchValue(this.areaValue)
     // this.addEditForm.get('area')?.disable();


    this.pincodeService.getPincodeById(id).subscribe(res => {

      // this.PincodeName=res;
      // this.filterPincodeName=this.PincodeName

      this.CityPlaceholderName=res.city.cityName
      this.addEditForm.get('cityId')?.patchValue(res.city.id)
    });
    this.hidePincodeDropAreaName=true
    setTimeout(() => {
     this.searchPincodeElement?.nativeElement?.focus()
     }, 20)
  }

  searchFocuspincode(){
    setTimeout(() => {
      this.searchPincodeElement?.nativeElement?.focus()
      }, 20)
    this.hidePincodeDropAreaName=true
  }
  loanTypeSelect(id:any){
    this.loanTypeService.getLoanTypeById(id).subscribe(res => {
      this.ProductName=res.data.product
      this.filterProductName=this.ProductName
    });
  }

  productSelect(id:any){
    if(this.filterProductName.length == 0){
      this.toastr.info('Please Select Loan Type First','', { timeOut: 2000 });
    }
  }

  searchDropdown(searchText:any,type:any){
    if(type=='city'){
      if(searchText != ''){
        this.filterCityName=this.CityName.filter(Option=>{
          return Option.cityName.toLocaleLowerCase().startsWith(searchText.toLowerCase())
        })
      }else{
        this.filterCityName=this.CityName
      }
    }else if(type=='pincode'){
      if(searchText != ''){
        this.filterPincodeName=this.PincodeName.filter(Option=>{
          return Option.areaName.toLocaleLowerCase().startsWith(searchText.toLowerCase()) ||  Option.pincode.toLocaleLowerCase().startsWith(searchText.toLowerCase())
        })
      }else{
        this.filterPincodeName=this.PincodeName
      }
    }else if(type=='loanType'){
      if(searchText != ''){
        this.filterLoanTypeName=this.LoanTypeName.filter(Option=>{
          return Option.loanTypeName.toLocaleLowerCase().startsWith(searchText.toLowerCase())
        })
      }else{
        this.filterLoanTypeName=this.LoanTypeName
      }
    }else if(type=='product'){
      if(searchText != ''){
        this.filterProductName=this.ProductName.filter(Option=>{
          return Option.productName.toLocaleLowerCase().startsWith(searchText.toLowerCase())
        })
      }else{
        this.filterProductName=this.ProductName
      }
    }
  }

      /**
   * Clearing search textbox value
   */
       clearSearch(event:any,type:any) {
        if(type=='city'){
          event.stopPropagation();
          this.searchCityTextboxControl.patchValue('');
          this.filterCityName=this.CityName
        }else if(type == 'pincode'){
          event.stopPropagation();
          this.searchPincodeTextboxControl.patchValue('');
          this.filterPincodeName=this.PincodeName
        }else if(type == 'loanType'){
          event.stopPropagation();
          this.searchLoanTypeTextboxControl.patchValue('');
          this.filterLoanTypeName=this.LoanTypeName
        }else if(type == 'product'){
          event.stopPropagation();
          this.searchProductTextboxControl.patchValue('');
          this.filterProductName=this.ProductName
        }
      }

      focusProductSelect(){
        setTimeout(() => {
          this.searchProductElement?.nativeElement?.focus()
          }, 20)
      }

      focusLoanTypeSelect(){
        setTimeout(() => {
          this.searchLoanTypeElement?.nativeElement?.focus()
          }, 20)
      }

      closeClickOutside(event:any){
        this.hidePincodeDropAreaName=false
      }

      hidePincodeDropAreaNameFalse(event:any){
        this.hidePincodeDropAreaName=false
        // event.preventDefault();
        // event.stopPropagation();
      }
}
