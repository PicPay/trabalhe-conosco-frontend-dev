import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from './../../models/user';

@Injectable()
export class ListUsersService {

  private url: string;

  constructor(private http: HttpClient) { 
    this.url = 'http://careers.picpay.com/tests/mobdev/users';
  }

  public getUsers(): Observable<Array<User>>{
    return this.http.get<Array<User>>(this.url);
  }

}
