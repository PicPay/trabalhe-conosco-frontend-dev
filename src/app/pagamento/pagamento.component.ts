import { PaginaService } from './../services/paginaservice';
import { ValorService } from './../services/valorservice';
import { CartoesService } from './../services/cartoesservice';
import { Cartao } from './../cartao';
import { Router } from '@angular/router';
import { CartoesComponent } from './../cartoes/cartoes.component';
import { UsersComponent } from './../users/users.component';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/userservice';
import { MaskModule } from 'soft-angular-mask';


@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit, OnDestroy {

  
  pagamento = "R$ 0,00";
  finaldocartao:string="";

  private selectedUser : User
  constructor(public dataservice: UserService, 
    public cartoesservice : CartoesService, 
    public valorservice : ValorService,
    public pag: PaginaService, ) {}

  ngOnInit() {
    this.selectedUser = this.dataservice.user;
    console.log(this.selectedUser);
    console.log(this.cartoesservice.lista);
    if (this.cartoesservice.cartao){
      this.finaldocartao = this.cartoesservice.cartao.numero.slice(-4);
    }
    

  }
  ngOnDestroy(){

  }
  dinheiro(){
    console.log("money:");
    console.log(this.pagamento);
    this.valorservice.valor = this.pagamento;
  }

  alterapagina(pagina:number){
    if(pagina==4 && (!this.cartoesservice.cartao || this.pagamento=="0")) return;
    this.pag.pagina=pagina;
  }
  pagamentoatualiza(valor){
    if (valor){
      this.pagamento = valor
    } else {
      this.pagamento = "R$ 0,00"
    }
  }
}
