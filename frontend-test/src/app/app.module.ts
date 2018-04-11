import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from '@app/app-routing.module';
import { MaterialModule } from '@app/material.module';
import { AppComponent } from '@app/app.component';

import { UserService } from '@app/user/user.service';
import { UsersComponent } from '@app/users/users.component';
import { PaymentComponent } from '@app/payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
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
