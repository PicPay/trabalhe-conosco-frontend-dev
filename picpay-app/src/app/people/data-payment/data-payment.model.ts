export class DataPaymentModel  {
  transaction: string;
  date: Date;
  cardEndNumber: string;
  value: string;
  constructor(transaction: string, date: Date, cardEndNumber: string, value: string) {
    this.transaction = transaction;
    this.date = date;
    this.cardEndNumber = cardEndNumber;
    this.value = value;
  }
}
