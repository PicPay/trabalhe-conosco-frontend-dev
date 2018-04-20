import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Card } from '@app/_models/card';

@Injectable()
export class CardService {

  constructor() { }

  private getLastFourNumber(number): any {
    return number.toString().slice(-4);
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

    if (this.getCards().length === 0) {
      card.active = true;
    } else {
      card.active = false;
    }

    return localStorage.setItem(`card-${cardId}`, JSON.stringify(card));
  }

  selectCard(card) {
    const cardId = this.getLastFourNumber(card.card_number);

    if (card.active) {
      return;
    }

    this.getCards().filter(c => {
      if (c.active) {
        c.active = false;
        localStorage.setItem(`card-${this.getLastFourNumber(c.card_number)}`, JSON.stringify(c));
      } else if (!c.active) {
        card.active = true;
        localStorage.setItem(`card-${cardId}`, JSON.stringify(card));
      }
    });
  }

}
