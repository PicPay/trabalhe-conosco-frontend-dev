import { PaginaService } from './../services/paginaservice';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/userservice';
import { User } from '../user';
import { CartoesService } from '../services/cartoesservice';
import { ValorService } from '../services/valorservice';
import { HttpHeaders,HttpClient, HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Dados } from '../dados';
import { Http } from '@angular/http';

@Component({
  selector: 'app-comprovante',
  templateUrl: './comprovante.component.html',
  styleUrls: ['./comprovante.component.css']
})
export class ComprovanteComponent implements OnInit {

  diamesano:string = "";
  tempo:string = "";
  dados : Dados;
  valores;
  pagamento:string;
  selectedUser:User;
  finaldocartao;
  posturl = "http://careers.picpay.com/tests/mobdev/transaction";

  constructor(public userservice: UserService,
    public cartoesservice : CartoesService,
    public valorservice : ValorService,
    public pag: PaginaService,
    private http: Http
  ) { 
    this.dados = new Dados ();
  }

  ngOnInit() {
    this.selectedUser = this.userservice.user;
    
    if(this.cartoesservice.cartao && this.cartoesservice.cartao.numero == "1111111111111111"){
      this.pagamento="Pagamento Confirmado!";
      this.pegadata();
      this.valorservice.transacao = this.valorservice.transacao + 1;
      this.finaldocartao = this.cartoesservice.cartao.numero.slice(-4); 
      this.dados.card_number = this.cartoesservice.cartao.numero;
      this.dados.cvv = this.cartoesservice.cartao.cod;
      this.dados.value = parseFloat(this.valorservice.valor);
      this.dados.expiry_date = "01/18";
      this.dados.destination_user_id = this.selectedUser.id;

      this.http.post(this.posturl, JSON.stringify(this.dados))
        .map(res => res)
        .subscribe(data => console.log(data));

    }else{
      this.pagamento="Pagamento não aceito. Insira um cartão válido."
      console.log(this.cartoesservice.cartao);
    }
    
    
  }
  alterapagina(pagina:number){
    this.pag.pagina=pagina;
  }
  fecha(){
    this.pag.dialogo.close();
  }
  pegadata(){
    let d = new Date();
    
    if (d.getDate() < 10) this.diamesano = "0";
    this.diamesano += d.getDate() + "/";
    if(d.getMonth() < 10) this.diamesano += "0";
    this.diamesano += d.getMonth() + "/" + (d.getFullYear() - 2000);
    
    if (d.getHours() < 10) this.tempo = "0";
    this.tempo += d.getHours() + ":";
    if (d.getMinutes() < 10) this.tempo += "0";
    this.tempo += d.getMinutes();
  }

}
