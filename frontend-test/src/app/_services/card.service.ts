import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Card } from '@app/_models/card';

@Injectable()
export class CardService {
  paymentUrl = 'http://careers.picpay.com/tests/mobdev/transaction';

  constructor(private http: HttpClient) { }

  private getLastFourNumber(number): any {
    return number.toString().slice(-4);
  }

  getCards() {
    const cards = JSON.parse(localStorage.getItem('cards'));

    return cards;
  }


  addCard(card) {
    const cardId = this.getLastFourNumber(card.card_number);
    const cards = this.getCards();

    switch (cards.length) {
      case 0:
      card.active = true;
      break;
      default:
      card.active = false;
      break;
    }

    cards.push(card);

    return localStorage.setItem('cards', JSON.stringify(cards));
  }

  saveCard(cards) {
    return localStorage.setItem('cards', JSON.stringify(cards));
  }

  pay(data): Observable<any> {
    return this.http.post(this.paymentUrl, data);
  }

}
