import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanDetailsComponent } from './loan-details.component';
import { LoanDetailsDialogComponent } from './loan-details-dialog/loan-details-dialog.component';
import { SharedModule } from '../../partial/shared/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { PaidpopupDailogComponent } from './paidpopup-dailog/paidpopup-dailog.component';

const routes = [
  {path: '', component:LoanDetailsComponent}  ,
  {path: 'loandetaildialog', component:LoanDetailsDialogComponent},
  {path: 'paidpopupdialog', component:PaidpopupDailogComponent}
]

@NgModule({
  declarations: [
    LoanDetailsComponent,
    LoanDetailsDialogComponent,
    PaidpopupDailogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    MatStepperModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTabsModule,
    MatSelectModule,
    FormsModule,
    MatSliderModule,
    MatDialogModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule.forChild(routes),
  ]
})
export class LoanDetailsModule { }