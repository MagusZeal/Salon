import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarClientesListaComponent } from './modal-agregar-clientes-lista.component';

describe('ModalAgregarClientesListaComponent', () => {
  let component: ModalAgregarClientesListaComponent;
  let fixture: ComponentFixture<ModalAgregarClientesListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAgregarClientesListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarClientesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
