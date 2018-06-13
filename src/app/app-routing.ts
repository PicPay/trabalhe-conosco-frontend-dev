import { ComprovanteComponent } from './comprovante/comprovante.component';
import { CartaoComponent } from './cartao/cartao.component';
import { CartoesComponent } from './cartoes/cartoes.component';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { UsersComponent } from './users/users.component';

import { Routes, Router, RouterModule } from "@angular/router";
import { ModuleWithProviders } from '@angular/core';

const APP_ROUTES : Routes = [
    {path: '', component: UsersComponent},
    {path: 'pagamento/:id', component: PagamentoComponent},
    {path: 'cartoes', component: CartoesComponent},
    {path: 'cadastrar', component: CartaoComponent},
    {path: 'comprovante', component: ComprovanteComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);