import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCobrosCambiarPrecioComponent } from './modal-cobros-cambiar-precio.component';

describe('ModalCobrosCambiarPrecioComponent', () => {
  let component: ModalCobrosCambiarPrecioComponent;
  let fixture: ComponentFixture<ModalCobrosCambiarPrecioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCobrosCambiarPrecioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCobrosCambiarPrecioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
