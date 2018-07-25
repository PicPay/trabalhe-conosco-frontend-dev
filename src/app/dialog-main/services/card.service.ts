import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CardService {

  private creditCard = [
    { brand: 'Visa' },
    { brand: 'Mastercard' },
    { brand: 'American Express' },
    { brand: 'Elo' },
    { brand: 'Hipercard' },
    { brand: 'Diners Club' }
  ];

  private cards: Array<any> = [];

  private favoriteCard: number;

  private URL: string;

  constructor(
    private http: HttpClient
  ) {
    this.cards = JSON.parse(localStorage.getItem('cards'));
    this.favoriteCard = JSON.parse(localStorage.getItem('favoriteCard'));

    this.URL = 'http://careers.picpay.com/tests/mobdev/transaction';
  }

  public addCard(card) {

    if (!this.cards) {
      this.cards = [];
    }

    this.cards.push(card);

    localStorage.setItem('cards', JSON.stringify(this.cards));

  }

  public getCards() {
    return this.cards;
  }

  public getLengthCards(): number {

    if (!this.cards) return 0;

    return this.cards.length;

  }

  public getFavoriteCard() {
    return this.cards[this.favoriteCard];
  }

  public getFavoriteCardPosition() {
    return this.favoriteCard;
  }

  public setFavoriteCard(cardPosition: number) {
    this.favoriteCard = cardPosition;
    localStorage.setItem('favoriteCard', JSON.stringify(cardPosition));
  }

  public getCreditCardBrands() {
    return this.creditCard;
  }

  public pay(body) {
    return this.http.post(this.URL, body);
  }

}
