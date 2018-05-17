import { Component, OnInit, Inject, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatStepper, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
// import { Observable } from 'rxjs';

import { Card } from '@app/_models/card';
import { CardService } from '@app/_services/card.service';
import { PaymentService } from '@app/_services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;

  cardFlags = [
    { value: 'master', viewValue: 'Master' },
    { value: 'visa', viewValue: 'Visa' },
    { value: 'dinners', viewValue: 'Dinners' }
  ];

  cards: any = false;
  card: any = {};
  selectedCard: any = {};
  paymentValue: number = null;
  paymentSuccess: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PaymentComponent>,
    public snackBar: MatSnackBar,
    private cardService: CardService,
    private paymentService: PaymentService
  ) {
    this.cards = this.cardService.getCards();

    this.getSelectedCard();
  }

  ngOnInit() {
  }

  private getSelectedCard() {
    const selectedCard = this.cards.filter(card => {
      if (card.active === true) {
        return card;
      }
    });

    this.selectedCard = selectedCard[0];

    return this.selectedCard;
  }

  getCards() {
    this.cards = this.cardService.getCards();
  }

  addCard(card: NgForm) {
    this.cardService.addCard(card);
    this.getCards();
    this.getSelectedCard();
    return this.changeStep(0);
  }

  saveCards(cards) {
    this.cardService.saveCard(cards);
    this.getSelectedCard();
    return this.changeStep(0);
  }

  selectCard(card) {
    if (card.active) {
      return;
    }

    this.cards.filter(item => {
      if (item.active) {
        item.active = false;
        return item;
      }
    });

    card.active = true;
    return this.cards;
  }

  pay(user, value) {
    const card = this.getSelectedCard();
    const config = new MatSnackBarConfig();
    config.panelClass = ['mat-snack-bar-error'];
    config.duration = 4000;

    if (!card) {
      this.snackBar.open(`Você não tem nenhum cartão cadastrado.`, 'Fechar', config);
      return;
    }

    const data = {
      'card_number': card.card_number,
      // tslint:disable-next-line:radix
      'cvv': parseInt(card.cvv),
      'value': value,
      'expiry_date': card.expires_date.match(/[\s\S]{1,2}/g).join('/'),
      'destination_user_id': user.id
    };

    this.paymentService.pay(data).subscribe(res => {
      if (!res.transaction.success) {
        this.snackBar.open(`O pagamento para ${user.name} foi recusado. Verifique os dados do cartão e tente novamente.`, 'Fechar', config);
        return;
      }

      this.paymentSuccess = res.transaction;
      this.changeStep(3);
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  changeStep(index: number) {
    this.stepper.selectedIndex = index;
  }

}
