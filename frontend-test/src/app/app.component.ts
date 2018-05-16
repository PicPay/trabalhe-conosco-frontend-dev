import { Component } from '@angular/core';
import { CardService } from '@app/_services/card.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private cardService: CardService) {
    const cards = this.cardService.getCards();

    if (cards === null) {
      localStorage.setItem('cards', JSON.stringify([]));
    }
  }
}
