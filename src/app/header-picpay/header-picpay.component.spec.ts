import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPicpayComponent } from './header-picpay.component';

describe('HeaderPicpayComponent', () => {
  let component: HeaderPicpayComponent;
  let fixture: ComponentFixture<HeaderPicpayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderPicpayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPicpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
