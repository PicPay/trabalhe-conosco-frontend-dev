import { Component, OnInit, Inject, EventEmitter, Output, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { User } from './../../models/user';
import { DialogType } from './../../models/enums/dialog-type';
import { CardService } from './../services/card.service';

@Component({
  selector: 'app-dialog-pagamento',
  templateUrl: './dialog-pagamento.component.html',
  styleUrls: ['./dialog-pagamento.component.scss'],
  providers: [CardService]
})
export class DialogPagamentoComponent implements OnInit {

  private user: User;

  private value: number = 0;

  private showProgressBar: boolean = false;

  private noAuth: boolean = false;
  private valueNoAuth: boolean = false;

  @Output() changePage = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DialogPagamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cardService: CardService
  ) {
    this.user = this.data.user;
  }

  ngOnInit() {
  }

  private changeCard() {
    this.changePage.emit({ dialogType: DialogType.SELECT_CARD });
  }

  private closeDialog() {
    this.dialogRef.close();
  }

  private existCard(): boolean {
    return !(this.cardService.getLengthCards() === 0);
  }

  private getLastNumbers(): string {
    const card = this.cardService.getFavoriteCard();
    return card.number.substr(12, 4);
  }

  private registerCard() {
    this.changePage.emit({ dialogType: DialogType.REGISTER_CARD });
  }

  private pay() {

    console.log('value', this.value);

    if(this.value == 0 || !this.value){
      this.valueNoAuth = true;
      return;
    }

    this.valueNoAuth = false;

    this.showProgressBar = true;

    const card = this.cardService.getFavoriteCard();

    const body = {
      "card_number": card.number,
      "cvv": parseFloat(card.securityCode),
      "value": parseFloat(this.value.toString()),
      "expiry_date": card.validateCard,
      "destination_user_id": this.user.id
    }

    let result;

    this.cardService.pay(body).subscribe((data) => {
      result = data;
      console.log('data', data);
    }, (error) => {
      // ERROR
    }, () => {
      this.showProgressBar = false;
      if (result.transaction.success){
        this.noAuth = false;
        this.changePage.emit(
          { 
            dialogType: DialogType.RECEIPT,
            value: this.value 
          }
        );
      }

      else this.noAuth = true;

    });

  }

}
