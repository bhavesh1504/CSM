import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { ReverseAuthGuard } from './core/auth/guards/reverse-auth.guard';
import { RoleGuardGuard } from './core/auth/guards/role-guard.guard';
import { PageError404Component } from './view/pages/page-error404/page-error404.component';
import { LoanDetailsComponent } from './view1/pages/loan-details/loan-details.component';

const routes: Routes = [
  {
    path: "CSM",
    redirectTo: "home",
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import("../app/view/pages/auth/auth.module").then(m => m.AuthModule),
    canActivate: [ReverseAuthGuard]
  },
  // {
  //   path: 'auth1',
  //   loadChildren:()=> import("../app/view1/pages/auth1/auth1.module").then(m=>m.Auth1Module),
  //   // canActivate: [ReverseAuthGuard]
  // },
  {
    path: 'loandetails',
    loadChildren: () => import("../app/view1/pages/loan-details/loan-details.module").then(m => m.LoanDetailsModule),
    canActivate: [AuthGuard]
  },

  // {
  //   path: 'loandetails',
  //   loadChildren:()=> import("../app/view1/pages/loandetails/loandetails.module").then(m=>m.LoandetailsModule),
  // },


  {
    path: 'home',
    canActivate: [AuthGuard],
    children: [
      // { path: '', redirectTo: '', pathMatch: 'full' },
      {
        path: '',
        loadChildren: () => import('./view/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'lead',
        canActivate: [RoleGuardGuard],
        data: { role: ['Sales', 'Credit', 'Business Head', 'Regional Manager', 'Zonal Sales Head', 'Branch Manager'] },//Sales , CallCenter ,Agency
        loadChildren: () => import('./view/pages/lead/lead.module').then(m => m.LeadModule)
      },
      {
        path: 'enquiry',
        canActivate: [RoleGuardGuard],
        data: { role: ['Call Center', 'Agency'] },//CRM
        loadChildren: () => import('./view/pages/enquiry/enquiry.module').then(m => m.EnquiryModule)
      },
      {
        path: 'enquiry-worklist',
        canActivate: [RoleGuardGuard],
        data: { role: ['Sales'] },//Agency
        loadChildren: () => import('./view/pages/enquiry-worklist/enquiry-worklist.module').then(m => m.EnquiryWorklistModule)
      },
      {
        path: 'request-service',
        canActivate: [RoleGuardGuard],
        data: { role: ['SalesCRM', 'CSM', 'Call Center'] },//Agency
        loadChildren: () => import('./view/pages/request-service/request-service.module').then(m => m.RequestServiceModule)
      },
      {
        path: 'loan-master',
        canActivate: [RoleGuardGuard],
        data: { role: ['CSM'] },//Agency
        loadChildren: () => import('./view/pages/loan-master/loan-master.module').then(m => m.LoanMasterModule)
      },
      {
        path: 'top-up',
        canActivate: [RoleGuardGuard],
        data: { role: ['SalesCRM', 'CSM'] },//Agency
        loadChildren: () => import('./view/pages/top-ups/top-ups.module').then(m => m.TopUpsModule)
      },
      {
        path: 'transactions',
        canActivate: [RoleGuardGuard],
        data: { role: ['CSM'] },//Agency
        loadChildren: () => import('./view/pages/transactions/transactions.module').then(m => m.TransactionsModule)
      },
      {
        path: 'request-transaction',
        canActivate: [RoleGuardGuard],
        data: { role: ['CSM'] },//Agency
        loadChildren: () => import('./view/pages/request-transaction/request-transaction.module').then(m => m.RequestTransactionModule)
      },
      {
        path: 'feedback',
        canActivate: [RoleGuardGuard],
        data: { role: ['CSM'] },//Agency
        loadChildren: () => import('./view/pages/feedback/feedback.module').then(m => m.FeedbackModule)
      },
      {
        path: 'manual-assignment',
        canActivate: [RoleGuardGuard],
        data: { role: ['Sales', 'Credit', 'Business Head', 'Regional Manager', 'Zonal Sales Head', 'Branch Manager', 'Admin'] },//Agency
        loadChildren: () => import('./view/pages/manual-assignment/manual-assignment.module').then(m => m.ManualAssignmentModule)
      },
      {
        path: 'lead-maintance',
        canActivate: [RoleGuardGuard],
        data: { role: ['Agency'] },//Agency
        loadChildren: () => import('./view/pages/lead-maintance/lead-maintance.module').then(m => m.LeadMaintanceModule)
      },
      {
        path: 'worklist',
        canActivate: [RoleGuardGuard],
        data: { role: ['Credit', 'Sales'] },//Credit , Sales
        loadChildren: () => import('./view/pages/work-list/work-list.module').then(m => m.WorkListModule)
      },
      {
        path: 'user',
        canActivate: [RoleGuardGuard],
        data: { role: ['Admin'] },
        loadChildren: () => import('./view/pages/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'role',
        canActivate: [RoleGuardGuard],
        data: { role: ['Admin'] },
        loadChildren: () => import('./view/pages/role/role.module').then(m => m.RoleModule)
      },
      {
        path: 'branch',
        canActivate: [RoleGuardGuard],
        data: { role: ['Admin'] },
        loadChildren: () => import('./view/pages/masters/branch/branch.module').then(m => m.BranchModule)
      },
      {
        path: 'Map-AreaPincode-to-Branch',
        canActivate: [RoleGuardGuard],
        data: { role: ['Admin'] },
        loadChildren: () => import('./view/pages/masters/map-area-pincode-to-branch/map-area-pincode-to-branch.module').then(m => m.MapAreaPincodeToBranchModule)
      },
      {
        path: 'user-department',
        canActivate: [RoleGuardGuard],
        data: { role: ['Admin'] },
        loadChildren: () => import('./view/pages/masters/user-department/user-department.module').then(m => m.UserDepartmentModule)
      },
      {
        path: 'user-designation',
        canActivate: [RoleGuardGuard],
        data: { role: ['Admin'] },
        loadChildren: () => import('./view/pages/masters/user-designation/user-designation.module').then(m => m.UserDesignationModule)
      },
      {
        path: 'lead-source',
        canActivate: [RoleGuardGuard],
        data: { role: ['Admin'] },
        loadChildren: () => import('./view/pages/masters/lead-source/lead-source.module').then(m => m.LeadSourceModule)
      },
      {
        path: 'lead-status',
        canActivate: [RoleGuardGuard],
        data: { role: ['Admin'] },
        loadChildren: () => import('./view/pages/masters/lead-status/lead-status.module').then(m => m.LeadStatusModule)
      },
      {
        path: 'enquiry-status',
        canActivate: [RoleGuardGuard],
        data: { role: ['Admin'] },
        loadChildren: () => import('./view/pages/masters/enquiry-status/enquiry-status.module').then(m => m.EnquiryStatusModule)
      },
      {
        path: 'loanType',
        canActivate: [RoleGuardGuard],
        data: { role: ['Admin'] },
        loadChildren: () => import('./view/pages/masters/loan-type/loan-type.module').then(m => m.LoanTypeModule)
      },
      {
        path: 'requestType',
        canActivate: [RoleGuardGuard],
        data: { role: ['Admin'] },
        loadChildren: () => import('./view/pages/masters/request-type/request-type.module').then(m => m.RequestTypeModule)
      },
      {
        path: 'requestName',
        canActivate: [RoleGuardGuard],
        data: { role: ['Admin'] },
        loadChildren: () => import('./view/pages/masters/request-name/request-name.module').then(m => m.RequestNameModule)
      },
      {
        path: 'reason-master',
        canActivate: [RoleGuardGuard],
        data: { role: ['Admin'] },
        loadChildren: () => import('./view/pages/masters/reason-master/reason-master.module').then(m => m.ReasonMasterModule)
      },

      {
        path: 'reject-reason',
        canActivate: [RoleGuardGuard],
        data: { role: ['Admin'] },
        loadChildren: () => import('./view/pages/masters/reject-reason/reject-reason.module').then(m => m.RejectReasonModule)
      },
      {
        path: 'product-master',
        canActivate: [RoleGuardGuard],
        data: { role: ['Admin'] },
        loadChildren: () => import('./view/pages/masters/product-master/product-master.module').then(m => m.ProductMasterModule)
      },
      {
        path: 'countries',
        canActivate: [RoleGuardGuard],
        data: { role: ['Admin'] },
        loadChildren: () => import('./view/pages/geography-masters/countries/countries.module').then(m => m.CountriesModule)
      },
      {
        path: 'states',
        canActivate: [RoleGuardGuard],
        data: { role: ['Admin'] },
        loadChildren: () => import('./view/pages/geography-masters/states/states.module').then(m => m.StatesModule)
      },
      {
        path: 'cities',
        canActivate: [RoleGuardGuard],
        data: { role: ['Admin'] },
        loadChildren: () => import('./view/pages/geography-masters/cities/cities.module').then(m => m.CitiesModule)
      },
      {
        path: 'areas',
        canActivate: [RoleGuardGuard],
        data: { role: ['Admin'] },
        loadChildren: () => import('./view/pages/geography-masters/areas/areas.module').then(m => m.AreasModule)
      },
      {
        path: 'pincode',
        canActivate: [RoleGuardGuard],
        data: { role: ['Admin'] },
        loadChildren: () => import('./view/pages/geography-masters/pincode/pincode.module').then(m => m.PincodeModule)
      },
      {
        path: 'user-profile',
        canActivate: [RoleGuardGuard],
        data: { role: ['Admin', 'Sales', 'Call Center', 'CRM', 'Agency', 'Credit'] },
        loadChildren: () => import('./view/pages/profile/profile.module').then(m => m.ProfileModule)
      },
      // {
      //   path:'pages-error404',
      //   loadChildren:()=>import('./view/pages/page-error404/page-error404.module').then(m=>m.PageError404Module)
      // },
      { path: 'pages-error404', component: PageError404Component },
      { path: '**', redirectTo: 'pages-error404', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
