import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAsignarServiciosComponent } from './modal-asignar-servicios.component';

describe('ModalAsignarServiciosComponent', () => {
  let component: ModalAsignarServiciosComponent;
  let fixture: ComponentFixture<ModalAsignarServiciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAsignarServiciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAsignarServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
