import { PaginaService } from './../services/paginaservice';
import { UserService } from './../services/userservice';
import { CartoesService } from './../services/cartoesservice';
import { UsersComponent } from './../users/users.component';
import { CartoesComponent } from './../cartoes/cartoes.component';
import { Cartao } from './../cartao';
import { Component, OnInit, Input, Output, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MaskModule } from 'soft-angular-mask';

@Component({
  selector: 'app-cartao',
  templateUrl: './cartao.component.html',
  styleUrls: ['./cartao.component.css']
})
export class CartaoComponent implements OnInit, OnDestroy {

  @Input() public cartao: Cartao;

  cartaoForm: FormGroup;

  bandeiras=["Visa", "Mastercard", "Elo"];

  constructor(public cartaoservice: CartoesService,
    public userservice: UserService,
    public pag: PaginaService) { 
    }

  printa(){
    console.log(this.cartaoForm);
  }

  ngOnInit() {
    this.cartao = new Cartao();
    console.log(this.cartaoservice.lista);
    this.cartaoForm = new FormGroup ({
      bandeira: new FormControl(this.bandeiras[0],Validators.required),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4)]),
       numero: new FormControl('',[Validators.required,Validators.maxLength(16)]),
       validade: new FormControl('',Validators.required),
       cod: new FormControl('',Validators.required),
       cep: new FormControl('',Validators.required)
    })
  }

  adicionacartao(){
    this.cartao = this.prepareSaveCartao();
    var aux = Object.assign({},this.cartao);
    this.cartaoservice.adiciona(aux);
    this.cartaoservice.cartao = aux;
    this.ngOnDestroy();
  }
  
  ngOnDestroy (){

  }
  alterapagina(pagina:number){
    this.pag.pagina=pagina;
  }
  prepareSaveCartao(): Cartao {
    const formModel = this.cartaoForm.value;

    const saveHero: Cartao = {
      bandeira : formModel.bandeira as string,
      name : formModel.name as string,
      numero : formModel.numero as string,
      validade : formModel.validade as string,
      cod : formModel.cod as number,
      cep : formModel.cep as string
    };
    return saveHero;
  }
  
}
