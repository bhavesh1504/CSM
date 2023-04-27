import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EnquiryComponent } from './enquiry.component';
import { AddEditEnquiryComponent } from './add-edit-enquiry/add-edit-enquiry.component';
import {MatDialogModule} from '@angular/material/dialog';
import { SharedPipeModule } from '../../partials/pipe/sharedPipe.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const routes: Routes = [
  {
    path: "",
    component: EnquiryComponent,
  },
  {
    path: "add-edit-enquiry",
    component: AddEditEnquiryComponent,
  },
];

@NgModule({
  declarations: [
    EnquiryComponent,
    AddEditEnquiryComponent
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
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    SharedPipeModule,
    MatSlideToggleModule,
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class EnquiryModule { }
