import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadersComponent } from '../../layouts/headers/headers.component';
import { FootersComponent } from '../../layouts/footers/footers.component';



@NgModule({
  declarations: [HeadersComponent,FootersComponent],
  imports: [
    CommonModule
  ],
  exports: [HeadersComponent,FootersComponent],
})
export class SharedModule { }
