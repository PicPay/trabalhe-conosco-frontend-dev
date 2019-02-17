import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Pessoa } from '../model/pessoa.model';

@Injectable()
export class PessoaService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };


  constructor(public http: HttpClient) { }



  getAllPessoa() {
    return this.http.get<Pessoa[]>(`http://careers.picpay.com/tests/mobdev/users`);
  }

}
