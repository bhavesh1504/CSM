import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopUpsComponent } from './top-ups.component';
import { RouterModule } from '@angular/router';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import { TopupDialogComponent } from './topup-dialog/topup-dialog.component';
import { TopUpsEditDialogComponent } from './top-ups-edit-dialog/top-ups-edit-dialog.component';

const routes = [
  {path: '', component:TopUpsComponent},
  {path: 'topupdialog', component:TopupDialogComponent},
  {path: 'topupeditdialog', component:TopUpsEditDialogComponent}
]

@NgModule({
  declarations: [
    TopUpsComponent,
    TopupDialogComponent,
    TopUpsEditDialogComponent
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
    MatDialogModule
  ],  
    providers: [
      MatDatepickerModule,
      MatNativeDateModule
    ],
})
export class TopUpsModule { }
