import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CitiesElement } from 'src/app/core/geography-masters/cities/models/cities.model';
import { CitiesService } from 'src/app/core/geography-masters/cities/service/cities.service';
import { LeadSourceElement } from 'src/app/core/lead-source/models/leadSource.model';
import { LeadSourceService } from 'src/app/core/lead-source/service/leadSource.service';
import { LeadMaintanceService } from '../../../../core/lead-maintance/service/lead-maintance.service';

@Component({
  selector: 'app-add-edit-lead-maintance',
  templateUrl: './add-edit-lead-maintance.component.html',
  styleUrls: ['./add-edit-lead-maintance.component.css']
})
export class AddEditLeadMaintanceComponent implements OnInit {
  addEditForm: FormGroup;
  genderName = [
    {value: 'Male', viewValue: 'Male'},
    {value: 'Female', viewValue: 'Female'}
  ];
  countryName = [
    {value: '1', viewValue: 'India'},
    {value: '2', viewValue: 'USA'},
    {value: '3', viewValue: 'Itali'},
    {value: '4', viewValue: 'Africa'}
  ];
  stateName = [
    {value: '1', viewValue: 'Maharastra'},
    {value: '2', viewValue: 'Delhi'},
    {value: '3', viewValue: 'Chennai'},
    {value: '4', viewValue: 'Gujarat'}
  ];
  // cityName = [
  //   {value: '1', viewValue: 'Mumabi'},
  //   {value: '2', viewValue: 'Pune'},
  //   {value: '3', viewValue: 'Nashik'},
  //   {value: '4', viewValue: 'Nagpur'}
  // ];

  CityName:CitiesElement[]=[];
  LeadSourceName:LeadSourceElement[]=[];

  ConvenientTime=[
    {value: 1, viewValue: 'Morning between 9:00 AM - 11:59 AM'},
  {value: 2, viewValue: 'Afternoon between 12:00 PM - 4:00 PM'},
  {value: 3, viewValue: 'Evening between 04:01 PM - 07:30 PM'}
];
  queryParamData:any;
  saveBtn:boolean=true;
  createBtn:boolean=true;
  addEditHeadTitle:any;
  crateleadBtnName:string=''

  constructor(private toastr: ToastrService,private fb: FormBuilder,private router: Router, private leadService: LeadMaintanceService,private routes:ActivatedRoute,private citiesService:CitiesService,private leadSourceService:LeadSourceService) {
    this.addEditForm = this.fb.group({
      id:[''],
      leadId: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      mobileNo: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(/^-?(0|[1-9]\d*)?$/),])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      dateOfBirth: ['', Validators.compose([Validators.required])],
      pan: ['', Validators.compose([Validators.required])],
      aadhar: [''],
      city: ['', Validators.compose([Validators.required])],
      leadSource: ['', Validators.compose([Validators.required])],
      leadStatus: ['', Validators.compose([Validators.required])],
      assign_To: ['', Validators.compose([Validators.required])],
      scheduleDate: ['', Validators.compose([Validators.required])],
      convenientTime: ['', Validators.compose([Validators.required])],
      scheduledRemark: ['', Validators.compose([Validators.required])],
    })
  }

  ngOnInit(): void {
    this.getCityData();
    this.getLeadSourceData();

    this.routes.queryParams.subscribe(res=>this.queryParamData=res);
    if(this.queryParamData.type=='edit')
    {
      this.saveBtn=true;
      this.createBtn=true;
      this.addEditHeadTitle='Edit';
      this.crateleadBtnName='Submit'
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
      this.crateleadBtnName='Create'
    }
  }

  getSingleData(id:any){
    this.leadService.getLeadById(id).subscribe(res => {
      this.addEditForm.patchValue(res)
      const fullName=res.salutation+". "+res.firstName+" "+res.lastName
      this.addEditForm.get('name')?.patchValue(fullName);
      this.addEditForm.get('leadId')?.patchValue(res.leadId);

      // this.addEditForm.get('leadStatus')?.patchValue('');
      // this.addEditForm.get('assign_To')?.patchValue('');

      this.addEditForm.get('city')?.disable()
      this.addEditForm.get('dateOfBirth')?.disable()
      this.addEditForm.get('leadId')?.disable()
      this.addEditForm.get('name')?.disable()
      this.addEditForm.get('mobileNo')?.disable()
      this.addEditForm.get('email')?.disable()
      this.addEditForm.get('pan')?.disable()
      this.addEditForm.get('aadhar')?.disable()
      this.addEditForm.get('leadSource')?.disable()
    });
  }

  getCityData(){
    this.citiesService.getCitiesList().subscribe(res => {
      this.CityName=res.data;
    });
  }
  getLeadSourceData(){
    this.leadSourceService.getLeadSourceList().subscribe(res => {
      this.LeadSourceName=res.data;
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
    this.router.navigateByUrl('home/lead-maintance', { skipLocationChange: true });
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
      this.leadService.updateLeadmaintance(this.queryParamData.id,_addEditFormData).subscribe(res => {
        this.toastr.success('Lead Maintance Updated Successfully','', { timeOut: 2000 });
            this.router.navigateByUrl('home/lead-maintance', { skipLocationChange: true });
      });
    }
    else{
      this.leadService.createLead(_addEditFormData).subscribe(res => {
        this.toastr.success('Lead Maintance Created Successfully','', { timeOut: 2000 });
            this.router.navigateByUrl('home/lead-maintance', { skipLocationChange: true });
      });
    }

  }
}
