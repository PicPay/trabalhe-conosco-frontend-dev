import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { User } from '@app/_models/user';
import { UserService } from '@app/_services/user.service';

import { PaymentComponent } from '@app/payment/payment.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[];

  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  pay(user): void {
    const dialogRef = this.dialog.open(PaymentComponent, {
      width: '640px',
      data: { user }
    });
  }

}
