import { Component, OnInit, Inject, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatStepper, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';

import { Card } from '@app/_models/card';
import { CardService } from '@app/_services/card.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;

  selectedCard = {};
  cards: any = false;
  card: any = {
    flag: 'visa-1',
    name: 'dasdasd',
    number: '8324723849732498',
    expires_date: '498374',
    cvv: '987',
    cep: '98798798',
  };

  cardFlags = [
    { value: 'master-0', viewValue: 'Master' },
    { value: 'visa-1', viewValue: 'Visa' },
    { value: 'dinners-2', viewValue: 'Dinners' }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PaymentComponent>,
    private cardService: CardService
  ) {
    this.cards = this.cardService.getCards();

    const selectedCard = this.cards.filter(card => {
      if (!card.active) {
        return;
      }
      return card;
    });

    this.selectedCard = selectedCard[0];
  }

  ngOnInit() {
    // console.log(this.selectedCard);
  }


  getCards() {
    this.cards = this.cardService.getCards();
  }

  addCard(card: NgForm) {
    return this.cardService.addCard(card);
  }

  selectCard(card): any {
    this.selectedCard = card;
    this.cardService.selectCard(this.selectedCard);

    return undefined;

  }


  changeStep(index: number) {
    this.stepper.selectedIndex = index;
  }

}
