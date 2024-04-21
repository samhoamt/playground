import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import SplitFlapComponent from './split-flap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SplitFlapComponent,
  ],
  exports: [
    SplitFlapComponent,
  ]
})
export class SplitFlapModule { }
