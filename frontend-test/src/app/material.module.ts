import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatToolbarModule,
  MatListModule,
  MatLineModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatStepperModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,

    MatToolbarModule,
    MatListModule,
    MatLineModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatStepperModule
  ],
  exports: [
    MatToolbarModule,
    MatListModule,
    MatLineModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatStepperModule
  ],
  declarations: []
})
export class MaterialModule { }
