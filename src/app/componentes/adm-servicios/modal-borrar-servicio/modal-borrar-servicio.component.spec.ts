import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBorrarServicioComponent } from './modal-borrar-servicio.component';

describe('ModalBorrarServicioComponent', () => {
  let component: ModalBorrarServicioComponent;
  let fixture: ComponentFixture<ModalBorrarServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBorrarServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBorrarServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
