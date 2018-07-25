import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSelectCardComponent } from './dialog-select-card.component';

describe('DialogSelectCardComponent', () => {
  let component: DialogSelectCardComponent;
  let fixture: ComponentFixture<DialogSelectCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSelectCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSelectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
