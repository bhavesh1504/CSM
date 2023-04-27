import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { TextSplittingPipe } from './pipe/text-splitting.pipe';
import { TruncatePipe } from './pipe/truncate.pipe';


@NgModule({
  declarations: [

   // TextSplittingPipe

    // TruncatePipe
  ],
  imports: [
    BrowserModule, FormsModule, CommonModule, HttpClientModule,
    MatButtonModule
  ],
  // exports:[TruncatePipe]
})
export class PartialsModule { }
