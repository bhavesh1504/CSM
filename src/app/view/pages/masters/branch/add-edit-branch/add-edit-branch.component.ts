import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { DualListComponent } from 'angular-dual-listbox';
import { ToastrService } from 'ngx-toastr';
import { Observable, startWith, map } from 'rxjs';
import { CitiesElement } from 'src/app/core/geography-masters/cities/models/cities.model';
import { CitiesService } from 'src/app/core/geography-masters/cities/service/cities.service';
import { CountriesElement } from 'src/app/core/geography-masters/countries/models/countries.model';
import { CountriesService } from 'src/app/core/geography-masters/countries/service/countries.service';
import { PincodeElement } from 'src/app/core/geography-masters/pincode/models/pincode.model';
import { PincodeService } from 'src/app/core/geography-masters/pincode/service/pincode.service';
import { StatesElement } from 'src/app/core/geography-masters/states/models/states.model';
import { StatesService } from 'src/app/core/geography-masters/states/service/states.service';
import { ReasonMasterElement } from 'src/app/core/reason-master/models/reason-master.model';
import { ReasonMasterService } from 'src/app/core/reason-master/service/reason-master.service';
import { BranchService } from '../../../../../core/branch/service/branch.service';

@Component({
  selector: 'app-add-edit-branch',
  templateUrl: './add-edit-branch.component.html',
  styleUrls: ['./add-edit-branch.component.css']
})
export class AddEditBranchComponent implements OnInit {

  @ViewChild('searchCity',{ static: true }) searchCityElement!: ElementRef ;
  @ViewChild('searchPincode',{ static: true }) searchPincodeElement!: ElementRef ;

  addEditForm: FormGroup
  genderName = [
    {value: 'Male', viewValue: 'Male'},
    {value: 'Female', viewValue: 'Female'}
  ];
  countryName:CountriesElement[]=[];
  StateName:StatesElement[]=[];
  CityName:CitiesElement[]=[];
  PincodeName:PincodeElement[]=[];
  RegionName:ReasonMasterElement[]=[];

  filterCityName:CitiesElement[]=[];
  searchCityTextboxControl = new FormControl();
  filterPincodeName:PincodeElement[]=[];
  searchPincodeTextboxControl = new FormControl();
  filterRegionName:ReasonMasterElement[]=[];
  searchRegionTextboxControl = new FormControl();

  branchTypeName = [
    {value: '1', viewValue: 'Area Office'},
    {value: '2', viewValue: 'Head Office'},
    {value: '3', viewValue: 'Regional Office'},
    {value: '4', viewValue: 'State Office'}
  ];
  filterBranchTypeName=this.branchTypeName;
  searchBranchTypeTextboxControl = new FormControl();

  queryParamData:any;
  saveBtn:boolean=true;
  createBtn:boolean=true;
  addEditHeadTitle:any;
  createAddEditBtnName='';
  _addEditFormData:any;
  areaValue:any=''

  selectedValues = [];
  filteredOptions: Observable<any[]> | undefined ;
  StatePlaceholdername:any='Select State';
  CountryPlaceholdername:any='Select Country';
  PincodePlaceholdername:any="Select Pincode";
  AreaPlaceholdername:any='Enter Area'
  assignedValueArray:any =[];
  checkIdHaveArray:any=[]

  tab = 1;
	keepSorted = true;
	key!: any;
	display: any;
	filter = true;
	source!: any;
	confirmed!: Array<any>;
	userAdd = '';
	disabled = false;

	sourceLeft = true;
	format: any = DualListComponent.DEFAULT_FORMAT;

	// private sourceTube: Array<string> | undefined;
	private sourceStations!: Array<any>;
	// private sourceChessmen!: Array<any>;

	// private confirmedTube!: Array<string>;
	private confirmedStations!: Array<any>;
	// private confirmedChessmen!: Array<any>;

	arrayType = [
		{ name: 'Rio Grande', detail: '(object array)', value: 'station' },
		// { name: 'Chessmen', detail: '(object array)', value: 'chess' },
		// { name: 'Underground', detail: '(string array)', value: 'tube' }
	];

