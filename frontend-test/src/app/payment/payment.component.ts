import { Component, OnInit, Inject, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatStepper, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Card } from '@app/_models/card';
import { CardService } from '@app/_services/card.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;

  cards: any = false;
  card: any = {};
  selectedCard: any = {};
  paymentValue: number = null;

  cardFlags = [
    { value: 'master', viewValue: 'Master' },
    { value: 'visa', viewValue: 'Visa' },
    { value: 'dinners', viewValue: 'Dinners' }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PaymentComponent>,
    private cardService: CardService
  ) {
    this.cards = this.cardService.getCards();

    this.getSelectedCard();
  }

  ngOnInit() {
    // console.log(this.selectedCard)
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

  pay(id, value) {
    const card = this.getSelectedCard();
    const data = {
      'card_number': card.card_number,
      // tslint:disable-next-line:radix
      'cvv': parseInt(card.cvv),
      'value': value,
      'expiry_date': card.expires_date.match(/[\s\S]{1,2}/g).join('/'),
      'destination_user_id': id
    };
    this.cardService.pay(data).subscribe(res => {
      if (res.success) {
        this.changeStep(3);
      }
    });
  }

  changeStep(index: number) {
    this.stepper.selectedIndex = index;
  }

}
