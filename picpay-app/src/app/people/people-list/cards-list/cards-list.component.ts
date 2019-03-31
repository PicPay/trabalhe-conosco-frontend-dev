import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DialogBoxService} from '../dialog-box.service';
import {CreditCard} from '../../credit-card/credit-card.model';
import {PeopleModel} from '../../people.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.css']
})
export class CardsListComponent implements OnInit, OnDestroy {
  @Input() closable = true;
  @Input() visible: boolean;
  subsCreditCards: Subscription;
  subsIndex: Subscription;
  creditCards: CreditCard[];
  selectedCardIndex: number;
  constructor(private dialogBoxService: DialogBoxService) {
    this.creditCards = this.dialogBoxService.getCards();
    if  (localStorage.length > 0) {
      this.selectedCardIndex = localStorage.length - 1;
    }
  }

  ngOnInit() {
    this.subsIndex = this.dialogBoxService.cardIndex.subscribe(
     (selectedCardIndex: number) => {
       this.selectedCardIndex = selectedCardIndex;
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
  onAddNewCard() {
    this.dialogBoxService.onClickoutbox();
    this.dialogBoxService.showNewCard.next(true);
  }
  onClickCard(index: number) {

    this.dialogBoxService.cardIndex.next(index);
  }
  onSelecCard() {
    this.dialogBoxService.onClickoutbox();
    this.dialogBoxService.showDialog.next(true);
  }
  ngOnDestroy() {
    this.subsIndex.unsubscribe();
    this.subsCreditCards.unsubscribe();
  }
}