	type = this.arrayType[0].value;

  isMultiplePinAreaView:boolean=false;
  HidepincodeAreaEdit:boolean=true;

  hidePincodeDropAreaName:boolean=true;

  checkBranchCodeArray:any[]=[];
  checkBranchCode:any[]=[]
  BranchCodeExistError:boolean=false

  constructor(private toastr: ToastrService,private fb: FormBuilder,private router: Router, private branchService: BranchService,private pincodeService:PincodeService,private routes:ActivatedRoute,private countriesService:CountriesService,private statesService:StatesService,private citiesService:CitiesService,private reasonMasterService:ReasonMasterService,
    public dialogRef: MatDialogRef<AddEditBranchComponent>,private renderer: Renderer2,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    this.addEditForm = this.fb.group({
      id:[''],
      branchCode: ['', Validators.compose([Validators.required])],
      addressLine1: [''],
      area: ['', Validators.compose([Validators.required])],
      phoneNo: ['', Validators.compose([ Validators.maxLength(10), Validators.minLength(10), Validators.pattern(/^-?(0|[1-9]\d*)?$/),])],
      branchName: ['', Validators.compose([Validators.required])],
      parentBranch: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      country: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      // pincode: ['',Validators.compose([Validators.required,Validators.maxLength(6),Validators.minLength(6),Validators.pattern(/^-?(0|[1-9]\d*)?$/),]),],
      postalCode: ['',Validators.compose([Validators.required])],
      externalBranchCode: [''],
      isActive: [true],
      branchType: ['', Validators.compose([Validators.required])],
      region: ['', Validators.compose([Validators.required])],
      isMultiplePinArea:[false]
    })
  }

  ngOnInit(): void {
    this.routes.queryParams.subscribe(res=>this.queryParamData=res);
    if(this.data.type=='edit')
    {
      this.saveBtn=true;
      this.createBtn=true;
      this.addEditHeadTitle='Edit'
      this.createAddEditBtnName='Submit'
      this.getSingleData(this.data.id)
      this.addEditForm.get('branchCode')?.disable()
    }else if(this.data.type=='view'){
      this.addEditHeadTitle='View'
      this.saveBtn=false;
      this.createBtn=false;
      this.getSingleData(this.data.id);
      this.addEditForm.disable();
    }
    else{
      this.addEditHeadTitle='Create'
      this.createAddEditBtnName='Create'
    }
    //this.getCountryData();
    //this.getStateData();
    this.getCityData();
    //this.getPincodeData();
    this.getRegionData();

    this.addEditForm.get('state')?.disable();
    this.addEditForm.get('country')?.disable();
    this.addEditForm.get('postalCode')?.disable();
    this.addEditForm.get('isMultiplePinArea')?.disable();
    this.addEditForm.get('area')?.disable();

    // this.filteredOptions = this.searchTextboxControl.valueChanges
    // .pipe(
    //   startWith<string>(''),
    //   map(name => this._filter(name))
    // );


    //this.doReset();

    this.branchService.getBranchList().subscribe(res => {
      this.checkBranchCodeArray=res.data;
    });

    setTimeout(() => {
      for(let i=0;i<this.checkBranchCodeArray?.length;i++){
        this.checkBranchCode.push(this.checkBranchCodeArray[i]?.branchCode.toLowerCase())
      }
    }, 500);
  }

  // private _filter(name: string): String[] {
  //   const filterValue = name.toLowerCase();
  //   this.setSelectedValues();
  //   this.addEditForm.get('city')?.patchValue(this.selectedValues);
  //   let filteredList = this.CityName.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  //   return filteredList;
  // }


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
  getRegionData(){
    this.reasonMasterService.getReasonMasterList().subscribe(res => {
      this.RegionName=res.data;
      this.filterRegionName=this.RegionName;
    });
  }

  //selectyion change

