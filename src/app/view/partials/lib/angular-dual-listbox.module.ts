import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DualListComponent } from './dual-list.component';
import { TextSplittingPipe } from '../pipe/text-splitting.pipe';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
	imports:      [
		CommonModule,
		FormsModule,
    MatTooltipModule
	],
	declarations: [ DualListComponent ,TextSplittingPipe],
	exports:      [ DualListComponent ]
})
export class AngularDualListBoxModule {}

