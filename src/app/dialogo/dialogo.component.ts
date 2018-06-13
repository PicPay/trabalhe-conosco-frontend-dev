import { PaginaService } from './../services/paginaservice';
import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../user';
import { UserService } from '../services/userservice';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CartoesService } from '../services/cartoesservice';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css']
})
export class DialogoComponent implements OnInit {

  user:User;
  constructor(public selectedUser: UserService,public cartoesservice : CartoesService,
    public pag : PaginaService,
    public dialogRef: MatDialogRef<DialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
    this.pag.pagina=0;
  }
  ngOnInit(){
    this.user = this.selectedUser.user;
  }
  fecha(){
    this.dialogRef.close();
    this.pag.pagina=0;
  }
}
