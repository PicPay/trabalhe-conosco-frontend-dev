import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMainComponent } from './dialog-main.component';

describe('DialogMainComponent', () => {
  let component: DialogMainComponent;
  let fixture: ComponentFixture<DialogMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
