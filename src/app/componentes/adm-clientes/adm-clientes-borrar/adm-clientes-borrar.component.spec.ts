import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmClientesBorrarComponent } from './adm-clientes-borrar.component';

describe('AdmClientesBorrarComponent', () => {
  let component: AdmClientesBorrarComponent;
  let fixture: ComponentFixture<AdmClientesBorrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmClientesBorrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmClientesBorrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
