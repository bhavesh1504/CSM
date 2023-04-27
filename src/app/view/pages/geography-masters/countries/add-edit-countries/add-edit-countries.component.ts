import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CountriesService } from 'src/app/core/geography-masters/countries/service/countries.service';

@Component({
  selector: 'app-add-edit-countries',
  templateUrl: './add-edit-countries.component.html',
  styleUrls: ['./add-edit-countries.component.css']
})
export class AddEditCountriesComponent implements OnInit {

  addEditForm: FormGroup

  queryParamData:any;
  saveBtn:boolean=true;
  createBtn:boolean=true;
  addEditHeadTitle:any;
  createAddEditBtnName='';
  _addEditFormData:any;

  checkCountryCodeArray:any[]=[];
  checkCountryCode:any[]=[]
  CountryCodeExistError:boolean=false

  constructor(private toastr: ToastrService,private fb: FormBuilder,private router: Router, private countriesService: CountriesService,private routes:ActivatedRoute,
    public dialogRef: MatDialogRef<AddEditCountriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    this.addEditForm = this.fb.group({
      id: [''],
      countryCode: ['', Validators.compose([Validators.required])],
      countryName: ['', Validators.compose([Validators.required])],
      isActive: [true],
      isDefault: [''],
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
      this.addEditForm.get('countryCode')?.disable()
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

    this.countriesService.getCountriesList().subscribe(res => {
      this.checkCountryCodeArray=res.data;
    });

    setTimeout(() => {
      for(let i=0;i<this.checkCountryCodeArray?.length;i++){
        this.checkCountryCode.push(this.checkCountryCodeArray[i]?.countryCode.toLowerCase())
      }
    }, 500);
  }

  getSingleData(id:any){
    this.countriesService.getCountriesById(id).subscribe(res => {
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
      || k == 32       //accept forward slash for DL
    );
  }

  cancelAddEditForm(){
  //  this.router.navigateByUrl('home/countries', { skipLocationChange: true });
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
      this.countriesService.updateCountriesById(this.data.id,this._addEditFormData).subscribe(res => {
        this.toastr.success('Country Updated Successfully','', { timeOut: 2000 });
       // this.router.navigateByUrl('home/countries', { skipLocationChange: true });
       this.dialogRef.close();
      });
    }
    else{
      this.customeTrueFalseName()
     //  this._addEditFormData.isActive='Yes'
      this.countriesService.createCountries(this._addEditFormData).subscribe(res => {
        this.toastr.success('Country Created Successfully','', { timeOut: 2000 });
       // this.router.navigateByUrl('home/countries', { skipLocationChange: true });
       this.dialogRef.close();
      });
    }
   // this.router.navigateByUrl('home/countries', { skipLocationChange: true });
  }

  customeTrueFalseName()
  {
   // this.toggleTrueFalse('isActive')
    this.toggleTrueFalse('isDefault')
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

    this.addEditForm.get('id')?.patchValue(res.id)
    this.addEditForm.get('countryCode')?.patchValue(res.countryCode)
    this.addEditForm.get('countryName')?.patchValue(res.countryName)
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

  checkCountryCodeAlreadyExit(event:any){

    if (this.checkCountryCode.includes(this.addEditForm.get('countryCode')?.value.toLowerCase())) {
      this.CountryCodeExistError=true
      this.addEditForm.get('countryCode')?.setErrors({ incorrect: true });
    } else {
      this.CountryCodeExistError = false;
      this.addEditForm.get('countryCode')?.setErrors(null);
    }
  }
}