  countrySelect(id:any)
  {
    //       const areaValue =this.PincodeName.filter(res=>res.id==id)
    //   console.log("state",areaValue);
    //   this.addEditForm.get('state')?.patchValue(areaValue[0].id)
    //   this.addEditForm.get('state')?.disable();
    this.addEditForm.get('state')?.enable();
    this.countriesService.getStateListByCountryId(id).subscribe(res => {
      this.StateName=res;
    });
  }
  stateSelect(id:any)
  {
      //     const areaValue =this.PincodeName.filter(res=>res.id==id)
      // console.log("country",areaValue);
      // this.addEditForm.get('country')?.patchValue(areaValue[0].id)
      // this.addEditForm.get('country')?.updateValueAndValidity()
      // this.addEditForm.get('country')?.disable();
      this.addEditForm.get('city')?.enable();
      this.statesService.getCityListByStateId(id).subscribe(res => {
        this.CityName=res;
      });
  }
  cityFrildClick(){
    //this.searchCityElement.nativeElement.autoFocus()

  }

  searchCityFocus(){
    setTimeout(() => {
      this.searchCityElement?.nativeElement?.focus()
      }, 10)
  }

  citySelect(id:any)
  {

      //     const areaValue =this.PincodeName.filter(res=>res.id==id)
      // console.log("state",areaValue);
      // this.addEditForm.get('state')?.patchValue(areaValue[0].id)
      // this.addEditForm.get('state')?.updateValueAndValidity()
      // this.addEditForm.get('state')?.disable();
      if(this.data.type=='edit')
      {
        this.addEditForm.get('postalCode')?.disable();
        this.HidepincodeAreaEdit=false
        this.toastr.warning('For Update Pincode got to Map Area/Pincode to Branch','', { timeOut: 2000 });
      }else{
        this.addEditForm.get('postalCode')?.enable();
      }

      // this.addEditForm.get('isMultiplePinArea')?.enable();
      this.citiesService.getPincodeListByCityId(id).subscribe(res => {
        this.PincodeName=res;
        this.filterPincodeName=this.PincodeName
      });
      this.citiesService.getAlldetailsByCityId(id).subscribe(res => {
       // this.PincodeName=res;
       this.addEditForm.get('country')?.patchValue(res.data.countryId)
       this.addEditForm.get('state')?.patchValue(res.data.stateId)
       this.StatePlaceholdername=res.data.stateName
       this.CountryPlaceholdername=res.data.countryName
       this.PincodePlaceholdername="Select Pincode";
       this.addEditForm.get('area')?.patchValue('')
       //this.AreaPlaceholdername='Enter Area'
      });
      //this.doReset()
     // this.useStations();
  }
  pincideSelect(id:any,event:any)
  {
      const areaValue =this.PincodeName.filter(res=>res.id==id)
      //this.areaValue=areaValue[0].areaName
      this.addEditForm.get('area')?.patchValue(areaValue[0].areaName)
    //  this.addEditForm.get('area')?.patchValue(this.areaValue)
     // this.addEditForm.get('area')?.disable();
     this.hidePincodeDropAreaName=true
    //  setTimeout(() => {
    //   this.searchPincodeElement?.nativeElement?.focus()
    //   }, 20)
      // event.preventDefault();
      // event.stopPropagation();
  }

  hidePincodeDropAreaNameFalse(event:any){
    this.hidePincodeDropAreaName=false
    // event.preventDefault();
    // event.stopPropagation();
  }
  hidePincodeDropAreaNameTrue(event:any){
    // setTimeout(() => {
    //   this.searchPincodeElement?.nativeElement?.focus()
    //   }, 20)
    this.hidePincodeDropAreaName=true
    // event.preventDefault();
    // event.stopPropagation();
  }
  searchFocuspincode(){
    setTimeout(() => {
      this.searchPincodeElement?.nativeElement?.focus()
      }, 20)

  }
  closeDropdown(){
    // this.hidePincodeDropAreaName=false
  }

