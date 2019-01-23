import { Component, Input } from '@angular/core';
import { MzBaseModal } from 'ngx-materialize';
import { Cartao } from 'src/app/model/cartao.model';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './modalCartao.component.html',
  styleUrls: ['./modalCartao.component.css']
})
export class ModalCartaoComponent extends MzBaseModal {
  cartoes: Cartao[] = [] 
  cartaoForm: any

  constructor(
    private formBuilder: FormBuilder,
  ) {
    super();

    if (JSON.parse(localStorage.getItem('key'))) {
      this.cartoes = JSON.parse(localStorage.getItem('key'));
      console.log(this.cartoes)
    }

    this.cartaoForm = this.formBuilder.group({
      'numero': ['', Validators.required],
      'bandeira': ['', Validators.required],
      'validade': ['', Validators.required],
      'codigo': ['', [Validators.required, Validators.maxLength(3)]],
      'cep': ['', Validators.required],
      'nome': ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  save() {
    let temp = this.cartaoForm.value
    this.cartoes.push(temp)
    localStorage.setItem('key', JSON.stringify(this.cartoes));
  }

}
