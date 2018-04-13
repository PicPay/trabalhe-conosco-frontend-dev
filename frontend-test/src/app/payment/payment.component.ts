import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatStepper, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Card } from '@app/_models/card';
import { CardService } from '@app/_services/card.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;

  cards: Card[];
  cardFlags = [
    { value: 'master-0', viewValue: 'Master' },
    { value: 'visa-1', viewValue: 'Visa' },
    { value: 'dinners-2', viewValue: 'Dinners' }
  ];

  constructor(
    public dialogRef: MatDialogRef<PaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    private cardService: CardService
  ) { }

  ngOnInit(): void {
    this.cards = this.cardService.getCards();
    console.log(this.cards);
  }

  getCards(): void {
    // this.cards = localStorage.getItem('cards');
  }

  changeStep(index: number) {
    this.stepper.selectedIndex = index;
  }

}
