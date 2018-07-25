import { DialogType } from './../../models/enums/dialog-type';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { CardService } from './../services/card.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dialog-register-card',
  templateUrl: './dialog-register-card.component.html',
  styleUrls: ['./dialog-register-card.component.scss'],
  providers: [CardService]
})
export class DialogRegisterCardComponent implements OnInit {

  private creditCard;
  private formGroup: FormGroup;

  @Output() newCard = new EventEmitter();

  constructor(
    private cardService: CardService,
    public dialogRef: MatDialogRef<DialogRegisterCardComponent>,
    private formBuilder: FormBuilder
  ) {
    
    this.formGroup = this.formBuilder.group({
      brand: [''],
      owner: [''],
      number: [''],
      validateCard: [''],
      securityCode: [''],
      cep: [''],
    });
  }

  ngOnInit() {
    this.creditCard = this.cardService.getCreditCardBrands();
  }

  private closeDialog() {
    this.dialogRef.close();
  }

  private registerCard() {
    this.newCard.emit( { form: this.formGroup.value, dialogType: DialogType.PAY } );
  }

}
