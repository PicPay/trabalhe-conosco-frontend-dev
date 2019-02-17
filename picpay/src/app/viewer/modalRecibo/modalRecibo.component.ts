import { Component, Input } from '@angular/core';
import { MzBaseModal, MzModalService, MzMediaService } from 'ngx-materialize';
import { Cartao } from 'src/app/model/cartao.model';
import { FormBuilder } from '@angular/forms';
import { Pessoa } from 'src/app/model/pessoa.model';
import { Modals } from 'src/app/model/modals.model';
import { Pagamento } from 'src/app/model/pagamento.model';
import { Recibo } from 'src/app/model/recibo.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './modalRecibo.component.html',
  styleUrls: ['./modalRecibo.component.css']
})
export class ModalReciboComponent extends MzBaseModal {
  cartoes: Cartao[] = [];
  modals: Modals = new Modals
  @Input('options') recibo: Recibo
  data: Date
  public smallResolution: Observable<boolean>


  constructor(
    private modalService: MzModalService,
    private mediaService: MzMediaService,
  ) {
    super();
    
    this.smallResolution = this.mediaService.isActive('s'); // small screen resolution
    if (JSON.parse(localStorage.getItem('key'))) {  //Se existir algum cartao recupera do localstorage o mesmo
      this.cartoes = JSON.parse(localStorage.getItem('key'));
    }
  }

  ngOnInit() {
    //conversao do timestamp para data
    this.data = new Date(this.recibo.transaction.timestamp*1000)
  }

  //Navegacao dos modals
  public openServiceModal(modal: string, pessoa?: Pessoa) {
    if (modal == 'pagamento') {
      this.modalService.open(this.modals.modalPagamento, { selecionado: this.recibo.transaction.destination_user });
    }
  }



}
