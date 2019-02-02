import { ModalCadastroCartaoComponent } from 'src/app/viewer/modalCadastroCartao/modalCadastroCartao.component';
import { ModalListaCartaoComponent } from 'src/app/viewer/modalListaCartao/modalListaCartao.component';
import { ModalPagamentoComponent } from 'src/app/viewer/modalPagamento/modalPagamento.component';
import { ModalReciboComponent } from '../viewer/modalRecibo/modalRecibo.component';


export class Modals {
  modalCadastroCartao = ModalCadastroCartaoComponent
  modalListaCartao = ModalListaCartaoComponent
  modalPagamento = ModalPagamentoComponent
  modalRecibo = ModalReciboComponent
  constructor(
  ) {
}
}
