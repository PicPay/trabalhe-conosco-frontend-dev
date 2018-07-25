import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRegisterCardComponent } from './dialog-register-card.component';

describe('DialogRegisterCardComponent', () => {
  let component: DialogRegisterCardComponent;
  let fixture: ComponentFixture<DialogRegisterCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRegisterCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRegisterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
