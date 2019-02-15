import { Component, Input } from '@angular/core';
import { Pessoa } from 'src/app/model/pessoa.model';
import { Cartao } from 'src/app/model/cartao.model';
import { MzBaseModal, MzModalService, MzMediaService } from 'ngx-materialize';
import { Modals } from 'src/app/model/modals.model';
import { Pagamento } from 'src/app/model/pagamento.model';
import { TransacoesService } from 'src/app/services/transacoesService';
import { Recibo } from 'src/app/model/recibo.model';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './modalPagamento.component.html',
  styleUrls: ['./modalPagamento.component.css']
})
export class ModalPagamentoComponent extends MzBaseModal {
  @Input('options') selecionado: Pessoa
  cartoes: Cartao[] = []
  modals: Modals = new Modals()
  valor: number = null
  recibo: Recibo
  pagamento: Pagamento = new Pagamento
  public smallResolution: Observable<boolean>

  constructor(
    private modalService: MzModalService,
    private transacoesService: TransacoesService,
    private mediaService: MzMediaService,

  ) {
    super();
    this.smallResolution = this.mediaService.isActive('s'); // small screen resolution
    if (JSON.parse(localStorage.getItem('key'))) {
      this.cartoes = JSON.parse(localStorage.getItem('key'));
    }
  }



  public openServiceModal(modal: string, pessoa?: Pessoa) {
    if (modal == 'cartao') {
      this.modalService.open(this.modals.modalCadastroCartao, { selecionado: this.selecionado });
    }
    if (modal == 'lista') {
      this.modalService.open(this.modals.modalListaCartao, { selecionado: this.selecionado});
    }
    if (modal == 'recibo') {
      this.modalService.open(this.modals.modalRecibo, { recibo: this.recibo});
    }
  }

  pagar() {
    let request
    if (this.cartoes.length > 0) {
      this.pagamento.card_number = this.apenasNumeros(this.cartoes[0].card_number)
      this.pagamento.cvv = this.cartoes[0].cvv
      this.pagamento.destination_user_id = this.selecionado.id
      this.pagamento.expiry_date = this.cartoes[0].expiry_date
      this.pagamento.value = this.valor
      request = this.transacoesService.postPagamento(this.pagamento)
      request.subscribe(
        suc => {
          this.recibo = suc
          this.openServiceModal('recibo')   
        },
        err => {
          console.log(err);
        });
    }
    else {
      this.openServiceModal('cartao')
    }
  }


  apenasNumeros(campo) {
    campo = campo.replace(/[^0-9]/g, '');
    return campo;
  }

}
