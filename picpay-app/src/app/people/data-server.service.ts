import { Injectable } from '@angular/core';
import {PeopleModel} from './people.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {FormGroup} from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getPeople() {
    return this.httpClient.get<PeopleModel[]>('http://careers.picpay.com/tests/mobdev/users');
  }
  sendPayment(form: FormGroup) {
    return this.httpClient.post(
      'http://careers.picpay.com/tests/mobdev/transaction'
      , form.value
      , { observe: 'body' }
      );
  }
}
