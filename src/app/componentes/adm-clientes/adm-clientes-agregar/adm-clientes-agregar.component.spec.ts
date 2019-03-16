import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmClientesAgregarComponent } from './adm-clientes-agregar.component';

describe('AdmClientesAgregarComponent', () => {
  let component: AdmClientesAgregarComponent;
  let fixture: ComponentFixture<AdmClientesAgregarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmClientesAgregarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmClientesAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
