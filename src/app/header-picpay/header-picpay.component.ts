import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-picpay',
  templateUrl: './header-picpay.component.html',
  styleUrls: ['./header-picpay.component.scss']
})
export class HeaderPicpayComponent implements OnInit {

  public static HEADER_HEIGHT;

  constructor() { }

  ngOnInit() {
    HeaderPicpayComponent.HEADER_HEIGHT = document.getElementById("headerId").offsetHeight;
  }

}
