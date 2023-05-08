import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { BranchService } from 'src/app/core/branch/service/branch.service';
import { DashboardService } from 'src/app/core/dashboard/service/dashboard.service';
import { EnquiryStatusElement } from 'src/app/core/enquiry-status/models/enquiryStatus.model';
import { EnquiryStatusService } from 'src/app/core/enquiry-status/service/enquiryStatus.service';
import { EnquiryWorklistService } from 'src/app/core/enquiry-worklist/service/enquiry-worklist.service';
import { EnquiryService } from 'src/app/core/enquiry/service/enquiry.service';
import { LeadStatusElement } from 'src/app/core/lead-status/models/leadStatus.model';
import { LeadStatusService } from 'src/app/core/lead-status/service/leadStatus.service';
import { LeadService } from 'src/app/core/lead/service/lead.service';
import { ManualAssignmentService } from 'src/app/core/manual-assignment/service/manual-assignment.service';
import { RequestServiceService } from 'src/app/core/request-service/service/request-service.service';
import { TopupsService } from 'src/app/core/top-ups/topups.service';
import { TransactionService } from 'src/app/core/transactions/transaction.service';
import { UserService } from 'src/app/core/user/service/user.service';
import { WorkListService } from 'src/app/core/work-list/service/work-list.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  @ViewChild('searchleadLoanStatus', { static: false }) searchleadLoanStatusElement!: ElementRef;
  @ViewChild('searchEnquiryWorklistStatus', { static: false }) searchEnquiryWorklistStatusElement!: ElementRef;

  userDetails: any;
  userDetailAtoBValue: any = '';
  roleArray: any = [];
  showAllDashboardData = ''
  showWorkListDashboardData = ''

  callCenterRole: boolean = false;
  salesRole: boolean = false;
  adminRole: boolean = false;
  agencyRole: boolean = false;
  creditRole: boolean = false;
  CRMRole: boolean = false;
  CSM:boolean=false;
  SalesCRM:boolean=false;

  BHRole: boolean = false;
  RMRole: boolean = false;
  ZSHRole: boolean = false;
  BMRole: boolean = false;

  spliteRoleName: any;
  makeaRoleArray: any;

  showFilterUsers: any = [];
  showUserCount: any = '0'
  showFilterBranchs: [] = [];
  showBranchCount: any = '0'
  showFilterEnquirys: any = [];
  showEnquiryCount: any = '0'
  showFilterLeads: any = [];
  showLeadCount: any = '0'
  showFilterLeadWorklists: any = [];
  showLeadWorklistCount: any = '0'
  showFilterEnquiryWorklists: any = [];
  showEnquiryWorklistCount: any = '0'
  showFilterMannualAssignments: any = [];
  showMannualAssignmentCount: any = '0'

  data: any[] = []; // assuming your data is an array of objects
  dataCount: number = 0;
  dataCounts: number = 0;
  dataCountss: number = 0;

  date = new Date();
  weekDate: any;
  weekArray: number = 0;

  AllLeadsDetails: any = []

  LeadStatusName: LeadStatusElement[] = [];
  filterLoanStatusSelectName: LeadStatusElement[] = [];
  searchleadLoanStatusTextboxControl = new FormControl();

  EnquiryWorklistStatusName: EnquiryStatusElement[] = [];
  filterEnquiryWorklistStatusSelectName: EnquiryStatusElement[] = [];
  searchEnquiryWorklistStatusTextboxControl = new FormControl();

  topUpsData:any;


  constructor(private leadStatusService: LeadStatusService, private elementRef: ElementRef, private branchService: BranchService, private router: Router,
    private authService: AuthService, private userService: UserService, private enquiryService: EnquiryService, private enquiryStatusService: EnquiryStatusService,
    private leadService: LeadService, private workListService: WorkListService, private enquiryWorklistService: EnquiryWorklistService,
    private manualAssignmentService: ManualAssignmentService, private dashboardService: DashboardService,
    private service:RequestServiceService, private services: TransactionService, private servicess: TopupsService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.userDetails = sessionStorage.getItem('UserDetails')
      this.userDetailAtoBValue = JSON.parse(atob(this.userDetails));
      for (let i = 0; i < this.userDetailAtoBValue.role.length; i++) {
        this.roleArray.push(this.userDetailAtoBValue.role[i].roleName)
      }

      //   const fullName=this.userDetailAtoBValue.salutation+" "+this.userDetailAtoBValue.firstName+" "+this.userDetailAtoBValue.lastName
      // this.addEditForm.get('FullName')?.patchValue(fullName)


      this.spliteRoleName = sessionStorage.getItem('role');
      this.makeaRoleArray = this.spliteRoleName?.split(',');


      for (let j = 0; j < this.makeaRoleArray.length; j++) {
        if (this.makeaRoleArray[j] == 'Call Center') {
          this.callCenterRole = true;
        }
        if (this.makeaRoleArray[j] == 'Admin') {
          this.adminRole = true;
        }
        if (this.makeaRoleArray[j] == 'Sales') {
          this.salesRole = true;
        }
        if (this.makeaRoleArray[j] == 'Agency') {
          this.agencyRole = true;
        }
        if (this.makeaRoleArray[j] == 'Credit') {
          this.creditRole = true;
        }
        if (this.makeaRoleArray[j] == 'CRM') {
          this.CRMRole = true;
        }
        if (this.makeaRoleArray[j] == 'Business Head') {
          this.BHRole = true;
        }
        if (this.makeaRoleArray[j] == 'Regional Manager') {
          this.RMRole = true;
        }
        if (this.makeaRoleArray[j] == 'Zonal Sales Head') {
          this.ZSHRole = true;
        }
        if (this.makeaRoleArray[j] == 'Branch Manager') {
          this.BMRole = true;
        }
        if(this.makeaRoleArray[j]=='CSM')
        {
          this.CSM=true;
        }
        if(this.makeaRoleArray[j]=='SalesCRM')
        {
          this.SalesCRM=true;
        }
      }

    }
    // this.getSingleData(this.userDetailAtoBValue.id)

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "./assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);

    if (this.adminRole == true) {
      this.getAllBranchDataTable();
      this.getAllUserDataTable();

      setTimeout(() => {
        this.showBranchCount = this.showFilterBranchs.length
        this.showUserCount = this.showFilterUsers.length
      }, 200);
    }
    if (this.callCenterRole == true) {
      this.getAllEnquiryDataTable();

      setTimeout(() => {
        this.showEnquiryCount = this.showFilterEnquirys.length
      }, 200);
    }
    if (this.salesRole == true || this.creditRole == true || this.BHRole == true || this.RMRole == true || this.ZSHRole == true || this.BMRole == true) {
      this.getAllLeadDataTable();

      setTimeout(() => {
        this.showLeadCount = this.showFilterLeads.length
      }, 200);
    }
    if (this.salesRole == true || this.creditRole == true) {
      this.getAllLeadWorklistDataTable();
      this.getLeadStatusData();

      setTimeout(() => {
        this.showLeadWorklistCount = this.showFilterLeadWorklists.length
      }, 200);
    }
    if (this.salesRole == true) {
      this.getAllEnquiryWorklistDataTable();
      this.getEnquiryWorkStatusData();
      setTimeout(() => {
        this.showEnquiryWorklistCount = this.showFilterEnquiryWorklists.length
      }, 200);
    }
    // if (this.salesRole == true || this.creditRole == true || this.adminRole) {
    //   this.getAllMannualAssignmentDataTable();

    //   setTimeout(() => {
    //     this.showMannualAssignmentCount = this.showFilterMannualAssignments.length
    //   }, 200);
    // }
    this.getData();
    this.getDatas();
    this.getDatass();
  }

  // getSingleData(id:any){
  //   this.userService.showAllDashboardData(id).subscribe(res => {
  //    // this.chekcToggleYesNo(res.data)
  //    this.showAllDashboardData=res.data;
  //   });
  //   this.userService.showWorkListDashboardData(id).subscribe(res => {
  //     this.showWorkListDashboardData=res.data;
  //    });
  // }

  getAllBranchDataTable() {
    this.branchService.getBranchList().subscribe(res => {
      this.showFilterBranchs = res.data
    });
  }

  getAllUserDataTable() {
    this.userService.getUserList().subscribe(res => {
      this.showFilterUsers = res
    });
  }

  getAllEnquiryDataTable() {
    this.enquiryService.getEnquiryList().subscribe(res => {
      // this.showFilterEnquirys = res.data
      let filtrerArray = res.data
      for (let i = 0; i < filtrerArray.length; i++) {
        if(filtrerArray[i]?.isConvertedToLead == false){
          this.showFilterEnquirys.push(filtrerArray[i])
        }
      }
    });


  }

  getAllLeadDataTable() {
    this.leadService.getLeadList().subscribe(res => {
      // this.showFilterLeads = res.data
      let filtrerArray = res.data
      if (this.BMRole == true) {
        let BranchIdArray = []
        let BranchDeatilsArray = this.userDetailAtoBValue?.branch;
        for (let a = 0; a < BranchDeatilsArray.length; a++) {
          BranchIdArray.push(BranchDeatilsArray[a]?.id)
        }

        for (let i = 0; i < filtrerArray.length; i++) {

          if (BranchIdArray.includes(filtrerArray[i].pincode?.branch?.id)) {
            this.AllLeadsDetails.push(filtrerArray[i])
          }
        }
        this.showFilterLeads = this.AllLeadsDetails;

      } else if (this.ZSHRole == true) {

        let ZoneIdArray = []
        let ZoneDeatilsArray = this.userDetailAtoBValue?.branch;
        for (let a = 0; a < ZoneDeatilsArray.length; a++) {
          ZoneIdArray.push(ZoneDeatilsArray[a]?.region?.id)
        }

        for (let i = 0; i < filtrerArray.length; i++) {

          if (ZoneIdArray.includes(filtrerArray[i].pincode?.branch?.region?.id)) {
            this.AllLeadsDetails.push(filtrerArray[i])
          }
        }
        this.showFilterLeads = this.AllLeadsDetails;

      } else if (this.salesRole == true) {

        for (let i = 0; i < filtrerArray.length; i++) {

          if (this.userDetailAtoBValue?.id == filtrerArray[i].assignTo?.id || this.userDetailAtoBValue?.id == filtrerArray[i]?.primaryAssigned) {
            this.AllLeadsDetails.push(filtrerArray[i])
          }
        }
        this.showFilterLeads = this.AllLeadsDetails;

      } else if ( this.creditRole == true) {

        for (let i = 0; i < filtrerArray.length; i++) {

          if (this.userDetailAtoBValue?.id == filtrerArray[i].assignTo?.id || this.userDetailAtoBValue?.id == filtrerArray[i]?.creditAssigned) {
            this.AllLeadsDetails.push(filtrerArray[i])
          }
        }

        this.showFilterLeads = this.AllLeadsDetails;

      }
      else if (this.BHRole == true) {
        this.showFilterLeads = res.data;
      }

    });
  }

  getAllLeadWorklistDataTable() {
    this.workListService.getWorkList(this.userDetailAtoBValue.id).subscribe(res => {
      this.showFilterLeadWorklists = res.data
    });
  }



  getAllEnquiryWorklistDataTable() {
    this.enquiryWorklistService.getEnquiryWorklistList().subscribe(res => {
      // this.showFilterEnquiryWorklists = res.data

      let filtrerArray = res.data
      for (let i = 0; i < filtrerArray.length; i++) {
        if (filtrerArray[i].assignTo?.id == this.userDetailAtoBValue?.id && filtrerArray[i].isConvertedToLead == false  && filtrerArray[i].enquiryStage != 'Closed') {
          // && filtrerArray[i].isConvertedToLead == false
          this.showFilterEnquiryWorklists.push(filtrerArray[i])
        }
      }
    });
  }

  // getAllMannualAssignmentDataTable() {
  //   this.manualAssignmentService.getLeadList().subscribe(res => {
  //     // this.showFilterMannualAssignments = res.data

  //     let filtrerArrayM = res.data
  //     for (let i = 0; i < filtrerArrayM.length; i++) {
  //       if (filtrerArrayM[i].assignTo?.id == this.userDetailAtoBValue?.id) {
  //         this.showFilterMannualAssignments.push(filtrerArrayM[i])
  //       }
  //     }
  //   });
  // }

  //lead Cards counts

  getLeadTodayDataTable() {
    let todaydateCount=0;
    let todaydateFormate:any;
    // this.todaydateCount = 0;

    // this.leadService.getLeadList().subscribe(res => {
    //   this.showFilterLeads = res.data

      todaydateFormate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());

      for (let i = 0; i < this.showFilterLeads.length; i++) {
        // if (this.showFilterLeads[i]?.assignTo?.id == this.userDetailAtoBValue.id) {
          if (moment(this.showFilterLeads[i].createdTime).format() >= moment(todaydateFormate).format())
          {
            todaydateCount = todaydateCount + 1
          }

        // }
      }

      this.showLeadCount = todaydateCount;
    // });
  }

  getLeadWeeklyDataTable() {
    let todaydateCount=0;
    let todaydateFormate:any;
    // this.todaydateCount = 0;

    // this.leadService.getLeadList().subscribe(res => {
    //   this.showFilterLeads = res.data

      todaydateFormate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate()-7);

      for (let i = 0; i < this.showFilterLeads.length; i++) {
        // if (this.showFilterLeads[i]?.assignTo?.id == this.userDetailAtoBValue.id) {
          // console.log(moment(this.showFilterLeads[i].createdTime).format('DD-MMM-YYYY') , moment(todaydateFormate).format('DD-MMM-YYYY'),moment(this.showFilterLeads[i].createdTime).format('DD-MMM-YYYY') >= moment(todaydateFormate).format('DD-MMM-YYYY'));

          if (moment(this.showFilterLeads[i].createdTime).format('DD') >= moment(todaydateFormate).format('DD'))
            todaydateCount = todaydateCount + 1
        // }
      }

      this.showLeadCount = todaydateCount;
    // });
  }

  getLeadMonthsDataTable() {
    let todaydateCount=0;
    let todaydateFormate:any;
      todaydateFormate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate()-30);
      for (let i = 0; i < this.showFilterLeads.length; i++) {
          if (moment(this.showFilterLeads[i].createdTime).format('MM') >= moment(todaydateFormate).format('MM'))
            todaydateCount = todaydateCount + 1
      }
      this.showLeadCount = todaydateCount;
  }

  getLeadYearlyDataTable() {
    let todaydateCount=0;
    let todaydateFormate:any;
      todaydateFormate = new Date(this.date.getFullYear()-1, this.date.getMonth(), this.date.getDate());
      for (let i = 0; i < this.showFilterLeads.length; i++) {
          if (moment(this.showFilterLeads[i].createdTime).format('YYYY') >= moment(todaydateFormate).format('YYYY'))
            todaydateCount = todaydateCount + 1
      }
      this.showLeadCount = todaydateCount;
  }

  //show lead worlist Count

  getLeadWorklistTodayDataTable() {
    let todaydateCount=0;
    let todaydateFormate:any;
      todaydateFormate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
      for (let i = 0; i < this.showFilterLeadWorklists.length; i++) {
          if (moment(this.showFilterLeadWorklists[i].createdTime).format() >= moment(todaydateFormate).format())
          todaydateCount = todaydateCount + 1
        }
      this.showLeadWorklistCount = todaydateCount;
  }

  getLeadWorklistWeeklyDataTable() {
    let todaydateCount=0;
    let todaydateFormate:any;
      todaydateFormate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate()-7);
      for (let i = 0; i < this.showFilterLeadWorklists.length; i++) {
          if (moment(this.showFilterLeadWorklists[i].createdTime).format('DD') >= moment(todaydateFormate).format('DD'))
          todaydateCount = todaydateCount + 1
      }
      this.showLeadWorklistCount = todaydateCount;
  }

  getLeadWorklistMonthsDataTable() {
    let todaydateCount=0;
    let todaydateFormate:any;
      todaydateFormate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate()-30);
      for (let i = 0; i < this.showFilterLeadWorklists.length; i++) {
          if (moment(this.showFilterLeadWorklists[i].createdTime).format('MM') >= moment(todaydateFormate).format('MM'))
            todaydateCount = todaydateCount + 1
      }
      this.showLeadWorklistCount = todaydateCount;
  }

  getLeadWorklistYearlyDataTable() {
    let todaydateCount=0;
    let todaydateFormate:any;
      todaydateFormate = new Date(this.date.getFullYear()-1, this.date.getMonth(), this.date.getDate());
      for (let i = 0; i < this.showFilterLeadWorklists.length; i++) {
          if (moment(this.showFilterLeadWorklists[i].createdTime).format('YYYY') >= moment(todaydateFormate).format('YYYY'))
            todaydateCount = todaydateCount + 1
      }
      this.showLeadWorklistCount = todaydateCount;
  }


  // show enquiry card counts

  getEnquiryTodayDataTable() {
    let todaydateCount=0;
    let todaydateFormate:any;
      todaydateFormate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
      for (let i = 0; i < this.showFilterEnquirys.length; i++) {
          if (moment(this.showFilterEnquirys[i].createdTime).format() >= moment(todaydateFormate).format())
          todaydateCount = todaydateCount + 1
        }
      this.showEnquiryCount = todaydateCount;
  }
  gettopUpsDataTable() {
    this.service.getAllServiceRequest().subscribe(res => {
      this.topUpsData = res.data;
      console.log(this.topUpsData);
    }
  )
  setTimeout(() => {
  let topupsCount = this.topUpsData?.filter(
    (res: any) => res?.requestType === 'Top-Up'
  );

  console.log(topupsCount);
  this.dataCount=topupsCount.length
}, 300);    
}

