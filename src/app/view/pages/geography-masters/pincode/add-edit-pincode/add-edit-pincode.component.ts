import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CitiesElement } from 'src/app/core/geography-masters/cities/models/cities.model';
import { CitiesService } from 'src/app/core/geography-masters/cities/service/cities.service';
import { PincodeElement } from 'src/app/core/geography-masters/pincode/models/pincode.model';
import { PincodeService } from 'src/app/core/geography-masters/pincode/service/pincode.service';

@Component({
  selector: 'app-add-edit-pincode',
  templateUrl: './add-edit-pincode.component.html',
  styleUrls: ['./add-edit-pincode.component.css']
})
export class AddEditPincodeComponent implements OnInit {

  addEditForm: FormGroup

  queryParamData:any;
  saveBtn:boolean=true;
  createBtn:boolean=true;
  addEditHeadTitle:any;
  createAddEditBtnName='';

  CityName:CitiesElement[]=[];

  checkPincodeArray:any[]=[];
  checkPincodeNo:any[]=[]
  pincodeExistError:boolean=false

  _addEditFormData:any;

  filterCityName:CitiesElement[]=[];
  searchCityTextboxControl = new FormControl();

  constructor(private toastr: ToastrService,private fb: FormBuilder,private router: Router, private pincodeService: PincodeService,private routes:ActivatedRoute,private citiesService:CitiesService,
    public dialogRef: MatDialogRef<AddEditPincodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    this.addEditForm = this.fb.group({
      id:[''],
      pincode: ['', Validators.compose([Validators.required])],
      city_id: ['', Validators.compose([Validators.required])],
      areaName: ['', Validators.compose([Validators.required])],
      serviceable: [''],
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
      // this.addEditForm.get('pincode')?.disable()
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
    }
    this.getCityData();

    this.pincodeService.getPincodeList().subscribe(res => {
      this.checkPincodeArray=res
    });

    setTimeout(() => {
      for(let i=0;i<this.checkPincodeArray?.length;i++){
        this.checkPincodeNo.push(this.checkPincodeArray[i]?.pincode)
      }
    }, 500);
  }
  getCityData(){
    this.citiesService.getCitiesList().subscribe(res => {
      this.CityName=res.data;
      this.filterCityName= this.CityName
    });
  }
  getSingleData(id:any){
    this.pincodeService.getPincodeById(id).subscribe(res => {
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
    // this.router.navigateByUrl('home/pincode', { skipLocationChange: true });

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
      this.pincodeService.updatePincodeById(this.data.id,this._addEditFormData).subscribe(res => {
        this.dialogRef.close();
        this.toastr.success('Pincode Updated Successfully','', { timeOut: 2000 });
      });
    }
    else{
      //this.customeTrueFalseName()
     //  this._addEditFormData.isActive='Yes'
      this.pincodeService.createPincode(this._addEditFormData).subscribe(res => {
        this.dialogRef.close();
        this.toastr.success('Pincode Created Successfully','', { timeOut: 2000 });
      });
    }
    // this.router.navigateByUrl('home/pincode', { skipLocationChange: true });

  }

  customeTrueFalseName()
  {
    this.toggleTrueFalse('isActive')
    this.toggleTrueFalse('serviceable')
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
    this.putYesNoToTrueFalse(res.serviceable,'serviceable')

    this.addEditForm.get('id')?.patchValue(res.id)
    //this.addEditForm.get('country_id')?.patchValue(res.country_id)
    this.addEditForm.get('city_id')?.patchValue(res.city.id)
    this.addEditForm.get('pincode')?.patchValue(res.pincode)
    this.addEditForm.get('areaName')?.patchValue(res.areaName)
    // this.addEditForm.get('cityClassification')?.patchValue(res.cityClassification)
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

  clearSearch(event:any) {
      event.stopPropagation();
      this.searchCityTextboxControl.patchValue('');
      this.filterCityName=this.CityName
  }

  searchDropdown(searchText:any){
      if(searchText != ''){
        this.filterCityName=this.CityName.filter(Option=>{
          return Option.cityName.toLocaleLowerCase().startsWith(searchText.toLowerCase())
        })
      }else{
        this.filterCityName=this.CityName
      }
  }

  checkPincodeAlreadyExit(event:any){
    if (this.checkPincodeNo.includes(this.addEditForm.get('pincode')?.value)) {
      this.pincodeExistError=true
      this.addEditForm.get('pincode')?.setErrors({ incorrect: true });
    } else {
      this.pincodeExistError = false;
      this.addEditForm.get('pincode')?.setErrors(null);
    }
  }
}

