import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Card } from '@app/_models/card';

@Injectable()
export class CardService {

  constructor() { }

  getCards() {
    return JSON.parse(localStorage.getItem('cards'));
  }

  addCard(card) {
    console.log(card);
    JSON.stringify(localStorage.setItem('cards', card));
  }

}
