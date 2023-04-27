import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestTypeService } from 'src/app/core/request-type/service/request-type.service';
import { ReasonMasterService } from '../../../../../core/reason-master/service/reason-master.service';
import {  RequestNameService } from '../../../../../core/request-name/service/request-name.service';

@Component({
  selector: 'app-add-edit-request-name',
  templateUrl: './add-edit-request-name.component.html',
  styleUrls: ['./add-edit-request-name.component.css']
})
export class AddEditRequestNameComponent implements OnInit {
  @ViewChild('searchBranchType') searchBranchType!: ElementRef;
  
  addEditForm: FormGroup

  queryParamData:any;
  saveBtn:boolean=true;
  createBtn:boolean=true;
  addEditHeadTitle:any;
  createAddEditBtnName='';
  _addEditFormData:any;
  show:boolean = false;

  checkRegionMasterCodeArray:any[]=[];
  checkRegionMasterCode:any[]=[]
  RegionMasterCodeExistError:boolean=false


  branchTypeName:any = [];
  filterBranchTypeName:any=this.branchTypeName;
  searchBranchTypeTextboxControl = new FormControl();

  constructor(private toastr: ToastrService,private fb: FormBuilder,private router: Router, private reasonMasterService: ReasonMasterService,private routes:ActivatedRoute, private requestNameService: RequestNameService, private requestTypeService: RequestTypeService,
    public dialogRef: MatDialogRef<AddEditRequestNameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    this.addEditForm = this.fb.group({
      id:[''],
      requestNameCode: ['', Validators.compose([Validators.required])],
      requestItemId: ['', Validators.compose([Validators.required])],
      reqDaysRequired: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
      reqName: ['', Validators.compose([Validators.required])],
      reqStatus: [true],
      payAmount: [''],
      // payAmount: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
      isPaidPopup: [''],
     
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
      this.addEditForm.get('requestNameCode')?.disable()
    }else if(this.data.type=='view'){
      this.addEditHeadTitle='View'
      this.saveBtn=false;
      this.createBtn=false;
      this.getSingleData(this.data.id);
      this.addEditForm.disable();
    }
    else{
      this.addEditHeadTitle='Add'
      this.createAddEditBtnName='Create'
    }

    this.requestNameService.getReasonMasterList().subscribe(res => {     
      this.checkRegionMasterCodeArray=res.data;
      
      
    });

    setTimeout(() => {
      for(let i=0;i<this.checkRegionMasterCodeArray?.length;i++){
        this.checkRegionMasterCode.push(this.checkRegionMasterCodeArray[i]?.requestNameCode?.toLowerCase())
      }
    }, 500);

    this.requestTypeService.getReasonMasterList().subscribe(res => {
      this.branchTypeName = res.data;
      this.filterBranchTypeName= this.branchTypeName;
      console.log(this.filterBranchTypeName);
      
    })

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

  // chekcToggleYesNo(res:any){

  //   this.addEditForm.get('id')?.patchValue(res.data.id)
  //   this.addEditForm.get('requestNameCode')?.patchValue(res.data.requestNameCode)
  //   this.addEditForm.get('requestItemId')?.patchValue(res.data.requestTypeId)
  //   this.addEditForm.get('reqDaysRequired')?.patchValue(res.data.reqDaysRequired)
  //   this.addEditForm.get('reqName')?.patchValue(res.data.reqName)
  //   this.addEditForm.get('isPaidPopup')?.patchValue(res.data.isPaidPopup)
  //   this.addEditForm.get('payAmount')?.patchValue(res.data.payAmount)
   
  // }

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

  clearSearch(event:any,type:any) {
   if(type == 'requestItemId'){
      event.stopPropagation();
      this.searchBranchTypeTextboxControl.patchValue('');
      this.filterBranchTypeName=this.branchTypeName;
    }
  }

  searchDropdown(searchText:any,type:any){
  if(type=='requestItemId'){
      if(searchText != ''){
        this.filterBranchTypeName=this.branchTypeName.filter((Option: { requestItemId: { description: string; }; })=>{
          return Option.requestItemId?.description.toLocaleLowerCase().startsWith(searchText.toLowerCase())
        })
      }else{
        this.filterBranchTypeName=this.branchTypeName
      }
    }
  }

  checkRegionMasterCodeAlreadyExit(event:any){

    if (this.checkRegionMasterCode.includes(this.addEditForm.get('requestNameCode')?.value.toLowerCase())) {
      this.RegionMasterCodeExistError=true
      this.addEditForm.get('requestNameCode')?.setErrors({ incorrect: true });
    } else {
      this.RegionMasterCodeExistError = false;
      this.addEditForm.get('requestNameCode')?.setErrors(null);
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
  getSingleData(id:any){
    this.requestNameService.getReasonMasterById(id).subscribe(res => {
       this.addEditForm.patchValue(res.data)
       this.addEditForm.get('requestItemId')?.setValue(res.data.requestTypeId)
     // this.chekcToggleYesNo(res.data)
    });
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
    //this.router.navigateByUrl('home/reason-master', { skipLocationChange: true });
    this.dialogRef.close();
  }
  saveAddEditForm(){

  }
  createAddEditForm(){
    console.log('vvthis.addEditForm',this.addEditForm)
    if (this.addEditForm.invalid) {
      this.addEditForm.markAllAsTouched()
      return;
    }
     this._addEditFormData = this.addEditForm.value;

    if(this.data.type=='edit'){
     // this.customeTrueFalseName()
      this.requestNameService.updateReasonMasterById(this.data.id,this._addEditFormData).subscribe(res => {
        console.log(this.data);
        
        this.toastr.success('Request Name Updated Successfully','', { timeOut: 2000 });
            // this.router.navigateByUrl('home/reason-master', { skipLocationChange: true });
             this.dialogRef.close();
      });
    }
    else{
     // this.customeTrueFalseName()
     //  this._addEditFormData.isActive='Yes'
      this.requestNameService.createReasonMaster(this._addEditFormData).subscribe(res => {
        console.log(res);
        
        this.toastr.success('Request Name Created Successfully','', { timeOut: 2000 });
            // this.router.navigateByUrl('home/reason-master', { skipLocationChange: true });
             this.dialogRef.close();
      });
    }

  }

  clearSearchBar(){
    this.searchBranchType.nativeElement.value = ''
    this.filterBranchTypeName=this.branchTypeName
  }

  showOptions(event:any){
    this.show = event.checked
    // console.log(event);
    // console.log(this.show);
  }

}
