import { Component, Input } from '@angular/core';
import { MzBaseModal, MzModalService } from 'ngx-materialize';
import { Cartao } from 'src/app/model/cartao.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Pessoa } from 'src/app/model/pessoa.model';
import { ModalPagamentoComponent } from '../modalPagamento/modalPagamento.component';
import { ModalListaCartaoComponent } from '../modalListaCartao/modalListaCartao.component';


@Component({
  selector: 'app-home',
  templateUrl: './modalCadastroCartao.component.html',
  styleUrls: ['./modalCadastroCartao.component.css']
})
export class ModalCadastroCartaoComponent extends MzBaseModal {
  cartoes: Cartao[] = [] 
  cartaoForm: any
  @Input('options') selecionado: Pessoa



  constructor(
    private formBuilder: FormBuilder,
    private modalService: MzModalService,
  ) {
    super();

    if (JSON.parse(localStorage.getItem('key'))) {
      this.cartoes = JSON.parse(localStorage.getItem('key'));
      console.log(this.cartoes)
    }

    this.cartaoForm = this.formBuilder.group({
      'card_number': ['', Validators.required],
      'bandeira': ['', Validators.required],
      'expiry_date': [null, Validators.required],
      'cvv': ['', [Validators.required]],
      'cep': ['', Validators.required],
      'nome': ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  save(modal) {
    if (this.cartaoForm.valid) {
      let temp = this.cartaoForm.value
      //temp.card_number = this.apenasNumeros(temp.card_number)

      this.cartoes.push(temp)
      localStorage.setItem('key', JSON.stringify(this.cartoes));
      if (this.cartoes.length > 1) {
        this.openServiceModal('lista')
      }
      else {
        this.openServiceModal('pagamento')
      }
     
      modal.closeModal()
    }
  }

  apenasNumeros(campo) {
    campo = campo.replace(/[^0-9]/g, '');
    return campo;
  }

  public openServiceModal(modal: string, pessoa?: Pessoa) {
    if (modal == 'pagamento') {
      this.modalService.open(ModalPagamentoComponent, { selecionado: this.selecionado });
    }
    if (modal == 'lista') {
      this.modalService.open(ModalListaCartaoComponent, { selecionado: this.selecionado });
    }
  }


  

}
