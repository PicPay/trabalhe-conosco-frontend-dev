import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import { AppRoutingModule } from '@app/app-routing.module';
import { MaterialModule } from '@app/material.module';

import { AppComponent } from '@app/app.component';
import { UsersComponent } from '@app/users/users.component';
import { PaymentComponent } from '@app/payment/payment.component';

import { UserService } from '@app/_services/user.service';

import { AutofocusDirective } from '@app/_directives/autofocus.directive';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    PaymentComponent,
    AutofocusDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    CurrencyMaskModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    PaymentComponent
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