getQueryDataTable() {
  this.service.getAllServiceRequest().subscribe(res => {
    this.topUpsData = res.data;
    console.log(this.topUpsData);
  }
)
setTimeout(() => {
let queryCount = this.topUpsData?.filter(
  (res: any) => res?.requestType === 'Query'
);

console.log(queryCount);
this.dataCount=queryCount.length
}, 300);    
}
getRequestDataTable() {
  this.service.getAllServiceRequest().subscribe(res => {
    this.topUpsData = res.data;
    console.log(this.topUpsData);
  }
)
setTimeout(() => {
let requestCount = this.topUpsData?.filter(
  (res: any) => res?.requestType === 'Request'
);

console.log(requestCount);
this.dataCount=requestCount.length
}, 300);    
}
getComplaintDataTable() {
  this.service.getAllServiceRequest().subscribe(res => {
    this.topUpsData = res.data;
    console.log(this.topUpsData);
  }
)
setTimeout(() => {
let complainCount = this.topUpsData?.filter(
  (res: any) => res?.requestType === 'Complain'
);

console.log(complainCount);
this.dataCount=complainCount.length
}, 300);    
}

getOthersDataTable() {
  this.service.getAllServiceRequest().subscribe(res => {
    this.topUpsData = res.data;
    console.log(this.topUpsData);
  }
)
setTimeout(() => {
let othersCount = this.topUpsData?.filter(
  (res: any) => res?.requestType === 'Others'
);

console.log(othersCount);
this.dataCount=othersCount.length
}, 300);    
}

  getEnquiryWeeklyDataTable() {
    let todaydateCount=0;
    let todaydateFormate:any;
      todaydateFormate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate()-7);
      for (let i = 0; i < this.showFilterEnquirys.length; i++) {
          if (moment(this.showFilterEnquirys[i].createdTime).format('DD') >= moment(todaydateFormate).format('DD'))
          todaydateCount = todaydateCount + 1
      }
      this.showEnquiryCount = todaydateCount;
  }

  getEnquiryMonthsDataTable() {
    let todaydateCount=0;
    let todaydateFormate:any;
      todaydateFormate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate()-30);
      for (let i = 0; i < this.showFilterEnquirys.length; i++) {
          if (moment(this.showFilterEnquirys[i].createdTime).format('MM') >= moment(todaydateFormate).format('MM'))
            todaydateCount = todaydateCount + 1
      }
      this.showEnquiryCount = todaydateCount;
  }

  getEnquiryYearlyDataTable() {
    let todaydateCount=0;
    let todaydateFormate:any;
      todaydateFormate = new Date(this.date.getFullYear()-1, this.date.getMonth(), this.date.getDate());
      for (let i = 0; i < this.showFilterEnquirys.length; i++) {
          if (moment(this.showFilterEnquirys[i].createdTime).format('YYYY') >= moment(todaydateFormate).format('YYYY'))
            todaydateCount = todaydateCount + 1
      }
      this.showEnquiryCount = todaydateCount;
  }

    // show enquiry Worklist card counts

    getEnquiryWorklistTodayDataTable() {
      let todaydateCount=0;
      let todaydateFormate:any;
        todaydateFormate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
        for (let i = 0; i < this.showFilterEnquiryWorklists.length; i++) {
            if (moment(this.showFilterEnquiryWorklists[i].createdTime).format() >= moment(todaydateFormate).format())
            todaydateCount = todaydateCount + 1
          }
        this.showEnquiryWorklistCount = todaydateCount;
    }

    getEnquiryWorklistWeeklyDataTable() {
      let todaydateCount=0;
      let todaydateFormate:any;
        todaydateFormate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate()-7);
        for (let i = 0; i < this.showFilterEnquiryWorklists.length; i++) {
            if (moment(this.showFilterEnquiryWorklists[i].createdTime).format('DD') >= moment(todaydateFormate).format('DD'))
            todaydateCount = todaydateCount + 1
        }
        this.showEnquiryWorklistCount = todaydateCount;
    }

    getEnquiryWorklistMonthsDataTable() {
      let todaydateCount=0;
      let todaydateFormate:any;
        todaydateFormate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate()-30);
        for (let i = 0; i < this.showFilterEnquiryWorklists.length; i++) {
            if (moment(this.showFilterEnquiryWorklists[i].createdTime).format('MM') >= moment(todaydateFormate).format('MM'))
              todaydateCount = todaydateCount + 1
        }
        this.showEnquiryWorklistCount = todaydateCount;
    }

    getEnquiryWorklistYearlyDataTable() {
      let todaydateCount=0;
      let todaydateFormate:any;
        todaydateFormate = new Date(this.date.getFullYear()-1, this.date.getMonth(), this.date.getDate());
        for (let i = 0; i < this.showFilterEnquiryWorklists.length; i++) {
            if (moment(this.showFilterEnquiryWorklists[i].createdTime).format('YYYY') >= moment(todaydateFormate).format('YYYY'))
              todaydateCount = todaydateCount + 1
        }
        this.showEnquiryWorklistCount = todaydateCount;
    }


