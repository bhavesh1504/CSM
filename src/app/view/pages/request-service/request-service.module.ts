import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RequestServiceComponent } from './request-service.component';
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
import { AddEditRequestServiceComponent } from './add-edit-request-service/add-edit-request-service.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { ViewdialogComponent } from './viewdialog/viewdialog.component';
import { EditdialogComponent } from './editdialog/editdialog.component';

const routes = [
  {path: '', component:RequestServiceComponent}
]


@NgModule({
  declarations: [
    RequestServiceComponent,
    AddEditRequestServiceComponent,
    ViewdialogComponent,
    EditdialogComponent
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
    MatCheckboxModule,
    MatSliderModule,
  ],  
    providers: [
      MatDatepickerModule,
      MatNativeDateModule,
      DatePipe
    ]
})

export class RequestServiceModule { }







  