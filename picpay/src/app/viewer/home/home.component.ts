import { Component, OnInit } from '@angular/core';
import { PessoaService } from 'src/app/services/pessoaService';
import { Pessoa } from 'src/app/model/pessoa.model';
import { MzMediaService, MzModalService } from 'ngx-materialize';
import { Observable } from 'rxjs';
import { ModalPagamentoComponent } from 'src/app/viewer/modalPagamento/modalPagamento.component'
import { ModalCartaoComponent } from 'src/app/viewer/modalCartao/modalCartao.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'picpay';
  pessoas: Pessoa[];
  selecionado: Pessoa;
  public smallResolution: Observable<boolean>

  constructor(
    private pessoaService: PessoaService,
    private mediaService: MzMediaService,
    private modalService: MzModalService,
  ) {  }

  ngOnInit() {
    this.smallResolution = this.mediaService.isActive('s'); // small screen resolution
    this.pessoaService.getAllPessoa().subscribe(
      pessoas => (this.pessoas = pessoas))
  }

  public openServiceModal(modal: string, pessoa?: Pessoa) {
    if (modal == 'pagamento') {
      this.modalService.open(ModalPagamentoComponent, { selecionado: pessoa });
    }
    if (modal == 'cartao') {
      this.modalService.open(ModalCartaoComponent);
    }
  }

}
