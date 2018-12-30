import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MzButtonModule, MzInputModule, MzCollectionModule, MzIconModule, MzIconMdiModule, MzNavbarModule } from 'ngx-materialize';
import { HomeComponent } from './viewer/home/home.component';
import { PessoaService } from './services/pessoaService';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
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
  ],
  providers: [PessoaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