  getSingleData(id:any){
    this.branchService.getBranchById(id).subscribe(res => {
      //this.addEditForm.patchValue(res.data)
      this.chekcToggleYesNo(res.data)
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
      || k == 32       //accept forward slash for DL Root123
    );
  }

  cancelAddEditForm(){
    // this.router.navigateByUrl('home/branch' , { skipLocationChange: true });
    this.dialogRef.close();
  }
  saveAddEditForm(){

  }
  createAddEditForm(){

    // console.log(this.isMultiplePinAreaFunction());


    // this._addEditFormData.postalCode=(this.isMultiplePinAreaFunction())

    if (this.addEditForm.invalid) {
      this.addEditForm.markAllAsTouched()
      return;
    }
    this._addEditFormData = this.addEditForm.value;

    if(this.data.type=='edit'){
    //  this.customeTrueFalseName()
    this._addEditFormData.area=this.addEditForm.get('area')?.value
    this._addEditFormData.country=this.addEditForm.get('country')?.value
    this._addEditFormData.state=this.addEditForm.get('state')?.value
    // this._addEditFormData.postalCode=this.isMultiplePinAreaFunction()
    // this.isMultiplePinAreaFunction()
      this.branchService.updateBranchById(this.data.id,this._addEditFormData).subscribe(res => {
        this.toastr.success('Branch Updated Successfully','', { timeOut: 2000 });
        // this.router.navigateByUrl('home/branch', { skipLocationChange: true });
         this.dialogRef.close();
      });
    }
    else{

     // this.customeTrueFalseName()
     //  this._addEditFormData.isActive='Yes'
      //this.addEditForm.get('area')?.patchValue(this.areaValue)
      this._addEditFormData.area=this.addEditForm.get('area')?.value
      this._addEditFormData.country=this.addEditForm.get('country')?.value
      this._addEditFormData.state=this.addEditForm.get('state')?.value
      // this._addEditFormData.postalCode.push(this.isMultiplePinAreaFunction())
      // this.isMultiplePinAreaFunction()
      this.branchService.createBranch(this._addEditFormData).subscribe(res => {
        this.toastr.success('Branch Created Successfully','', { timeOut: 2000 });
        // this.router.navigateByUrl('home/branch', { skipLocationChange: true });
         this.dialogRef.close();
      });
    }
  }

  // isMultiplePinAreaFunction(){

  //   if(this.addEditForm.get('isMultiplePinArea')?.value == true){
  //     for(let i=0;i<this.confirmed.length;i++){
  //       this.assignedValueArray.push({'id':this.confirmed[i].id})
  //       this.checkIdHaveArray.push(this.confirmed[i].id)
  //     }
  //     if(!this.checkIdHaveArray.includes(this.addEditForm.get('postalCode')?.value)){
  //       if(this.addEditForm.get('postalCode')?.value != '')
  //       this.assignedValueArray.push({'id':this.addEditForm.get('postalCode')?.value})
  //     }
  //   }
  //   else{
  //     if(this.addEditForm.get('postalCode')?.value != '')
  //     this.assignedValueArray.push({'id':this.addEditForm.get('postalCode')?.value})
  //   }
  //   //return assignedValueArray;

  //   console.log(this.checkIdHaveArray);
  //  // if(this.addEditForm.get('postalCode')?.value != '')
  //   this.addEditForm.get('postalCode')?.patchValue(this.assignedValueArray);
  //   // console.log("this._addEditFormData",this._addEditFormData);
  // }

  customeTrueFalseName()
  {
    this.toggleTrueFalse('isActive')
  }
  toggleTrueFalse(formvalue: any){

    if(this.addEditForm.get(formvalue)?.value == true)
      {

        this._addEditFormData[formvalue]='Yes'
      }
      else{

        this._addEditFormData[formvalue]='No'
      }
  }
  chekcToggleYesNo(res:any){

    //this.putYesNoToTrueFalse(res.isActive,'isActive')
    this.addEditForm.get('id')?.patchValue(res.id)
    this.addEditForm.get('branchCode')?.patchValue(res.branchCode)
    this.addEditForm.get('addressLine1')?.patchValue(res.addressLine1)
    this.addEditForm.get('area')?.patchValue(res.pincode[0]?.areaName)
    this.addEditForm.get('phoneNo')?.patchValue(res.phoneNo)
    this.addEditForm.get('branchName')?.patchValue(res.branchName)
    this.addEditForm.get('parentBranch')?.patchValue(res.parentBranch)
    this.addEditForm.get('city')?.patchValue(res.city.cityId)
    this.addEditForm.get('country')?.patchValue(res.country.countryId)
    this.addEditForm.get('state')?.patchValue(res.state.stateId)
    this.addEditForm.get('postalCode')?.patchValue(res.pincode[0]?.id)
    this.addEditForm.get('externalBranchCode')?.patchValue(res.externalBranchCode)
    this.addEditForm.get('branchType')?.patchValue(res.branchType)
    this.addEditForm.get('region')?.patchValue(res.region.id)

    this.StatePlaceholdername=res.state.stateName
    this.CountryPlaceholdername=res.country.countryName
    this.PincodePlaceholdername=res.pincode[0]?.pincode
    // this.RegionPlaceholdername=
  }
  putYesNoToTrueFalse(resName:any,conrol:any)
  {

    if(resName == 'Yes')
    {

      this.addEditForm.get(conrol)?.patchValue(true)
    }
    else{

      this.addEditForm.get(conrol)?.patchValue(false)
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
      }else if(type == 'region'){
        event.stopPropagation();
        this.searchRegionTextboxControl.patchValue('');
        this.filterRegionName=this.RegionName
      }else if(type == 'branchType'){
        event.stopPropagation();
        this.searchBranchTypeTextboxControl.patchValue('');
        this.filterBranchTypeName=this.branchTypeName;
      }


    }

    /**
     * Set selected values to retain the state
     */
    // setSelectedValues() {
    //   console.log('selectFormControl', this.addEditForm.get('city')?.value);
    //   if (this.addEditForm.get('city')?.value && this.addEditForm.get('city')?.value.length > 0) {
    //     this.addEditForm.get('city')?.value.forEach((e:{}) => {
    //       if (this.selectedValues.indexOf(e:{}) == -1) {
    //         this.selectedValues.push(e:);
    //       }
    //     });
    //   }
    // }

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
            return Option.pincode.toLocaleLowerCase().startsWith(searchText.toLowerCase())
          })
        }else{
          this.filterPincodeName=this.PincodeName
        }
      }else if(type=='region'){
        if(searchText != ''){
          this.filterRegionName=this.RegionName.filter(Option=>{
            return Option.regionName.toLocaleLowerCase().startsWith(searchText.toLowerCase())
          })
        }else{
          this.filterRegionName=this.RegionName
        }
      }else if(type=='branchType'){
        if(searchText != ''){
          this.filterBranchTypeName=this.branchTypeName.filter(Option=>{
            return Option.viewValue.toLocaleLowerCase().startsWith(searchText.toLowerCase())
          })
        }else{
          this.filterBranchTypeName=this.branchTypeName
        }
      }
    }

  //   doReset() {
  //     this.sourceDevice = JSON.parse(JSON.stringify(this.AssignDevice));
  //     this.confirmedDevice = JSON.parse(JSON.stringify(this.UnassignDevice));
  //     console.log(this.confirmedDevice);
  //     this.populateList();
  // }

  // private populateList() {
  //     this.key = 'deviceCode';
  //     this.display = this.showLabel;
  //     this.keepSorted = true;
  //     this.source = [...this.sourceDevice, ...this.confirmedDevice];
  //     this.confirmed = this.confirmedDevice;
  //     console.log("source: " + JSON.stringify(this.source));
  //     console.log("confirmed: " + JSON.stringify(this.confirmed));
  // }

  // private showLabel(item: any) {
  //     return item.deviceCode;
  // }

  // isMultiplePinAreaDualSelector(ToggaleValue:any)
  // {
  //   console.log("ToggaleValue",ToggaleValue);
  //   console.log(this.addEditForm.get('isMultiplePinArea')?.value);

  //     if(this.addEditForm.get('isMultiplePinArea')?.value != true){
  //       this.isMultiplePinAreaView=true
  //       this.doReset()
  //       //this.useStations();
  //     }else{
  //       this.isMultiplePinAreaView=false
  //     }
  // }

  // Dual Dropdown NG LIst

  private stationLabel(item: any) {
		return item.pincode + ' @ ' + item.areaName+ ' @ ' +item.city.cityName;
	}

	private useStations() {
		this.key = 'id';
		this.display = this.stationLabel;
		this.keepSorted = true;
		//this.source = this.sourceStations;
    this.source = this.PincodeName;
		this.confirmed = this.confirmedStations;

	}

	// private useChessmen() {
	// 	this.key = '_id';
	// 	this.display = 'name';
	// 	this.keepSorted = false;
	// 	this.source = this.sourceChessmen;
	// 	this.confirmed = this.confirmedChessmen;
	// }

	// private useTube() {
	// 	this.key = undefined;
	// 	this.display = undefined;
	// 	this.keepSorted = false;
	// 	this.source = this.sourceTube;
	// 	this.confirmed = this.confirmedTube;
	// }

	swapSource() {
		switch (this.type) {
		case this.arrayType[0].value:
			this.useStations();
			break;
		// case this.arrayType[1].value:
		// 	this.useChessmen();
		// 	break;
		// case this.arrayType[2].value:
		// 	this.useTube();
		// 	break;
		}
	}

	doReset() {
		// this.sourceChessmen = JSON.parse(JSON.stringify(this.chessmen));
		//this.sourceStations = JSON.parse(JSON.stringify(this.stations));PincodeName
    this.sourceStations = JSON.parse(JSON.stringify(this.PincodeName));
    // this.sourceTube = JSON.parse(JSON.stringify(this.tube));
		// this.confirmedChessmen = new Array<any>();
		this.confirmedStations = new Array<any>();
		// this.confirmedTube = new Array<string>();

		// Preconfirm some items.
		//this.confirmedStations.push( this.stations[31] );
		// this.confirmedTube.push( this.tube[13] );
		// this.confirmedTube.push( this.tube[23] );

		// switch (this.type) {
		// case this.arrayType[0].value:
		// 	this.useStations();
		// 	break;

		// case this.arrayType[1].value:
		// 	this.useChessmen();
		// 	break;
		// case this.arrayType[2].value:
		// 	this.useTube();
		// 	break;
		//}

    this.useStations();
    // console.log(this.PincodeName);

    // console.log( this.sourceStations);

	}

	doDelete() {
		if (this.source.length > 0) {
			this.source.splice(0, 1);
		}
	}

	doCreate() {
		if (typeof this.source[0] === 'object') {
			const o=[];
			o[this.key] = this.source.length + 1;
			o[this.display] = this.userAdd;
			this.source.push( o );
		} else {
			this.source.push(this.userAdd);
		}
		this.userAdd = '';
	}

	doAdd() {
		for (let i = 0, len = this.source.length; i < len; i += 1) {
			const o = this.source[i];
			const found = this.confirmed.find( (e: any) => e === o );
			if (!found) {
				this.confirmed.push(o);
				break;
			}
		}
	}

	doRemove() {
		if (this.confirmed.length > 0) {
			this.confirmed.splice(0, 1);
		}
	}

	doFilter() {
		this.filter = !this.filter;
	}

	filterBtn() {
		return (this.filter ? 'Hide Filter' : 'Show Filter');
	}

	doDisable() {
		this.disabled = !this.disabled;
	}

	disableBtn() {
		return (this.disabled ? 'Enable' : 'Disabled');
	}

	swapDirection() {
		this.sourceLeft = !this.sourceLeft;
    this.format.direction = this.sourceLeft ? DualListComponent.LTR : DualListComponent.RTL;
	}

  ngOnDestroy(){
    this.assignedValueArray =[];
    this.checkIdHaveArray=[]
  }

  checkBranchCodeAlreadyExit(event:any){

    if (this.checkBranchCode.includes(this.addEditForm.get('branchCode')?.value.toLowerCase())) {
      this.BranchCodeExistError=true
      this.addEditForm.get('branchCode')?.setErrors({ incorrect: true });
    } else {
      this.BranchCodeExistError = false;
      this.addEditForm.get('branchCode')?.setErrors(null);
    }
  }
}

// export class AssignedDeviceCode {
//   public DeviceCode: number | undefined;
// }
// export class UnAssignedDeviceCode {
//   public DeviceCode: number | undefined;
// }
