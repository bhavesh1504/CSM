import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { TruncatePipe } from './truncate.pipe';
import { DateFormatePipe } from './date-formate.pipe';
import { FormatTimePipe } from './format-time.pipe';
import { ClickOutsideDirective } from './click-outside.directive';


@NgModule({
  declarations: [
    TruncatePipe,
    DateFormatePipe,
    FormatTimePipe,
    ClickOutsideDirective
  ],
  // imports: [
  //   BrowserModule, FormsModule, CommonModule, HttpClientModule,
  //   MatButtonModule
  // ],
  exports:[TruncatePipe,FormatTimePipe,ClickOutsideDirective
    // DateFormatePipe
  ]
})
export class SharedPipeModule { }
