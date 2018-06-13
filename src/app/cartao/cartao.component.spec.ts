import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaoComponent } from './cartao.component';

describe('CartaoComponent', () => {
  let component: CartaoComponent;
  let fixture: ComponentFixture<CartaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
