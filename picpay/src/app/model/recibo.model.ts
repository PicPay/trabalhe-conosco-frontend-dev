import { Pessoa } from "./pessoa.model";

export class Recibo {
  transaction: {
    id: number;
    timestamp: number;
    value: number;
    destination_user: Pessoa;
    success: boolean
    status: string
  }
  constructor() { }
}
