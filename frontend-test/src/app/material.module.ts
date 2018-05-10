import { NgModule } from '@angular/core';

import {
  MatToolbarModule,
  MatListModule,
  MatLineModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatStepperModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule
} from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatListModule,
    MatLineModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatStepperModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule
  ],
  exports: [
    MatToolbarModule,
    MatListModule,
    MatLineModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatStepperModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule
  ],
  declarations: []
})
export class MaterialModule { }
