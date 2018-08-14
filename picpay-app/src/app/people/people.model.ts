import {CreditCard} from './credit-card/credit-card.model';

export class PeopleModel {
  public id: number;
  public name: string;
  public img: string;
  public username: string;

  constructor(id: number, name: string, img: string, username: string) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.username = username;
  }
}
