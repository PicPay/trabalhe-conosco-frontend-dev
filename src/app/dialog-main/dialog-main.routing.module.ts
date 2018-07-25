import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [];


@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [RouterModule]
})
export class DialogMainRoutingModule {  }