import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditEnquiryWorklistComponent, MY_FORMATS } from './add-edit-enquiry-worklist/add-edit-enquiry-worklist.component';
import { EnquiryWorklistComponent } from './enquiry-worklist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Routes, RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { SharedPipeModule } from '../../partials/pipe/sharedPipe.module';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { VerifyMobileComponent } from './verify-mobile/verify-mobile.component';

const routes: Routes = [

  {
    path: "",
    component: EnquiryWorklistComponent,
  },
  {
    path: "add-edit-enquiry-worklist",
    component: AddEditEnquiryWorklistComponent,
  },
];

@NgModule({
  declarations: [
    EnquiryWorklistComponent,
    AddEditEnquiryWorklistComponent,
    VerifyMobileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    NgxMatTimepickerModule,
    SharedPipeModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
  ]
})
export class EnquiryWorklistModule { }
