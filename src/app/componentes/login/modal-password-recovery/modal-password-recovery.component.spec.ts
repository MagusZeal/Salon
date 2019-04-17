import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPasswordRecoveryComponent } from './modal-password-recovery.component';

describe('ModalPasswordRecoveryComponent', () => {
  let component: ModalPasswordRecoveryComponent;
  let fixture: ComponentFixture<ModalPasswordRecoveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPasswordRecoveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPasswordRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
