import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVerClientesServiciosComponent } from './modal-ver-clientes-servicios.component';

describe('ModalVerClientesServiciosComponent', () => {
  let component: ModalVerClientesServiciosComponent;
  let fixture: ComponentFixture<ModalVerClientesServiciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVerClientesServiciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVerClientesServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
