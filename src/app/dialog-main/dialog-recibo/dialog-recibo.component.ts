import { Component, OnInit, Inject, EventEmitter, Output, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DialogType } from './../../models/enums/dialog-type';

@Component({
  selector: 'app-dialog-recibo',
  templateUrl: './dialog-recibo.component.html',
  styleUrls: ['./dialog-recibo.component.scss']
})
export class DialogReciboComponent implements OnInit {

  private user;

  @Input() value: number;
  @Output() changePage = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DialogReciboComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = this.data.user;
  }

  ngOnInit() {
  }

  private closeDialog() {
    this.dialogRef.close();
  }

  private payAgain() {
    this.changePage.emit({ dialogType: DialogType.PAY });
  }

  private getCurrencyDate(): string {
    const date = new Date()
      .toLocaleString('pt-BR', { year: '2-digit', month: '2-digit', day: '2-digit' })
      .split(',')[0];

    return date;

  }

  private getTime(): string {
    const time = new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit' });

    return time;
  }

}
