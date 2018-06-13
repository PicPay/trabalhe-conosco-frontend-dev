import { ValorService } from './services/valorservice';
import { CartoesService } from './services/cartoesservice';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, PipeTransform } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './app-routing';
import { CurrencyPipe } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaskModule } from 'soft-angular-mask';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import {MatDialogModule} from '@angular/material';

import { PagamentoComponent } from './pagamento/pagamento.component';
import { CartaoComponent } from './cartao/cartao.component';
import { CartoesComponent } from './cartoes/cartoes.component';
import { UserService } from './services/userservice';
import { ComprovanteComponent } from './comprovante/comprovante.component';
import { DialogoComponent } from './dialogo/dialogo.component';
import { PaginaService } from './services/paginaservice';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    PagamentoComponent,
    CartaoComponent,
    CartoesComponent,
    DialogoComponent,
    ComprovanteComponent,
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    FormsModule,
    routing,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaskModule,
    HttpModule
  ],
  providers: [
    CurrencyPipe, 
    UserService, 
    CartoesService, 
    ValorService, 
    PaginaService,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    UsersComponent,DialogoComponent
  ],
})
export class AppModule { }
