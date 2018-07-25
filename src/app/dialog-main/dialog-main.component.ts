import { Component, OnInit } from '@angular/core';

import { DialogType } from './../models/enums/dialog-type';
import { CardService } from './services/card.service';

@Component({
  selector: 'app-dialog-main',
  templateUrl: './dialog-main.component.html',
  styleUrls: ['./dialog-main.component.scss'],
  providers: [CardService]
})
export class DialogMainComponent implements OnInit {

  private dialogType: DialogType;

  private cards: Array<any> = [];

  private lastNumbers: string;

  private value: number;

  constructor(
    private cardService: CardService
  ) {
    this.dialogType = DialogType.PAY;
  }

  ngOnInit() {
  }

  private allowPayDialog(): boolean {
    return (this.dialogType === DialogType.PAY);
  }

  private allowRegisterCreditCardDialog(): boolean {
    return (this.dialogType === DialogType.REGISTER_CARD);
  }

  private allowSelectCardDialog(): boolean {
    return (this.dialogType === DialogType.SELECT_CARD);
  }

  private allowReceiptDialog(): boolean {
    return (this.dialogType === DialogType.RECEIPT);
  }

  private cardRegistered(event): void {
    this.cardService.addCard(event.form);

    console.log('main:', this.cardService.getLengthCards() - 1);

    this.cardService.setFavoriteCard(this.cardService.getLengthCards() - 1);

    this.dialogType = event.dialogType;
  }

  private changeToRegister(event: any): void {
    this.dialogType = event.dialogType;

    if(event.value){
      this.value = event.value;
      console.log('transaction', this.value);
    }

  }

  private changeToPayDialog(event) {
    this.dialogType = event.dialogType;
  }

}
