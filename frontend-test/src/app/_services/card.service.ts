import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Card } from '@app/_models/card';

@Injectable()
export class CardService {

  constructor() { }

  private getLastFourNumber(number) {
    return +(number.toString().slice(-4));
  }

  getCards() {
    const cards = [];
    for (let i = 0, len = localStorage.length; i < len; ++i) {
      const card = JSON.parse(localStorage.getItem(localStorage.key(i)));
      cards.push(card);
    }
    return cards;
  }


  addCard(card) {
    const cardId = this.getLastFourNumber(card.card_number);

    return localStorage.setItem(`card-${cardId}`, JSON.stringify(card));
  }

}
