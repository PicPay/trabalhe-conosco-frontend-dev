import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MzButtonModule, MzInputModule, MzCollectionModule, MzIconModule, MzIconMdiModule, MzNavbarModule, MzModalModule, MzMediaModule, MzSelectModule  } from 'ngx-materialize';
import { HomeComponent } from './viewer/home/home.component';
import { PessoaService } from './services/pessoaService';
import { ModalPagamentoComponent } from './viewer/modalPagamento/modalPagamento.component';
import { ModalCartaoComponent } from './viewer/modalCartao/modalCartao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModalPagamentoComponent,
    ModalCartaoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MzButtonModule,
    MzInputModule,
    MzCollectionModule,
    MzIconModule,
    MzIconMdiModule,
    MzNavbarModule,
    HttpClientModule,
    MzModalModule,
    MzMediaModule,
    MzSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [PessoaService],
  entryComponents: [ModalPagamentoComponent, ModalCartaoComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
