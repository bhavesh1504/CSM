import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { DualListComponent } from 'angular-dual-listbox';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BranchService } from 'src/app/core/branch/service/branch.service';
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

@Component({
  selector: 'app-add-edit-map-area-pincode-to-branch',
  templateUrl: './add-edit-map-area-pincode-to-branch.component.html',
  styleUrls: ['./add-edit-map-area-pincode-to-branch.component.css']
})
export class AddEditMapAreaPincodeToBranchComponent implements OnInit,AfterViewInit {

  addEditForm: FormGroup

  CityName:CitiesElement[]=[];
  PincodeName:any[]=[];


  queryParamData:any;
  saveBtn:boolean=true;
  createBtn:boolean=true;
  addEditHeadTitle:any;
  createAddEditBtnName='';
  _addEditFormData:any;
  areaValue:any=''

  filterCityName:CitiesElement[]=[];

  searchTextboxControl = new FormControl();
  selectedValues = [];
  filteredOptions: Observable<any[]> | undefined ;

  assignedValueArray:any =[];
  checkIdHaveArray:any=[]

  //Dual dropdown List

  tab = 1;
	keepSorted = true;
	key!: any;
	display: any;
	filter = true;
	source:any[]=[];
	confirmed:any[]=[];
	userAdd = '';
	disabled = false;

	sourceLeft = true;
	format: any = DualListComponent.DEFAULT_FORMAT;

	private sourceStations!: Array<any>;
	private confirmedStations!: Array<any>;

	arrayType = [
		{ name: 'Rio Grande', detail: '(object array)', value: 'station' },
	];

	type = this.arrayType[0].value;

  isMultiplePinAreaView:boolean=false;
  actionType:boolean=false;

  constructor(private toastr: ToastrService,private fb: FormBuilder,private router: Router, private branchService: BranchService,private pincodeService:PincodeService,private routes:ActivatedRoute,private countriesService:CountriesService,private statesService:StatesService,private citiesService:CitiesService,private reasonMasterService:ReasonMasterService,
    public dialogRef: MatDialogRef<AddEditMapAreaPincodeToBranchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    this.addEditForm = this.fb.group({
      id:[''],
      branchCode: ['', Validators.compose([Validators.required])],
      branchName: ['', Validators.compose([Validators.required])],
      postalCode: ['',Validators.compose([Validators.required])],

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
      this.addEditForm.get('branchName')?.disable()
      this.actionType=false
    }else if(this.data.type=='view'){
      this.addEditHeadTitle='View'
      this.saveBtn=false;
      this.createBtn=false;
      this.getSingleData(this.data.id);
      this.addEditForm.disable();
      this.actionType=true
    }
    else{
      this.addEditHeadTitle='Create'
      this.createAddEditBtnName='Create'
    }
  }

  citySelect(id:any,idBranch:any)
  {
      this.citiesService.getPincodeListByCityId(id).subscribe(res => {
        this.PincodeName=res;
      });

      this.doReset()
  }

  getSingleData(id:any){
    this.branchService.getBranchById(id).subscribe(res => {
      this.addEditForm.get('branchCode')?.patchValue(res.data.branchCode)
      this.addEditForm.get('branchName')?.patchValue(res.data.branchName)
      this.citySelect(res.data.city.cityId,id)
      this.doReset()
    });
    setTimeout(() => {
      this.doReset()
    }, 1000);

  }
  ngAfterViewInit(){

    setTimeout(() => {
      this.doReset()
    }, 1000);

  }

  cancelAddEditForm(){
    this.dialogRef.close();
  }
  saveAddEditForm(){

  }
  createAddEditForm(){

      for(let i=0;i<this.confirmed.length;i++){
        this.assignedValueArray.push({'id':this.confirmed[i].id})
      }

    if(this.data.type=='edit'){
      this.branchService.isMultiplePinArea(this.data.id,this.assignedValueArray).subscribe(res => {
        this.toastr.success('Map Area/Pincode to Branch Updated Successfully','', { timeOut: 2000 });
         this.dialogRef.close();
      });
    }

  }

  // Dual Dropdown NG LIst

  private stationLabel(item: any) {
		return item.pincode + ' @ ' + item.areaName+ ' @ ' +item.city.cityName;
	}

	private useStations() {
		this.key = 'id';
		this.display = this.stationLabel;
		this.keepSorted = true;
		this.source = this.sourceStations;

    //this.source = this.PincodeName;
  this.confirmed = this.confirmedStations;
	}

	swapSource() {
		switch (this.type) {
		case this.arrayType[0].value:
			this.useStations();
			break;
		}
	}

	doReset() {

    this.sourceStations = JSON.parse(JSON.stringify(this.PincodeName));
		this.confirmedStations = new Array<any>();

    this.useStations();


    for(let j=0;j<this.PincodeName.length;j++){
      if(this.PincodeName[j]?.branch?.id === this.data?.id)
      {
        this.confirmedStations.push(this.PincodeName[j])
      }
      else {
        this.sourceStations.push(this.PincodeName[j])
      }

      if(this.PincodeName[j]?.branch == null)
      {
        this.sourceStations.push(this.PincodeName[j])
      }
    }
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
    this.confirmed =[];
    this.source=[]
    this.PincodeName=[]
  }
}

