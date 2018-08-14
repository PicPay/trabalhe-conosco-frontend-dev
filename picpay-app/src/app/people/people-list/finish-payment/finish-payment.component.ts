import {Component, Input, NgModule, OnDestroy, OnInit} from '@angular/core';
import {PeopleModel} from '../../people.model';
import {Subscription} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {DialogBoxService} from '../dialog-box.service';
import {CreditCard} from '../../credit-card/credit-card.model';
import {DataPaymentModel} from '../../data-payment/data-payment.model';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-finish-payment',
  templateUrl: './finish-payment.component.html',
  styleUrls: ['./finish-payment.component.css']
})
export class FinishPaymentComponent implements OnInit, OnDestroy {
  @Input() closable = true;
  @Input() visible: boolean;
  person: PeopleModel;
  subs: Subscription;
  subsCreditCards: Subscription;
  subsIndex: Subscription;
  subsDataPayment: Subscription;
  dataPayment: DataPaymentModel;
  creditCards: CreditCard[];
  selectedCard: CreditCard;
  selectedCardIndex: number;

  constructor(private dialogBoxService: DialogBoxService) {
  this.dataPayment = null;
  this.creditCards = this.dialogBoxService.getCards();
  }


  ngOnInit() {
    this.subsDataPayment = this.dialogBoxService.dataPayment.subscribe(
      (dataPayment: DataPaymentModel) => {
        this.dataPayment = dataPayment;
      }
    );
    this.subsIndex = this.dialogBoxService.cardIndex.subscribe(
     (selectedCardIndex: number) => {
       this.selectedCardIndex = selectedCardIndex;
       this.selectedCard = this.creditCards[this.selectedCardIndex];
     }
   );
   this.subs = this.dialogBoxService.person.subscribe(
     (person: PeopleModel) => {
       this.person = person;

     }
   );

   this.subsCreditCards = this.dialogBoxService.changedCreditCards.subscribe(
     (creditCards: CreditCard[]) => {
      this.creditCards = creditCards;
     }
   );
  }

  close() {
    this.visible = false;
    this.dialogBoxService.onClickoutbox();
  }

  onPayAgain() {
   this.dialogBoxService.onClickoutbox();
   this.dialogBoxService.showDialog.next(true);
  }
  onComeBack() {
    this.close();
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
    this.subsIndex.unsubscribe();
    this.subsCreditCards.unsubscribe();
  }
}
