import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCambiarPrecioComponent } from './modal-cambiar-precio.component';

describe('ModalCambiarPrecioComponent', () => {
  let component: ModalCambiarPrecioComponent;
  let fixture: ComponentFixture<ModalCambiarPrecioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCambiarPrecioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCambiarPrecioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
