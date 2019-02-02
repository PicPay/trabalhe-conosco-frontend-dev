import { Component, Input } from '@angular/core';
import { MzBaseModal, MzModalService } from 'ngx-materialize';
import { Cartao } from 'src/app/model/cartao.model';
import { Pessoa } from 'src/app/model/pessoa.model';
import { Modals } from 'src/app/model/modals.model';


@Component({
  selector: 'app-home',
  templateUrl: './modalListaCartao.component.html',
  styleUrls: ['./modalListaCartao.component.css']
})
export class ModalListaCartaoComponent extends MzBaseModal {
  cartoes: Cartao[] = [];
  modals: Modals = new Modals
  @Input('options') selecionado: Pessoa
  cartaoSelecionado: number;


  constructor(

    private modalService: MzModalService,
  ) {
    super();
    if (JSON.parse(localStorage.getItem('key'))) {
      this.cartoes = JSON.parse(localStorage.getItem('key'));
    }
  }

  ngOnInit() {
    this.cartaoSelecionado = 0;
  }

  public openServiceModal(modal: string, pessoa?: Pessoa) {
    if (modal == 'cartao') {
      this.modalService.open(this.modals.modalCadastroCartao, { selecionado: this.selecionado});
    }
    if (modal == 'pagamento') {
      this.modalService.open(this.modals.modalPagamento, { selecionado: this.selecionado });
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
