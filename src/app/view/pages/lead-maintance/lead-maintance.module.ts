import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditLeadMaintanceComponent } from './add-edit-lead-maintance/add-edit-lead-maintance.component';
import { LeadMaintanceComponent } from './lead-maintance.component';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
const routes: Routes = [
  {
      path: "",
      component: LeadMaintanceComponent,
  },
  {
    path: "add-edit-lead-maintance",
    component: AddEditLeadMaintanceComponent,
},
];


@NgModule({
  declarations: [
    LeadMaintanceComponent,
    AddEditLeadMaintanceComponent
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
    MatTooltipModule
  ],
  providers:[
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class LeadMaintanceModule { }
