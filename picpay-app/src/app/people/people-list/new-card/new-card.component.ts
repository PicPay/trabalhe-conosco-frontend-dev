import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DialogBoxService} from '../dialog-box.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PeopleModel} from '../../people.model';
import {Subscription} from 'rxjs';
import {CreditCard} from '../../credit-card/credit-card.model';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.css']
})
export class NewCardComponent implements OnInit, OnDestroy {

  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  newCardForm: FormGroup;
  person: PeopleModel;
  subs: Subscription;

  constructor(private dialogBoxService: DialogBoxService) { }

  ngOnInit() {
    this.subs = this.dialogBoxService.person.subscribe(
     (person: PeopleModel) => {
       this.person = person;
    this.initForm();
  });
  }
  initForm() {
    const bandeira = '';
    const nomeEscritoCartao = '';
    const numeroCartao = '';
    const validade = '';
    const codigoSeguranca = '';
    const CEP = '';

    this.newCardForm = new FormGroup({
      'bandeira': new FormControl(bandeira, [Validators.required,
        Validators.pattern(/^[A-Za-z0-9 ]*$/)]),
      'nomeEscritoCartao': new FormControl(nomeEscritoCartao, [Validators.required,
      Validators.pattern(/^[A-Za-z0-9 ]*$/)]),
      'validade': new FormControl(validade, [Validators.required,
        Validators.pattern(/^(0[1-9]{1}|1[0-2]{1})\/\d{4}$/)]),
      'codigoSeguranca': new FormControl(codigoSeguranca, [Validators.required,
      Validators.pattern(/^([0-9]){3}$/)]),
      'numeroCartao': new FormControl(numeroCartao, [Validators.required,
      Validators.pattern(/^[0-9]{16}$/)]),
      'CEP': new FormControl(CEP, [Validators.required,
        Validators.pattern(/^[0-9]{8}$/)]),
    }
    );
  }
  close() {
    this.visible = false;
    this.dialogBoxService.onClickoutbox();
    this.newCardForm.reset();
  }


  onSubmit() {
    const cardNumber: string = this.newCardForm.value['numeroCartao'].toString();
    const end_numbers = cardNumber.substring(cardNumber.length - 4);
    const newCard = new CreditCard(
      this.newCardForm.value['bandeira'],
      this.newCardForm.value['nomeEscritoCartao'],
      cardNumber,
      end_numbers,
      this.newCardForm.value['validade'],
      this.newCardForm.value['codigoSeguranca'],
      this.newCardForm.value['CEP'],
    );
    this.dialogBoxService.addNewCard(newCard);
    this.dialogBoxService.onClickoutbox();
    this.dialogBoxService.showDialog.next(true);
    this.newCardForm.reset();
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
