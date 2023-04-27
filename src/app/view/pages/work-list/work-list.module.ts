import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkListComponent } from './work-list.component';
import { AddEditWorkListComponent } from './add-edit-work-list/add-edit-work-list.component';
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
import { RouterModule, Routes } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import { ViewUploadedFilesComponent } from './view-uploaded-files/view-uploaded-files.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { PartialsModule } from '../../partials/partials.module';
import { SharedPipeModule } from '../../partials/pipe/sharedPipe.module';
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
// import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NotMatchFeildComponent } from './not-match-feild/not-match-feild.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from '../lead/add-edit-lead/add-edit-lead.component';

const routes: Routes = [
  {
      path: "",
      component: WorkListComponent,
  },
  {
    path: "add-edit-work-list",
    component: AddEditWorkListComponent,
},
];

@NgModule({
  declarations: [WorkListComponent, AddEditWorkListComponent, ViewUploadedFilesComponent, NotMatchFeildComponent],
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
    MatProgressBarModule,
    NgxMatTimepickerModule,
    SharedPipeModule,
    MatCheckboxModule
    // PartialsModule
  ],
  providers:[
    MatDatepickerModule,
    MatNativeDateModule,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
  ]
})
export class WorkListModule { }
