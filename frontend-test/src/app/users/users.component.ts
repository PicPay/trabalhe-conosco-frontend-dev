import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatDialog } from '@angular/material';

import { User } from '@app/user/user';
import { UserService } from '@app/user/user.service';

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
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) {
    iconRegistry.addSvgIcon('dollar-icon', sanitizer.bypassSecurityTrustResourceUrl('assets/dollar.svg'));
  }

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

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
