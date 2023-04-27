import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapAreaPincodeToBranchComponent } from './map-area-pincode-to-branch.component';
import { AddEditMapAreaPincodeToBranchComponent } from './add-edit-map-area-pincode-to-branch/add-edit-map-area-pincode-to-branch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Routes, RouterModule } from '@angular/router';
import { AngularDualListBoxModule } from 'src/app/view/partials/public-api';


const routes: Routes = [
  {
    path: "",
    component: MapAreaPincodeToBranchComponent,
  },
  {
    path: "add-edit-Map-AreaPincode-to-Branch",
    component: AddEditMapAreaPincodeToBranchComponent,
  },
];

@NgModule({
  declarations: [
    MapAreaPincodeToBranchComponent,
    AddEditMapAreaPincodeToBranchComponent
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
    MatSlideToggleModule,
    MatDialogModule,
    AngularDualListBoxModule,
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class MapAreaPincodeToBranchModule { }
