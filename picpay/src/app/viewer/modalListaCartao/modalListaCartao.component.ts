import { Component, Input } from '@angular/core';
import { MzBaseModal, MzModalService } from 'ngx-materialize';
import { Cartao } from 'src/app/model/cartao.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ModalCadastroCartaoComponent } from '../modalCadastroCartao/modalCadastroCartao.component';
import { Pessoa } from 'src/app/model/pessoa.model';
import { ModalPagamentoComponent } from '../modalPagamento/modalPagamento.component';


@Component({
  selector: 'app-home',
  templateUrl: './modalListaCartao.component.html',
  styleUrls: ['./modalListaCartao.component.css']
})
export class ModalListaCartaoComponent extends MzBaseModal {
  cartoes: Cartao[] = [];
  @Input('options') selecionado: Pessoa
  cartaoSelecionado: number;


  constructor(
    private formBuilder: FormBuilder,
    private modalService: MzModalService,
  ) {
    super();
    if (JSON.parse(localStorage.getItem('key'))) {
      this.cartoes = JSON.parse(localStorage.getItem('key'));
      console.log(this.cartoes)
    }
  }

  ngOnInit() {
    this.cartaoSelecionado = 0;
    console.log(this.selecionado)
  }

  public openServiceModal(modal: string, pessoa?: Pessoa) {
    if (modal == 'cartao') {
      this.modalService.open(ModalCadastroCartaoComponent, { selecionado: this.selecionado});
    }
    if (modal == 'pagamento') {
      this.modalService.open(ModalPagamentoComponent, { selecionado: this.selecionado });
    }
  }

  seleciona(i: number) {
    this.cartaoSelecionado = i
  }

  salvaSelecionado() {
    let aux1, aux2
    aux1 = this.cartoes[0]
    aux2 = this.cartoes[this.cartaoSelecionado]
    this.cartoes[this.cartaoSelecionado] = aux1
    this.cartoes[0] = aux2
    localStorage.setItem('key', JSON.stringify(this.cartoes));
    this.openServiceModal('pagamento')
  }

}
