import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AreasService } from 'src/app/core/geography-masters/areas/service/areas.service';

@Component({
  selector: 'app-add-edit-areas',
  templateUrl: './add-edit-areas.component.html',
  styleUrls: ['./add-edit-areas.component.css']
})
export class AddEditAreasComponent implements OnInit {

  addEditForm: FormGroup

  queryParamData:any;
  saveBtn:boolean=true;
  createBtn:boolean=true;
  addEditHeadTitle:any;
  createAddEditBtnName='';

  cityName = [
    {value: '1', viewValue: 'Mumabi'},
    {value: '2', viewValue: 'Pune'},
    {value: '3', viewValue: 'Nashik'},
    {value: '4', viewValue: 'Nagpur'}
  ];

  constructor(private toastr: ToastrService,private fb: FormBuilder,private router: Router, private areasService: AreasService,private routes:ActivatedRoute) {
    this.addEditForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
    })
  }

  ngOnInit(): void {
    this.routes.queryParams.subscribe(res=>this.queryParamData=res);
    if(this.queryParamData.type=='edit')
    {
      this.saveBtn=true;
      this.createBtn=true;
      this.addEditHeadTitle='Edit'
      this.createAddEditBtnName='Submit'
      this.getSingleData(this.queryParamData.id)
    }else if(this.queryParamData.type=='view'){
      this.addEditHeadTitle='View'
      this.saveBtn=false;
      this.createBtn=false;
      this.getSingleData(this.queryParamData.id);
      this.addEditForm.disable();
    }
    else{
      this.addEditHeadTitle='Create'
      this.createAddEditBtnName='Create'
    }
  }

  getSingleData(id:any){
    this.areasService.getAreasById(id).subscribe(res => {
      this.addEditForm.patchValue(res)
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
    this.router.navigateByUrl('home/areas', { skipLocationChange: true });
  }
  saveAddEditForm(){

  }
  createAddEditForm(){
    if (this.addEditForm.invalid) {
      this.addEditForm.markAllAsTouched()
      return;
    }
    const _addEditFormData = this.addEditForm.value;

    if(this.queryParamData.type=='edit'){
      this.areasService.updateAreasById(this.queryParamData.id,_addEditFormData).subscribe(res => {
        this.toastr.success('Area Updated Successfully','', { timeOut: 2000 });
        this.router.navigateByUrl('home/areas', { skipLocationChange: true });
      });
    }
    else{
      this.areasService.createAreas(_addEditFormData).subscribe(res => {
        this.toastr.success('Area Created Successfully','', { timeOut: 2000 });
        this.router.navigateByUrl('home/areas', { skipLocationChange: true });
      });
    }

  }
}

