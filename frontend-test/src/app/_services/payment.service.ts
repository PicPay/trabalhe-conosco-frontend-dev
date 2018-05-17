import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PaymentService {
  paymentUrl = 'http://careers.picpay.com/tests/mobdev/transaction';

  constructor(private http: HttpClient) { }

  pay(data): Observable<any> {
    return this.http.post(this.paymentUrl, data);
  }

}
