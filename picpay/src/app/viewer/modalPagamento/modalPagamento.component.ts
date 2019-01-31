import { Component, Input } from '@angular/core';
import { Pessoa } from 'src/app/model/pessoa.model';
import { MzBaseModal, MzModalService } from 'ngx-materialize';
import { ModalCadastroCartaoComponent } from 'src/app/viewer/modalCadastroCartao/modalCadastroCartao.component';
import { Cartao } from 'src/app/model/cartao.model';
import { ModalListaCartaoComponent } from '../modalListaCartao/modalListaCartao.component';



@Component({
  selector: 'app-home',
  templateUrl: './modalPagamento.component.html',
  styleUrls: ['./modalPagamento.component.css']
})
export class ModalPagamentoComponent extends MzBaseModal {
  @Input('options') selecionado: Pessoa
  cartoes: Cartao[] = [] 

  constructor(
    private modalService: MzModalService,
  ) {
    super();


    if (JSON.parse(localStorage.getItem('key'))) {
      this.cartoes = JSON.parse(localStorage.getItem('key'));
    }
  }



  public openServiceModal(modal: string, pessoa?: Pessoa) {
    if (modal == 'cartao') {
      this.modalService.open(ModalCadastroCartaoComponent, { selecionado: this.selecionado} );
    }
    if (modal == 'lista') {
      this.modalService.open(ModalListaCartaoComponent, { selecionado: this.selecionado});
    }
  }

}
