import { ValorService } from './../services/valorservice';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Cartao } from './../cartao';

import { Component, OnInit, ViewChild, OnDestroy, Inject, ViewEncapsulation } from '@angular/core';
import { User } from '../user'
import { PagamentoComponent } from '../pagamento/pagamento.component';
import { UserService } from '../services/userservice';
import { CartoesService } from '../services/cartoesservice';
import { DialogoComponent } from '../dialogo/dialogo.component';
import { PaginaService } from '../services/paginaservice';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit,OnDestroy {
  users: User[];
  // usuario: User;
  urlPicPay = 'http://careers.picpay.com/tests/mobdev/users';
  public selectedUser: User;
  
  constructor( public dataservice: UserService,
    public dialog: MatDialog,
    public valorservice : ValorService,
    public pag : PaginaService
  ) { }
  
  async ngOnInit() {
    const response = await fetch(this.urlPicPay)
    const usersJson = await response.json()
    this.users = usersJson
    this.valorservice.valor=0;
  }
  
  onSelect(user: User): void {
    this.selectedUser = user;
  }
  printa(usuario:User){
    console.log(usuario);
  }
  ngOnDestroy() {
    this.dataservice.user = this.selectedUser;
  }
  openDialog(): void{
    this.pag.pagina = 1;
    this.dataservice.user = this.selectedUser;
    let dialogRef = this.dialog.open(DialogoComponent,{
      width: '640px',
      height: '587px',
      panelClass: 'my-dialog',
      data: {user: this.selectedUser}
    });
    this.pag.dialogo = dialogRef;
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog fechado'); 
    });
  }
  
}

