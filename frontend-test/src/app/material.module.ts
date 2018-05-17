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
  MatSelectModule,
  MatSnackBarModule
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
    MatSelectModule,
    MatSnackBarModule
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
    MatSelectModule,
    MatSnackBarModule
  ],
  declarations: []
})
export class MaterialModule { }
