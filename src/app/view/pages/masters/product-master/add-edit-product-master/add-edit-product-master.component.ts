import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoanTypeElement } from 'src/app/core/loan-type/models/loanType.model';
import { LoanTypeService } from 'src/app/core/loan-type/service/loanType.service';
import { ProductMasterService } from 'src/app/core/product-master/service/ProductMaster.service';

@Component({
  selector: 'app-add-edit-product-master',
  templateUrl: './add-edit-product-master.component.html',
  styleUrls: ['./add-edit-product-master.component.css']
})
export class AddEditProductMasterComponent implements OnInit {

  addEditForm: FormGroup
  queryParamData:any;
  saveBtn:boolean=true;
  createBtn:boolean=true;
  addEditHeadTitle:any;
  createAddEditBtnName='';
  _addEditFormData:any;
  loanTypeName:LoanTypeElement[]=[];
  filterLoanTypeName:LoanTypeElement[]=[];
  searchLoanTypeTextboxControl = new FormControl();

  checkProductCodeArray:any[]=[];
  checkProductCode:any[]=[]
  ProductCodeExistError:boolean=false

  constructor(private fb: FormBuilder,private router: Router, private toastr: ToastrService , private productMasterService: ProductMasterService,private routes:ActivatedRoute,
    public dialogRef: MatDialogRef<AddEditProductMasterComponent>, private loanTypeService: LoanTypeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    this.addEditForm = this.fb.group({
      id:[''],
      productCode: ['', Validators.compose([Validators.required])],
      productName: ['', Validators.compose([Validators.required])],
      loanType: ['', Validators.compose([Validators.required])],
      currency: [''],
      // minTenure: ['', Validators.compose([Validators.required])],
      // maxTenure: ['', Validators.compose([Validators.required])],
      minLoanTenure: ['', Validators.compose([Validators.required])],
      maxLoanTenure: ['', Validators.compose([Validators.required])],
      isActive: [true],
    })
  }

  ngOnInit(): void {
    this.routes.queryParams.subscribe(res=>{
      this.queryParamData=res});
    if(this.data.type=='edit')
    {
      this.saveBtn=true;
      this.createBtn=true;
      this.addEditHeadTitle='Edit'
      this.createAddEditBtnName='Submit'
      this.addEditForm.get('productCode')?.disable()
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
    this.getLoanTypeData()

    this.productMasterService.getProductMasterList().subscribe(res => {
      this.checkProductCodeArray=res.data;
    });

    setTimeout(() => {
      for(let i=0;i<this.checkProductCodeArray?.length;i++){
        this.checkProductCode.push(this.checkProductCodeArray[i]?.productCode.toLowerCase())
      }
    }, 500);

    this.addEditForm.get('currency')?.disable()
    this.addEditForm.get('currency')?.patchValue('INR ₹')
  }

  getSingleData(id:any){
    this.productMasterService.getProductMasterById(id).subscribe(res => {
     // this.chekcToggleYesNo(res.data)
     this.addEditForm.patchValue(res.data)
     this.addEditForm.get('loanType')?.patchValue(res.data.loanType.id)
    });
  }

  getLoanTypeData(){
    this.loanTypeService.getLoanTypeList().subscribe(res => {

      this.loanTypeName=res.data;
      this.filterLoanTypeName=this.loanTypeName
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
    // this.router.navigateByUrl('home/enquiry-status', { skipLocationChange: true });

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
    //  this.customeTrueFalseName()
      this.productMasterService.updateProductMasterById(this.data.id,this._addEditFormData).subscribe(res => {
      if(res){

        const msg = "Enquiry Status Updated Sucessfully";
          this.toastr.success(msg,'', { timeOut: 2000 });
          // this.router.navigateByUrl('home/enquiry-status', { skipLocationChange: true });
              this.dialogRef.close();
      }
      },
      (error)=>{
      const msg =error.error.msgKey + ". " + error.error.message;
      this.toastr.error(msg,'', { timeOut: 2000 });}
      );
    }
    else{
    //  this.customeTrueFalseName()
     //  this._addEditFormData.isActive='Yes'
      this.productMasterService.createProductMaster(this._addEditFormData).subscribe(res => {
        if(res){
          this.toastr.success(res.message,'', { timeOut: 2000 });
          // this.router.navigateByUrl('home/enquiry-status', { skipLocationChange: true });
              this.dialogRef.close();
        }
        },
        (error)=>{
          const msg =error.error.msgKey + ". " + error.error.message;
          this.toastr.error(msg,'', { timeOut: 2000 });
        }
        );
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
    // this.putYesNoToTrueFalse(res.isActive,'isActive')
    this.addEditForm.get('id')?.patchValue(res.id)
    this.addEditForm.get('productCode')?.patchValue(res.productCode)
    this.addEditForm.get('productName')?.patchValue(res.productName)
    this.addEditForm.get('loanType')?.patchValue(res.loanType.id)
    this.addEditForm.get('currency')?.patchValue(res.currency)
    // this.addEditForm.get('minTenure')?.patchValue(res.minTenure)
    // this.addEditForm.get('maxTenure')?.patchValue(res.maxTenure)
    this.addEditForm.get('minLoanTenure')?.patchValue(res.minLoanTenure)
    this.addEditForm.get('maxLoanTenure')?.patchValue(res.maxLoanTenure)
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
     clearSearch(event:any) {
        event.stopPropagation();
        this.searchLoanTypeTextboxControl.patchValue('');
        this.filterLoanTypeName=this.loanTypeName;
    }

    searchDropdown(searchText:any){
        if(searchText != ''){
          this.filterLoanTypeName=this.loanTypeName.filter(Option=>{
            return Option.loanTypeName.toLocaleLowerCase().startsWith(searchText.toLowerCase())
          })
        }else{
          this.filterLoanTypeName=this.loanTypeName
        }
    }

    checkProductCodeAlreadyExit(event:any){

      if (this.checkProductCode.includes(this.addEditForm.get('productCode')?.value.toLowerCase())) {
        this.ProductCodeExistError=true
        this.addEditForm.get('productCode')?.setErrors({ incorrect: true });
      } else {
        this.ProductCodeExistError = false;
        this.addEditForm.get('productCode')?.setErrors(null);
      }
    }
}

