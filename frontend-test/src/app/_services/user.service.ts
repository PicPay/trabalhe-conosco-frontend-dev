import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '@app/_models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  private usersUrl = 'http://careers.picpay.com/tests/mobdev/users';

  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

}
