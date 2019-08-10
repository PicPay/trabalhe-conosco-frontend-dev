import { Component, OnInit } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: any = null;

  constructor(private _http: Http) {
    this.getUsers();
  }

  ngOnInit() {
  }

  private getUsers() {
    return this._http.get('http://careers.picpay.com/tests/mobdev/users')
    .map((res: Response) => res.json())
    .subscribe(user => {
      this.users = user;
      console.log(this.users);
    });
  }

}
