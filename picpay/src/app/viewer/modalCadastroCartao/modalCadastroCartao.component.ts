import { Component, Input } from '@angular/core';
import { MzBaseModal, MzModalService, MzMediaService } from 'ngx-materialize';
import { Cartao } from 'src/app/model/cartao.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Pessoa } from 'src/app/model/pessoa.model';
import { Modals } from 'src/app/model/modals.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './modalCadastroCartao.component.html',
  styleUrls: ['./modalCadastroCartao.component.css']
})
export class ModalCadastroCartaoComponent extends MzBaseModal {
  modals: Modals = new Modals
  cartoes: Cartao[] = [] 
  cartaoForm: any
  @Input('options') selecionado: Pessoa
  public smallResolution: Observable<boolean>



  constructor(
    private formBuilder: FormBuilder,
    private modalService: MzModalService,
    private mediaService: MzMediaService,
  ) {
    super();
    this.smallResolution = this.mediaService.isActive('s'); // small screen resolution
    if (JSON.parse(localStorage.getItem('key'))) { //Se existir algum cartao recupera do localstorage o mesmo
      this.cartoes = JSON.parse(localStorage.getItem('key'));
    }

    //formulario do cartao
    this.cartaoForm = this.formBuilder.group({
      'card_number': ['', Validators.required],
      'bandeira': ['', Validators.required],
      'expiry_date': [null, Validators.required],
      'cvv': ['', [Validators.required]],
      'cep': ['', Validators.required],
      'nome': ['', [Validators.required, Validators.minLength(2)]]
    });
  }


  //Salva os cartoes no localstorage
  save(modal) {
    if (this.cartaoForm.valid) {
      let temp = this.cartaoForm.value
      this.cartoes.push(temp)
      localStorage.setItem('key', JSON.stringify(this.cartoes));
      this.navegate(modal)
    }
  }

  //funcao usada para fechar um modal apos a navegacao e direcionar para o modal correto de navegacao pelo html
  navegate(modal) {
    if (this.cartoes.length > 0) {
      this.openServiceModal('lista')
    }
    else {
      this.openServiceModal('pagamento')
    }
    modal.closeModal()
  }


  //navegacao pelos modals
  public openServiceModal(modal: string, pessoa?: Pessoa) {
    if (modal == 'pagamento') {
      this.modalService.open(this.modals.modalPagamento, { selecionado: this.selecionado });
    }
    if (modal == 'lista') {
      this.modalService.open(this.modals.modalListaCartao, { selecionado: this.selecionado });
    }
  }


  

}
