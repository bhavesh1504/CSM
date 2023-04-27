import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManualAssignmentComponent } from './manual-assignment.component';
import { AddEditManualAssignmentComponent } from './add-edit-manual-assignment/add-edit-manual-assignment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
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
import {MatDialogModule} from '@angular/material/dialog';

const routes: Routes = [
  {
      path: "",
      component: ManualAssignmentComponent,
  },
  {
    path: "add-edit-manual-assignment",
    component: AddEditManualAssignmentComponent,
},
];

@NgModule({
  declarations: [
    ManualAssignmentComponent,
    AddEditManualAssignmentComponent
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
    MatDialogModule
  ],
  providers:[
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class ManualAssignmentModule { }
