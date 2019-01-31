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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MzValidationModule } from 'ngx-materialize'
import { BrMaskerModule } from 'br-mask';
import { ModalCadastroCartaoComponent } from './viewer/modalCadastroCartao/modalCadastroCartao.component';
import { ModalListaCartaoComponent } from './viewer/modalListaCartao/modalListaCartao.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModalPagamentoComponent,
    ModalCadastroCartaoComponent,
    ModalListaCartaoComponent
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
    MzValidationModule,
    BrMaskerModule,

  ],
  providers: [PessoaService],
  entryComponents: [ModalPagamentoComponent, ModalCadastroCartaoComponent, ModalListaCartaoComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
