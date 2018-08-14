export class CreditCard {
  public flag: string;
  public name: string;
  public number: string;
  public end_numbers: string;
  public validate: string;
  public securityCode: number;
  public CEP: number;

  constructor(flag: string, name: string, number: string, end_numbers: string, validate: string, securityCode: number, CEP: number) {
    this.flag = flag;
    this.name = name;
    this.number = number;
    this.validate = validate;
    this.securityCode = securityCode;
    this.CEP = CEP;
    this.end_numbers = end_numbers;
  }
}
