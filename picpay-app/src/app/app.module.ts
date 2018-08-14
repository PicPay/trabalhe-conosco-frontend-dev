import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PeopleItemComponent } from './people/people-list/people-item/people-item.component';
import {DataService} from './people/data-server.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DialogComponent } from './people/people-list/dialog/dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogBoxService} from './people/people-list/dialog-box.service';
import { NewCardComponent } from './people/people-list/new-card/new-card.component';
import { CardsListComponent } from './people/people-list/cards-list/cards-list.component';
import { FinishPaymentComponent } from './people/people-list/finish-payment/finish-payment.component';
import {MaterialModule} from './material.module';
import {PeopleListComponent} from './people/people-list/people-list.component';

@NgModule({

  declarations: [
    AppComponent,
    PeopleListComponent,
    PeopleItemComponent,
    DialogComponent,
    NewCardComponent,
    CardsListComponent,
    FinishPaymentComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [DataService, DialogBoxService],

  bootstrap: [AppComponent]
})
export class AppModule {

}
