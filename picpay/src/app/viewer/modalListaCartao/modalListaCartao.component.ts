import { Component, Input } from '@angular/core';
import { MzBaseModal, MzModalService, MzMediaService } from 'ngx-materialize';
import { Cartao } from 'src/app/model/cartao.model';
import { Pessoa } from 'src/app/model/pessoa.model';
import { Modals } from 'src/app/model/modals.model';
import { Observable } from 'rxjs';


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
  public smallResolution: Observable<boolean>


  constructor(
    private modalService: MzModalService,
    private mediaService: MzMediaService,
  ) {
    super();
    this.smallResolution = this.mediaService.isActive('s'); // small screen resolution
    if (JSON.parse(localStorage.getItem('key'))) { //Se existir algum cartao recupera do localstorage o mesmo
      this.cartoes = JSON.parse(localStorage.getItem('key'));
    }
  }

  ngOnInit() {
    this.cartaoSelecionado = 0;
  }

  //Navegacao pelos modals
  public openServiceModal(modal: string, pessoa?: Pessoa) {
    if (modal == 'cartao') {
      this.modalService.open(this.modals.modalCadastroCartao, { selecionado: this.selecionado});
    }
    if (modal == 'pagamento') {
      this.modalService.open(this.modals.modalPagamento, { selecionado: this.selecionado });
    }
  }

  //salva a posicao do cartao selecionada
  seleciona(i: number) {
    this.cartaoSelecionado = i
  }

  // salva o cartao selecionado no localstorage
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