//
  getLeadEnquiryTodayDataTable() {
    let todaydateCount=0;
    let todaydateFormate:any;

      todaydateFormate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());

      for (let i = 0; i < this.showFilterEnquiryWorklists.length; i++) {
        // if (this.showFilterEnquiryWorklists[i]?.assignTo?.id == this.userDetailAtoBValue.id) {
          if (moment(this.showFilterEnquiryWorklists[i].createdTime).format() >= moment(todaydateFormate).format())
          todaydateCount = todaydateCount + 1
        // }
      }
      this.showEnquiryWorklistCount = todaydateCount;
  }


  //  Show Status Wise Count

  getLeadStatusData() {
    this.leadStatusService.getLeadStatusList().subscribe(res => {
      this.LeadStatusName = res.data;
      this.filterLoanStatusSelectName = this.LeadStatusName
    });
  }

  getEnquiryWorkStatusData() {
    this.enquiryStatusService.getEnquiryStatusList().subscribe(res => {
      this.EnquiryWorklistStatusName = res.data;
      this.filterEnquiryWorklistStatusSelectName = this.EnquiryWorklistStatusName
    });
  }

  focusLeadLoanStatus() {
    setTimeout(() => {
      this.searchleadLoanStatusElement?.nativeElement?.focus()
    }, 20)
  }

  focusEnquiryWorklistStatus() {
    setTimeout(() => {
      this.searchEnquiryWorklistStatusElement?.nativeElement?.focus()
    }, 20)
  }

  searchDropdown(searchText: any, type: any) {
    if (type == 'leadLoanStatus') {
      if (searchText != '') {
        this.filterLoanStatusSelectName = this.LeadStatusName.filter(Option => {
          return Option.leadStatus.toLocaleLowerCase().startsWith(searchText.toLowerCase())
        })
      } else {
        this.filterLoanStatusSelectName = this.LeadStatusName
      }
    }
    else if (type == 'EnquiryWorklistStatus') {
      if (searchText != '') {
        this.filterEnquiryWorklistStatusSelectName = this.EnquiryWorklistStatusName.filter(Option => {
          return Option.enquiryStatusName.toLocaleLowerCase().startsWith(searchText.toLowerCase())
        })
      } else {
        this.filterEnquiryWorklistStatusSelectName = this.EnquiryWorklistStatusName
      }
    }
  }

  /**
* Clearing search textbox value
*/
  clearSearch(event: any, type: any) {
    if (type == 'leadLoanStatus') {
      event.stopPropagation();
      this.searchleadLoanStatusTextboxControl.patchValue('');
      this.filterLoanStatusSelectName = this.LeadStatusName
    }
    else if (type == 'EnquiryWorklistStatus') {
      event.stopPropagation();
      this.searchleadLoanStatusTextboxControl.patchValue('');
      this.filterEnquiryWorklistStatusSelectName = this.EnquiryWorklistStatusName
    }
  }

  statusLeadSelect(event: any) {

    this.dashboardService.getLeadStatus(this.userDetailAtoBValue.id, event).subscribe(res => {
      this.showLeadWorklistCount = res.data
    });
  }

  statusEnquirySelect(event: any) {

    this.dashboardService.getEnquiryStatus(this.userDetailAtoBValue.id, event).subscribe(res => {
      this.showEnquiryWorklistCount = res.data
    });
  }

  reloadData()
  {
    this.showFilterUsers = [];
    this.showUserCount = '0'
    this.showFilterBranchs = [];
    this.showBranchCount = '0'
    this.showFilterEnquirys = [];
    this.showEnquiryCount = '0'
    this.showFilterLeads = [];
    this.showLeadCount = '0'
    this.showFilterLeadWorklists = [];
    this.showLeadWorklistCount = '0'
    this.showFilterEnquiryWorklists = [];
    this.showEnquiryWorklistCount = '0'
    this.showFilterMannualAssignments = [];
    this.showMannualAssignmentCount = '0'
    this.AllLeadsDetails=[]

    this.ngOnInit()
  }

  getData() {
    // call your get-all-service-request API to fetch the data
    // after getting the data, set the dataCount variable to the length of the data array
    this.service.getAllServiceRequest().subscribe(res => {
      this.dataCount = res.data.length;
    }
  )}
  getDatas() {
    // call your get-all-service-request API to fetch the data
    // after getting the data, set the dataCount variable to the length of the data array
    this.services.getTransactions().subscribe(res => {
      this.dataCounts = res.data.length;
    }
  )}

  getDatass() {
    // call your get-all-service-request API to fetch the data
    // after getting the data, set the dataCount variable to the length of the data array
    this.servicess.getTopUps().subscribe(res => {
      this.dataCountss = res.data.length;
    }
  )}
}

