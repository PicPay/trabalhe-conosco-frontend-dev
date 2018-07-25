import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';

import { HeaderPicpayComponent } from './../header-picpay/header-picpay.component';
import { ListUsersService } from './services/list-users.service';
import { DialogMainComponent } from './../dialog-main/dialog-main.component';

import { User } from './../models/user';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
  providers: [ListUsersService],
})
export class ListUsersComponent implements OnInit {

  private heightPage: number;
  private subs: Subscription;
  private users: Array<User>;

  constructor(
    private listUserService: ListUsersService,
    public dialog: MatDialog
  ) {

  }

  public ngOnInit() {
    this.heightPage = this.setPageHeight();
    this.subs = this.listUserService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  public ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public onResize(event) {
    this.heightPage = this.setPageHeight();
  }

  private payToUser(_user: User) {
    let dialogRef = this.dialog.open(DialogMainComponent, {
      height: '472px',
      width: '640px',
      panelClass: 'custom-dialog-container',
      data: { user: _user }
    });
  }

  private setPageHeight() {
    return window.innerHeight - HeaderPicpayComponent.HEADER_HEIGHT;
  }

}
