import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatToolbarModule,
  MatListModule,
  MatLineModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,

    MatToolbarModule,
    MatListModule,
    MatLineModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    MatToolbarModule,
    MatListModule,
    MatLineModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: []
})
export class MaterialModule { }
