import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

import { CardService } from '@app/_services/card.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private cardService: CardService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('dollar_icon', sanitizer.bypassSecurityTrustResourceUrl('assets/dollar.svg'));
    iconRegistry.addSvgIcon('picpay_light', sanitizer.bypassSecurityTrustResourceUrl('assets/picpay.svg'));

    const cards = this.cardService.getCards();

    if (cards === null) {
      localStorage.setItem('cards', JSON.stringify([]));
    }
  }
}
