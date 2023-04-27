import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CitiesService } from 'src/app/core/geography-masters/cities/service/cities.service';
import { StatesElement } from 'src/app/core/geography-masters/states/models/states.model';
import { StatesService } from 'src/app/core/geography-masters/states/service/states.service';
import { CountriesService } from 'src/app/core/geography-masters/countries/service/countries.service';
import { CountriesElement } from 'src/app/core/geography-masters/countries/models/countries.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-add-edit-cities',
  templateUrl: './add-edit-cities.component.html',
  styleUrls: ['./add-edit-cities.component.css']
})
export class AddEditCitiesComponent implements OnInit {

  addEditForm: FormGroup

  queryParamData:any;
  saveBtn:boolean=true;
  createBtn:boolean=true;
  addEditHeadTitle:any;
  createAddEditBtnName='';

  countryName:CountriesElement[]=[];
  StateName:StatesElement[]=[];
  cityClassificationName = [
    {value: '1', viewValue: 'Tier1'},
    {value: '2', viewValue: 'Tier2'},
    {value: '3', viewValue: 'Tier3'},
    {value: '4', viewValue: 'Tier4'}
  ];
  _addEditFormData:any;
  countryPlaceholder:any='Select Country'
  filterStateName:StatesElement[]=[];
  searchStateTextboxControl = new FormControl();

  checkCityCodeArray:any[]=[];
  checkCityCode:any[]=[]
  CityCodeExistError:boolean=false
  // checkCityName:any[]=[]
  // CityNameExistError:boolean=false

  constructor(private toastr: ToastrService,private fb: FormBuilder,private router: Router, private citiesService: CitiesService,private routes:ActivatedRoute,private statesService:StatesService,private countriesService:CountriesService,
    public dialogRef: MatDialogRef<AddEditCitiesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    this.addEditForm = this.fb.group({
      id: [''],
      countryId: ['', Validators.compose([Validators.required])],
      stateId: ['', Validators.compose([Validators.required])],
      cityCode: ['', Validators.compose([Validators.required])],
      cityName: ['', Validators.compose([Validators.required])],
      cityClassification: ['', Validators.compose([Validators.required])],
      isActive: [true],
    })
  }

  ngOnInit(): void {
    this.getStateData();
    // this.getCountryData();
    this.routes.queryParams.subscribe(res=>this.queryParamData=res);
    if(this.data.type=='edit')
    {
      this.saveBtn=true;
      this.createBtn=true;
      this.addEditHeadTitle='Edit'
      this.createAddEditBtnName='Submit'
      this.addEditForm.get('countryId')?.disable()
      this.addEditForm.get('cityCode')?.disable()
      this.getSingleData(this.data.id)
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
      this.addEditForm.get('countryId')?.disable()
    }
    this.addEditForm.get('state')?.disable();

    this.citiesService.getCitiesList().subscribe(res => {
      this.checkCityCodeArray=res.data;

    });

    setTimeout(() => {
      for(let i=0;i<this.checkCityCodeArray?.length;i++){
        this.checkCityCode.push(this.checkCityCodeArray[i]?.cityCode.toLowerCase())
        // this.checkCityName.push(this.checkCityCodeArray[i]?.cityName.toLowerCase())
      }
      // for(let i=0;i<this.checkCityCodeArray?.length;i++){

      // }
    }, 500);
  }

  getStateData(){
    this.statesService.getStatesList().subscribe(res => {
      this.StateName=res;
      this.filterStateName=this.StateName

    });
  }
  // getCountryData(){
  //   this.countriesService.getCountriesList().subscribe(res => {
  //     this.countryName=res.data;
  //   });
  // }
  getSingleData(id:any){
    this.citiesService.getCitiesById(id).subscribe(res => {
      // this.addEditForm.patchValue(res.data)
      this.chekcToggleYesNo(res.data)
    });
  }
  countrySelect(id:any)
  {
    this.addEditForm.get('state')?.enable();
    this.countriesService.getStateListByCountryId(id).subscribe(res => {
      this.StateName=res;
    });
  }
    stateSelect(id:any)
  {
      //this.addEditForm.get('city')?.enable();
      this.statesService.getStatesById(id).subscribe(res => {
        this.addEditForm.get('countryId')?.patchValue(res.country.countryId)
        this.countryPlaceholder=res.country.countryName
      });
      // this.satetPlaceHolder='Select State'
      // this.pincodePlaceHolder='Select Pincode'
      // this.AsssinedToPlaceHolder='Select Asssined To'
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

  cancelAddEditForm(){
    // this.router.navigateByUrl('home/cities', { skipLocationChange: true });
    this.dialogRef.close();
  }
  saveAddEditForm(){

  }
  createAddEditForm(){
    if (this.addEditForm.invalid) {
      this.addEditForm.markAllAsTouched()
      return;
    }
    this._addEditFormData = this.addEditForm.value;

    if(this.data.type=='edit'){
     // this.customeTrueFalseName()
     this._addEditFormData.countryId=this.addEditForm.get('countryId')?.value
      this.citiesService.updateCitiesById(this.data.id,this._addEditFormData).subscribe(res => {
        this.toastr.success('City Updated Successfully','', { timeOut: 2000 });
        // this.router.navigateByUrl('home/cities', { skipLocationChange: true });
        this.dialogRef.close();
      });
    }
    else{
     // this.customeTrueFalseName()
     //  this._addEditFormData.isActive='Yes'
     this._addEditFormData.countryId=this.addEditForm.get('countryId')?.value
      this.citiesService.createCities(this._addEditFormData).subscribe(res => {
        this.toastr.success('City Created Successfully','', { timeOut: 2000 });
        // this.router.navigateByUrl('home/cities', { skipLocationChange: true });
        this.dialogRef.close();
      });
    }


  }

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
    this.addEditForm.get('countryId')?.patchValue(res.country.id)
    this.addEditForm.get('stateId')?.patchValue(res.state.id)
    this.addEditForm.get('cityCode')?.patchValue(res.cityCode)
    this.addEditForm.get('cityName')?.patchValue(res.cityName)
    this.addEditForm.get('cityClassification')?.patchValue(res.cityClassification)
    this.countryPlaceholder=res.country.countryName
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

  searchDropdown(searchText:any){

    if(searchText != ''){
      this.filterStateName=this.StateName.filter(Option=>{
        return Option.stateName.toLocaleLowerCase().startsWith(searchText.toLowerCase())
      })
    }else{
      this.filterStateName=this.StateName
    }

}
    /**
 * Clearing search textbox value
 */
     clearSearch(event:any) {

        event.stopPropagation();
        this.searchStateTextboxControl.patchValue('');
        this.filterStateName=this.StateName
      }

      checkCityCodeAlreadyExit(event:any){

        if (this.checkCityCode.includes(this.addEditForm.get('cityCode')?.value.toLowerCase())) {
          this.CityCodeExistError=true
          this.addEditForm.get('cityCode')?.setErrors({ incorrect: true });
        } else {
          this.CityCodeExistError = false;
          this.addEditForm.get('cityCode')?.setErrors(null);
        }
      }

      // checkCityNameAlreadyExit(event:any){

      //   if (this.checkCityName.includes(this.addEditForm.get('cityName')?.value.toLowerCase())) {
      //     this.CityNameExistError=true

      //     this.addEditForm.get('cityName')?.setErrors({ incorrect: true });
      //   } else {

      //     this.CityNameExistError = false;
      //     this.addEditForm.get('cityName')?.setErrors(null);
      //   }
      // }
}

