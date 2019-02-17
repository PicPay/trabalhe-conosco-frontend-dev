import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Pessoa } from '../model/pessoa.model';
import { Pagamento } from '../model/pagamento.model';

@Injectable()
export class TransacoesService {
  private options

  constructor(private http: HttpClient) {
    this.options = { headers: this.getHeaders() };
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return headers;
  }

  postPagamento(pagamento: Pagamento) {
    return this.http.post<Pagamento>('http://careers.picpay.com/tests/mobdev/transaction', JSON.stringify(pagamento), this.options)
  }


}
