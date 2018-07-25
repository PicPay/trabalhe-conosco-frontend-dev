import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatIconRegistry,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    PERFECT_SCROLLBAR_CONFIG,
    PerfectScrollbarConfigInterface,
    PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';

import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import { ToastrModule } from 'ngx-toastr';

import { MaskModule } from 'soft-angular-mask';

import { DialogMainComponent } from './dialog-main.component';
import { DialogPagamentoComponent } from './dialog-pagamento/dialog-pagamento.component';
import { DialogRegisterCardComponent } from './dialog-register-card/dialog-register-card.component';

import { DialogMainRoutingModule } from './dialog-main.routing.module';
import { DialogReciboComponent } from './dialog-recibo/dialog-recibo.component';
import { DialogSelectCardComponent } from './dialog-select-card/dialog-select-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
};

@NgModule({
    imports: [
        CommonModule,
        DialogMainRoutingModule,
        MaskModule,
        FormsModule,
        ReactiveFormsModule,
        /* Angular Material */
        MatButtonModule,
        MatSortModule,
        MatCheckboxModule,
        MatInputModule,
        MatListModule,
        MatIconModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatRadioModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatPaginatorModule,
        MatStepperModule,
        MatTableModule,
        MatTooltipModule,
        MatDialogModule,
        MatProgressBarModule,
        /* Outros plugins */
        PerfectScrollbarModule,
        ToastrModule.forRoot(),
    ],
    exports: [],
    declarations: [
        DialogMainComponent,
        DialogPagamentoComponent,
        DialogRegisterCardComponent,
        DialogReciboComponent,
        DialogSelectCardComponent,
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
        }, MatIconRegistry,
    ],
    entryComponents: [DialogMainComponent],
})
export class DialogMainModule { }
