import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatToolbarModule,
  MatListModule,
  MatLineModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,

    MatToolbarModule,
    MatListModule,
    MatLineModule,
    MatIconModule
  ],
  exports: [
    MatToolbarModule,
    MatListModule,
    MatLineModule,
    MatIconModule
  ],
  declarations: []
})
export class MaterialModule { }
