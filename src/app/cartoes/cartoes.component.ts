import { PaginaService } from './../services/paginaservice';
import { ValorService } from './../services/valorservice';
import { UserService } from './../services/userservice';
import { CartoesService } from './../services/cartoesservice';
import { CartaoComponent } from './../cartao/cartao.component';
import { Cartao } from './../cartao';
import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-cartoes',
  templateUrl: './cartoes.component.html',
  styleUrls: ['./cartoes.component.css']
})
export class CartoesComponent implements OnInit, OnDestroy {

  precartao=null;
  constructor(public cartoesservice : CartoesService, 
    public userservice: UserService, 
    public valorservice : ValorService, 
    public pag: PaginaService) {
    
  }

  ngOnInit() {
    this.valorservice.valor=0;
  }
  onSelect(cartao:Cartao):void{
    if (cartao){
      this.cartoesservice.cartao = cartao;
    }
  }
  ngOnDestroy(): void {
    console.log(this.cartoesservice.lista);
  }
  preSelect(cartao){
    this.precartao=cartao;
  }
  alterapagina(pagina:number){
    this.pag.pagina=pagina;
  }

}
