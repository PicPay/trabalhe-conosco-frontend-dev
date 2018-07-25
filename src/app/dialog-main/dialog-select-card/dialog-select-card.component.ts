import { MatDialogRef } from '@angular/material';
import { DialogType } from './../../models/enums/dialog-type';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { CardService } from './../services/card.service';

@Component({
  selector: 'app-dialog-select-card',
  templateUrl: './dialog-select-card.component.html',
  styleUrls: ['./dialog-select-card.component.scss']
})
export class DialogSelectCardComponent implements OnInit {

  private cards;

  private favoriteCardPosition: number;

  @Output() changePage = new EventEmitter();

  constructor(
    private cardService: CardService,
    public dialogRef: MatDialogRef<DialogSelectCardComponent>,
  ) { }

  ngOnInit() {
    this.cards = this.cardService.getCards();
    this.favoriteCardPosition = this.cardService.getFavoriteCardPosition();
  }

  private changeFavoriteCard(index: number) {
    // this.cardService.setFavoriteCard(index);
    this.favoriteCardPosition = index;
  }

  private isFavorite(index: number) {
    return (index === this.favoriteCardPosition);
  }

  private clickRegisterCard() {
    this.changePage.emit({ dialogType: DialogType.REGISTER_CARD });
  }

  private selectFavoriteCard() {
    this.cardService.setFavoriteCard(this.favoriteCardPosition);
    this.changePage.emit({ dialogType: DialogType.PAY });
  }

  private closeDialog() {
    this.dialogRef.close();
  }

}
