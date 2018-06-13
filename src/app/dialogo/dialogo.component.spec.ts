import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoComponent } from './dialogo.component';

describe('DialogoComponent', () => {
  let component: DialogoComponent;
  let fixture: ComponentFixture<DialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
