import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CountriesElement } from 'src/app/core/geography-masters/countries/models/countries.model';
import { CountriesService } from 'src/app/core/geography-masters/countries/service/countries.service';
import { StatesService } from 'src/app/core/geography-masters/states/service/states.service';
import { AddEditCitiesComponent } from '../../cities/add-edit-cities/add-edit-cities.component';

@Component({
  selector: 'app-add-edit-states',
  templateUrl: './add-edit-states.component.html',
  styleUrls: ['./add-edit-states.component.css']
})
export class AddEditStatesComponent implements OnInit {

  addEditForm: FormGroup

  queryParamData:any;
  saveBtn:boolean=true;
  createBtn:boolean=true;
  addEditHeadTitle:any;
  createAddEditBtnName='';
  countryName:CountriesElement[]=[];
  _addEditFormData:any;

  filterCountryName:CountriesElement[]=[];
  searchCountryTextboxControl = new FormControl();

  checkStateCodeArray:any[]=[];
  checkStateCode:any[]=[]
  StateCodeExistError:boolean=false

  constructor(private toastr: ToastrService,private fb: FormBuilder,private router: Router, private statesService: StatesService,private routes:ActivatedRoute,private countriesService:CountriesService,    public dialogRef: MatDialogRef<AddEditCitiesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    this.addEditForm = this.fb.group({
      id: [''],
      country_id: ['', Validators.compose([Validators.required])],
      stateCode: ['', Validators.compose([Validators.required])],
      unionTerritory: [''],
      gstnAvailable: [''],
      stateName: ['', Validators.compose([Validators.required])],
      isDefault: [''],
      gstExempted: [''],
      gstStateCode: [''],
      isActive: [true],
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
      this.addEditForm.get('stateCode')?.disable()
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
    this.getCountryData()

    this.statesService.getStatesList().subscribe(res => {
      this.checkStateCodeArray=res;

    });

    setTimeout(() => {
      for(let i=0;i<this.checkStateCodeArray?.length;i++){
        this.checkStateCode.push(this.checkStateCodeArray[i]?.stateCode.toLowerCase())
      }
    }, 500);
  }
  getCountryData(){
    this.countriesService.getCountriesList().subscribe(res => {
      this.countryName=res.data;
      this.filterCountryName=this.countryName
    });
  }
  getSingleData(id:any){
    this.statesService.getStatesById(id).subscribe(res => {
      this.chekcToggleYesNo(res)
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

  cancelAddEditForm(){
    // this.router.navigateByUrl('home/states', { skipLocationChange: true });
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
      this.customeTrueFalseName()
      this.statesService.updateStatesById(this.data.id,this._addEditFormData).subscribe(res => {
        this.toastr.success('State Updated Successfully','', { timeOut: 2000 });
        // this.router.navigateByUrl('home/states', { skipLocationChange: true });
        this.dialogRef.close();
      });
    }
    else{
      this.customeTrueFalseName()
     //  this._addEditFormData.isActive='Yes'
      this.statesService.createStates(this._addEditFormData).subscribe(res => {
        this.toastr.success('State Created Successfully','', { timeOut: 2000 });
        // this.router.navigateByUrl('home/states', { skipLocationChange: true });
        this.dialogRef.close();

      });
    }
  }

  customeTrueFalseName()
  {
    //this.toggleTrueFalse('isActive')
    this.toggleTrueFalse('unionTerritory')
    this.toggleTrueFalse('gstnAvailable')
    this.toggleTrueFalse('isDefault')
    this.toggleTrueFalse('gstExempted')
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
    this.putYesNoToTrueFalse(res.isDefault,'isDefault')
    this.putYesNoToTrueFalse(res.unionTerritory,'unionTerritory')
    this.putYesNoToTrueFalse(res.gstnAvailable,'gstnAvailable')
    this.putYesNoToTrueFalse(res.gstExempted,'gstExempted')

    this.addEditForm.get('id')?.patchValue(res.id)
    this.addEditForm.get('stateCode')?.patchValue(res.stateCode)
    this.addEditForm.get('stateName')?.patchValue(res.stateName)
    this.addEditForm.get('country_id')?.patchValue(res.country.id)
    this.addEditForm.get('gstStateCode')?.patchValue(res.gstStateCode)
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
        this.filterCountryName=this.countryName.filter(Option=>{
          return Option.countryName.toLocaleLowerCase().startsWith(searchText.toLowerCase())
        })
      }else{
        this.filterCountryName=this.countryName
      }

  }
      /**
   * Clearing search textbox value
   */
       clearSearch(event:any) {

          event.stopPropagation();
          this.searchCountryTextboxControl.patchValue('');
          this.filterCountryName=this.countryName
        }

        checkStateCodeAlreadyExit(event:any){

          if (this.checkStateCode.includes(this.addEditForm.get('stateCode')?.value.toLowerCase())) {
            this.StateCodeExistError=true
            this.addEditForm.get('stateCode')?.setErrors({ incorrect: true });
          } else {
            this.StateCodeExistError = false;
            this.addEditForm.get('stateCode')?.setErrors(null);
          }
        }

}


