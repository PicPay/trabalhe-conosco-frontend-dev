import { Component, Input } from '@angular/core';
import { MzBaseModal, MzModalService } from 'ngx-materialize';
import { Cartao } from 'src/app/model/cartao.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Pessoa } from 'src/app/model/pessoa.model';
import { Modals } from 'src/app/model/modals.model';


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



  constructor(
    private formBuilder: FormBuilder,
    private modalService: MzModalService,
  ) {
    super();

    if (JSON.parse(localStorage.getItem('key'))) {
      this.cartoes = JSON.parse(localStorage.getItem('key'));
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



  public openServiceModal(modal: string, pessoa?: Pessoa) {
    if (modal == 'pagamento') {
      this.modalService.open(this.modals.modalPagamento, { selecionado: this.selecionado });
    }
    if (modal == 'lista') {
      this.modalService.open(this.modals.modalListaCartao, { selecionado: this.selecionado });
    }
  }


  

}
