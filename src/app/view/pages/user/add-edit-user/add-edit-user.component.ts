import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { BranchElement } from 'src/app/core/branch/models/branch.model';
import { BranchService } from 'src/app/core/branch/service/branch.service';
import { RoleElement } from 'src/app/core/role/models/role.model';
import { RoleService } from 'src/app/core/role/service/role.service';
import { UserDepartmentElement } from 'src/app/core/user-department/models/userDepartment.model';
import { UserDepartmentService } from 'src/app/core/user-department/service/userDepartment.service';
import { UserDesignationElement } from 'src/app/core/user-designation/models/userDesignation.model';
import { UserDesignationService } from 'src/app/core/user-designation/service/userDesignation.service';
import { ConfirmPasswordValidator } from 'src/app/core/user/confirm-password.validator';
import { UserElement } from 'src/app/core/user/models/user.model';
import { UserService } from '../../../../core/user/service/user.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  addEditForm: FormGroup
  genderName = [
    { value: 'Male', viewValue: 'Male' },
    { value: 'Female', viewValue: 'Female' }
  ];
  // departement = [
  //   {value: '1', viewValue: 'D1'},
  //   {value: '2', viewValue: 'D2'},
  //   {value: '3', viewValue: 'D3'},
  //   {value: '4', viewValue: 'D4'}
  // ];
  // designation = [
  //   {value: '1', viewValue: 'DL1'},
  //   {value: '2', viewValue: 'DL2'},
  //   {value: '3', viewValue: 'DL3'},
  //   {value: '4', viewValue: 'DL4'}
  // ];
  level = [
    { value: '1', viewValue: 'L1' },
    { value: '2', viewValue: 'L2' },
    { value: '3', viewValue: 'L3' },
    { value: '4', viewValue: 'L4' }
  ];
  userType = [
    // {value: '1', viewValue: 'Sales'},
    // {value: '2', viewValue: 'Credit'},
    // {value: '3', viewValue: 'Admin'},
    // {value: '4', viewValue: 'Agency'},
    // {value: '5', viewValue: 'Call Center'}

    { value: '1', viewValue: 'Internal' },
    { value: '2', viewValue: 'External' },
  ];
  // branch= [
  //   {value: '1', viewValue: 'B1'},
  //   {value: '2', viewValue: 'B2'},
  //   {value: '3', viewValue: 'B3'},
  //   {value: '4', viewValue: 'B4'}
  // ];
  salutationArray = [
    { value: '1', viewValue: 'Mr.' },
    { value: '2', viewValue: 'Mrs.' },
    { value: '3', viewValue: 'Ms.' },
    { value: '4', viewValue: 'Miss' },
    { value: '5', viewValue: 'Sir' }
  ];

  departement: UserDepartmentElement[] = [];
  designation: UserDesignationElement[] = [];
  branch: BranchElement[] = [];
  role: RoleElement[] = [];
  reportingManagerArray: UserElement[] = [];

  filterDesignationName:UserDesignationElement[]=[];
  searchDesignationTextboxControl = new FormControl();
  filterReportingManagerName:UserElement[]=[];
  searchReportingManagerTextboxControl = new FormControl();
  filterDepartmentName:UserDepartmentElement[]=[];
  searchDepartmentTextboxControl = new FormControl();
  filterBranchName:BranchElement[]=[];
  searchBranchTextboxControl = new FormControl();
  filterRoleName:RoleElement[]=[];
  searchRoleTextboxControl = new FormControl();

  queryParamData: any;
  saveBtn: boolean = true;
  createBtn: boolean = true;
  viewActionOnly: boolean = false;
  viewPasswordFeild: boolean = false;
  viewSliderButtonFeild: boolean = false;
  IsreportingManagerEmpty: boolean = false;
  addEditHeadTitle: any;
  createAddEditBtnName = '';
  branchSelctName: any = '';
  RoleSelctName: any = '';
  DepartmentSelctName: any = '';
  LevelSelctName:any='';
  _addEditFormData: any;
  LoginDetails: any = '';
  userLoginDetails: any = '';

  roleDropdownSettings: IDropdownSettings = {};
  branchDropdownSettings: IDropdownSettings = {};
  departmentDropdownSettings: IDropdownSettings = {};
  levelDropdownSettings:IDropdownSettings = {};

  selectedItems:any;

  checkUserNameCodeArray:any[]=[];
  checkUserNameCode:any[]=[]
  UserNameCodeExistError:boolean=false

  constructor(private toastr: ToastrService,private roleService: RoleService, private branchService: BranchService, private userDepartmentService: UserDepartmentService, private userDesignationService: UserDesignationService, private fb: FormBuilder, private router: Router, private userService: UserService, private routes: ActivatedRoute,
    public dialogRef: MatDialogRef<AddEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    this.addEditForm = this.fb.group({
      id: [''],
      // salutation: [''],
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      mobileNo: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(/^-?(0|[1-9]\d*)?$/),])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      userName: ['', Validators.compose([Validators.required])],
      password: [''],
      c_password: [''],
      userType: ['', Validators.compose([Validators.required])],
      designation: ['', Validators.compose([Validators.required])],
      reportingManager: [''],
      isActive: [true],
      lock: [''],
      departmentIds: ['', Validators.compose([Validators.required])],
      branchIds: ['', Validators.compose([Validators.required])],
      roleIds: ['', Validators.compose([Validators.required])],
      level: ['', Validators.compose([Validators.required])],
      // emp_id: ['', Validators.compose([Validators.required])],
      expired: [''],
      capacity: ['', Validators.compose([Validators.required])],
    },
      {
        validator: ConfirmPasswordValidator("password", "c_password")
      }
    )
  }

  ngOnInit(): void {
    this.getBranchData();
    this.getDesignationData();
    this.getDepartmentData();
    this.getRoleData();
    this.reportingManagerData();

    this.routes.queryParams.subscribe(res => this.queryParamData = res);
    if (this.data.type == 'edit') {
      this.saveBtn = true;
      this.createBtn = true;
      this.viewPasswordFeild = false;
      this.viewSliderButtonFeild = true;
      this.addEditHeadTitle = 'Edit'
      this.createAddEditBtnName = 'Submit'
      this.getSingleData(this.data.id)
      this.addEditForm.get('password')?.removeValidators
      this.addEditForm.get('password')?.updateValueAndValidity;
      this.addEditForm.get('c_password')?.setErrors(null)
      this.addEditForm.get('c_password')?.updateValueAndValidity({ onlySelf: false, emitEvent: false });
    } else if (this.data.type == 'view') {
      this.addEditHeadTitle = 'View'
      this.saveBtn = false;
      this.viewActionOnly = true;
      this.createBtn = false;
      this.viewPasswordFeild = false
      this.viewSliderButtonFeild = true;
      this.getSingleData(this.data.id);
      this.getLoginDetails(this.data.id);
      this.addEditForm.disable();
    }
    else {
      this.addEditHeadTitle = 'Create'
      this.createAddEditBtnName = 'Create'
      this.viewPasswordFeild = true
      this.viewSliderButtonFeild = false;
      this.addEditForm.get('password')?.setValidators([Validators.required])
      this.addEditForm.get('password')?.updateValueAndValidity;
      this.addEditForm.get('c_password')?.setValidators([Validators.required])
      this.addEditForm.get('c_password')?.updateValueAndValidity;
    }

    this.roleDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'roleName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.branchDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'branchName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.departmentDropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'departmentCode',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,


      enableCheckAll: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };

    this.levelDropdownSettings = {
      singleSelection: false,
      idField: 'value',
      textField: 'viewValue',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.userService.getUserList().subscribe(res => {
      this.checkUserNameCodeArray=res;
    });

    setTimeout(() => {
      for(let i=0;i<this.checkUserNameCodeArray?.length;i++){
        this.checkUserNameCode.push(this.checkUserNameCodeArray[i]?.userName.toLowerCase())
      }
    }, 500);
  }

  getSingleData(id: any) {
    this.userService.getUserById(id).subscribe(res => {
      this.addEditForm.patchValue(res)
     // this.userLoginDetails = res;
      this.chekcToggleYesNo(res);
      this.roleToLeveMapping()

      if (this.data.type == 'view') {
      this.addEditForm.get('level')?.disable()
      }
    });
  }

  getBranchData() {
    this.branchService.getBranchList().subscribe(res => {
      this.branch = res.data;
      this.filterBranchName=this.branch
    });
  }
  getDesignationData() {
    this.userDesignationService.getUserDesignationList().subscribe(res => {
      this.designation = res.data;
      this.filterDesignationName=this.designation
    });
  }
  getDepartmentData() {
    this.userDepartmentService.getUserDepartmentList().subscribe(res => {
      this.departement = res.data;
      this.filterDepartmentName=this.departement ;
    });
  }
  getRoleData() {
    this.roleService.getRoleList().subscribe(res => {
      this.role = res;
      this.filterRoleName=this.role
    });
  }

  reportingManagerData() {
    this.userService.getUserList().subscribe(res => {
      if (res.length != 0) {
        this.reportingManagerArray = res;
        this.filterReportingManagerName= this.reportingManagerArray
        this.IsreportingManagerEmpty = true
        this.addEditForm.get('reportingManager')?.setValidators([Validators.required])
        this.addEditForm.get('reportingManager')?.updateValueAndValidity;
      } else {
        this.IsreportingManagerEmpty = false
      }
    });
  }

  checkConformPassword() {

    //   this.addEditForm.get("c_password").valueChanges.subscribe(x => {
    //    console.log('firstname value changed')
    //    console.log(x)
    // })

    this.addEditForm.get('reportingManager')?.valueChanges.subscribe(res => {
    })
  }

  getLoginDetails(id: any) {
    this.userService.getLoginDetails(id).subscribe(res => {
      this.LoginDetails = res;
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

  cancelAddEditForm() {
    // this.router.navigateByUrl('home/user', { skipLocationChange: true });
     this.dialogRef.close();
  }
  saveAddEditForm() {

  }
  createAddEditForm() {
    // if(this.data.type=='edit'){

    // this.addEditForm.get('c_password')?.setErrors(null)
    // this.addEditForm.get('c_password')?.updateValueAndValidity();

    // }

    // if (this.addEditForm.invalid) {
    //   this.addEditForm.markAllAsTouched()
    //   return;
    // }
    this._addEditFormData = this.addEditForm.value;
    // this._addEditFormData.departmentIds=this.ngxselectDropdownGetIds(this.addEditForm.get('departmentIds')?.value)
    // this._addEditFormData.branchIds=this.ngxselectDropdownGetIds(this.addEditForm.get('branchIds')?.value)
    // this._addEditFormData.roleIds=this.ngxselectDropdownGetIds(this.addEditForm.get('roleIds')?.value)
    this._addEditFormData.level = this.addEditForm.get('level')?.value
    if (this.data.type == 'edit') {

      if (this.addEditForm.invalid) {

        if (this.addEditForm.get('c_password')?.invalid) {
          this.customeTrueFalseName()

          this.userService.updateUserById(this.data.id, this._addEditFormData).subscribe(res => {
            this.toastr.success('User Updated Successfully','', { timeOut: 2000 });
            // this.router.navigateByUrl('home/user', { skipLocationChange: true });
             this.dialogRef.close();
          });
        }
      }
    }
    else {
      if (this.addEditForm.invalid) {
        this.addEditForm.markAllAsTouched()
        return;
      }
      this.customeTrueFalseName()
     // this._addEditFormData.isActive = 'Yes';
      this._addEditFormData.level = this.addEditForm.get('level')?.value;
      this._addEditFormData.capacity = Number(this.addEditForm.get('capacity')?.value) ;
      this.userService.createUser(this._addEditFormData).subscribe(res => {
        this.toastr.success('User Created Successfully','', { timeOut: 2000 });
        // this.router.navigateByUrl('home/user', { skipLocationChange: true });
         this.dialogRef.close();
      });
    }
  }

  ngxselectDropdownGetIds(data:any)
  {
    let arrayGetIds=[];
    for( let i=0; i<data.length;i++){
      arrayGetIds.push(data[i].id)
    }
    return arrayGetIds
  }

  branchSelectionChange(event: any) {
    // console.log(this.addEditForm.get('branchIds')?.value,event);
    this.branchSelctName = this.branch.filter(res => res.id == event.value[0]);
    // console.log(this.branchSelctName);
  }

  roleSelectionChange(event: any) {
    // console.log("event",event);

    this.RoleSelctName = this.role.filter(res => res.id == event.value[0]);
    // console.log(this.RoleSelctName);

    // console.log(this.addEditForm.get('roleIds')?.value);
    // console.log("this.role",this.role);

    this.roleToLeveMapping()
  }

  roleToLeveMapping()
  {
    let roleIDsArray = [];
    let roleSelectionName = this.role.filter(res => res.roleCode == 'Credit');

    for (let i = 0; i < this.addEditForm.get('roleIds')?.value.length; i++) {
      // console.log("this.addEditForm.get('roleIds')?.value[i].id",this.addEditForm.get('roleIds')?.value[i]);

      roleIDsArray.push(this.addEditForm.get('roleIds')?.value[i])
    }
    // console.log(roleIDsArray);
    // console.log(roleSelectionName);
    if (roleIDsArray.includes(roleSelectionName[0]?.id)) {
      // console.log(1);

      if(this.addEditForm.get('level')?.value =='')
      this.addEditForm.get('level')?.patchValue('')
      this.addEditForm.get('level')?.enable()
    }
    else {
      // console.log(2);
      this.addEditForm.get('level')?.patchValue('L1')
      this.addEditForm.get('level')?.disable()
    }
  }

  departmentSelectionChange(event: any) {

    // console.log(this.addEditForm.get('departmentIds')?.value,event);
    this.DepartmentSelctName = this.departement.filter(res => res.id == event.value[0]);
    // console.log(this.DepartmentSelctName);
    // console.log(11);

  }
  DesignationSelectionChange(event:any)
  {
    // console.log(111);

  }
  DesignationSelectionChange1(event:any)
  {
    // console.log(1111);
    this.filterDepartmentName=this.departement

  }

  stopPropogartion(event:any)
  {
    event.preventDefault();
  }
  levelSelectionChange(event: any) {
    // console.log(this.addEditForm.get('level')?.value,event);
    this.LevelSelctName = this.level.filter(res => res.viewValue == event.value[0]);
    // console.log(this.LevelSelctName);
  }

  // custom function

  customeTrueFalseName() {
   // this.toggleTrueFalse('isActive')
    this.toggleTrueFalse('lock')
    this.toggleTrueFalse('expired')
  }
  toggleTrueFalse(formvalue: any) {

    if (this.addEditForm.get(formvalue)?.value == true) {
      this._addEditFormData[formvalue] = 'Yes'
    }
    else {

      this._addEditFormData[formvalue] = 'No'
    }
  }
  chekcToggleYesNo(res: any) {

   // this.putYesNoToTrueFalse(res.isActive, 'isActive')
    this.putYesNoToTrueFalse(res.lock, 'lock')
    this.putYesNoToTrueFalse(res.expired, 'expired')

    this.addEditForm.get('id')?.patchValue(res.id)
    this.addEditForm.get('salutation')?.patchValue(res.salutation)
    this.addEditForm.get('firstName')?.patchValue(res.firstName)
    this.addEditForm.get('lastName')?.patchValue(res.lastName)
    this.addEditForm.get('mobileNo')?.patchValue(res.mobileNo)
    this.addEditForm.get('email')?.patchValue(res.email)
    this.addEditForm.get('userName')?.patchValue(res.userName)
    this.addEditForm.get('password')?.patchValue(res.password)
    this.addEditForm.get('userType')?.patchValue(res.userType)
    this.addEditForm.get('designation')?.patchValue(res.designation)
    this.addEditForm.get('capacity')?.patchValue(res.capacity)
    this.addEditForm.get('reportingManager')?.patchValue(Number(res.reportingManager))
    // this.addEditForm.get('departement')?.patchValue(res.departement)
    // this.addEditForm.get('branch')?.patchValue(res.branch)

    //if (res.level == 'L1') {
      this.addEditForm.get('level')?.patchValue(res.level)
     // this.multiSelectArrayFunction('level', res.level)
      //this.addEditForm.get('level')?.disable()
    //}

    this.multiSelectArrayFunction('roleIds', res.role)
    this.multiSelectArrayFunction('departmentIds', res.department)
    this.multiSelectArrayFunction('branchIds', res.branch)

    this.branchSelctName = res.branch;
    this.RoleSelctName = res.role;
    this.DepartmentSelctName = res.department
  }
  putYesNoToTrueFalse(resName: any, conrol: any) {

    if (resName == 'Yes') {

      this.addEditForm.get(conrol)?.patchValue(true)
    }
    else {

      this.addEditForm.get(conrol)?.patchValue(false)
    }
  }
  multiSelectArrayFunction(formcontrolname: any, arrayValue: any) {

    let onlyValue = [];
    for (let i = 0; i < arrayValue.length; i++) {
      onlyValue.push(arrayValue[i].id)
    }

    this.addEditForm.get(formcontrolname)?.patchValue(onlyValue)
  }

  onItemSelect(item: any) {
    //console.log(item);
  }
  onSelectAll(items: any) {
    //console.log(items);
  }

    /**
   * Clearing search textbox value
   */
     clearSearch(event:any,type:any) {
      if(type=='designation'){
        // event.stopPropagation();
        this.searchDesignationTextboxControl.patchValue('');
        this.filterDesignationName=this.designation
      }else if(type == 'reportingManager'){
        // event.stopPropagation();
        this.searchReportingManagerTextboxControl.patchValue('');
        this.filterReportingManagerName=this.reportingManagerArray
      }else if(type == 'department'){
        // event.stopPropagation();
        this.searchDepartmentTextboxControl.patchValue('');
        this.filterDepartmentName=this.departement
      }else if(type == 'branch'){
        // event.stopPropagation();
        this.searchBranchTextboxControl.patchValue('');
        this.filterBranchName=this.branch
      }else if(type == 'role'){
        // event.stopPropagation();
        this.searchRoleTextboxControl.patchValue('');
        this.filterRoleName=this.role
      }
    }

    searchDropdown(searchText:any,type:any){

      if(type=='designation'){
        if(searchText != ''){
          this.filterDesignationName=this.designation.filter(Option=>{
            return Option.designationName.toLocaleLowerCase().startsWith(searchText.toLowerCase())
          })
        }else{
          this.filterDesignationName=this.designation
        }
      }else if(type=='reportingManager'){
        if(searchText != ''){
          this.filterReportingManagerName=this.reportingManagerArray.filter(Option=>{
            return Option.userName.toLocaleLowerCase().startsWith(searchText.toLowerCase())
          })
        }else{
          this.filterReportingManagerName=this.reportingManagerArray
        }
      }else if(type=='department'){
        if(searchText != ''){
          this.filterDepartmentName=this.departement.filter(Option=>{
            return Option.description.toLocaleLowerCase().startsWith(searchText.toLowerCase())
          })
        }else{
          this.filterDepartmentName=this.departement
        }
      }else if(type=='branch'){
        if(searchText != ''){
          this.filterBranchName=this.branch.filter(Option=>{
            return Option.branchName.toLocaleLowerCase().startsWith(searchText.toLowerCase())
          })
        }else{
          this.filterBranchName=this.branch
        }
      }else if(type=='role'){
        if(searchText != ''){
          this.filterRoleName=this.role.filter(Option=>{
            return Option.roleName.toLocaleLowerCase().startsWith(searchText.toLowerCase())
          })
        }else{
          this.filterRoleName=this.role
        }
      }
    }

    checkUserNameCodeAlreadyExit(event:any){

      if (this.checkUserNameCode.includes(this.addEditForm.get('userName')?.value.toLowerCase())) {
        this.UserNameCodeExistError=true
        this.addEditForm.get('userName')?.setErrors({ incorrect: true });
      } else {
        this.UserNameCodeExistError = false;
        this.addEditForm.get('userName')?.setErrors(null);
      }
    }
}
