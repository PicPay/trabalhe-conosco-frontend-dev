import { Component, OnInit } from '@angular/core';
import { PessoaService } from 'src/app/services/pessoaService';
import { Pessoa } from 'src/app/model/pessoa.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'picpay';
  pessoas: Pessoa[];

  constructor(
    private pessoaService: PessoaService,
  ) { }

  ngOnInit() {
    this.pessoaService.getAllPessoa().subscribe(
      pessoas => (this.pessoas = pessoas))
  }
}
