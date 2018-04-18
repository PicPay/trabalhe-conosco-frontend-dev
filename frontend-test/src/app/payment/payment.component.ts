import { Component, OnInit, Inject, ViewChild } from '@angular/core';
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

  cards: any = false;
  card: any = {};
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
    console.log(this.cardService.getCards());
  }

  ngOnInit() {
  }

  getCards(): void {
    this.cards = this.cardService.getCards();
  }

  addCard(card: NgForm): void {
    console.log(card);
    return this.cardService.addCard(card);
  }

  changeStep(index: number) {
    this.stepper.selectedIndex = index;
  }

}
