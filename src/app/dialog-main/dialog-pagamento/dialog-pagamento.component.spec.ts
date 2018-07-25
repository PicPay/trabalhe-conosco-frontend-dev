import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPagamentoComponent } from './dialog-pagamento.component';

describe('DialogPagamentoComponent', () => {
  let component: DialogPagamentoComponent;
  let fixture: ComponentFixture<DialogPagamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPagamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
