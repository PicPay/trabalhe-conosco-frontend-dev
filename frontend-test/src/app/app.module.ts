import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxMaskModule } from 'ngx-mask';

import { AppRoutingModule } from '@app/app-routing.module';
import { MaterialModule } from '@app/material.module';

import { AppComponent } from '@app/app.component';
import { UsersComponent } from '@app/users/users.component';
import { PaymentComponent } from '@app/payment/payment.component';

import { UserService } from '@app/_services/user.service';
import { CardService } from '@app/_services/card.service';
import { PaymentService } from '@app/_services/payment.service';

import { CreditcardPipe } from '@app/_pipes/creditcard.pipe';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    PaymentComponent,
    CreditcardPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    CurrencyMaskModule,
    NgxMaskModule.forRoot(),
    MaterialModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    PaymentComponent
  ],
  providers: [UserService, CardService, PaymentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
