import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmClientesEditarComponent } from './adm-clientes-editar.component';

describe('AdmClientesEditarComponent', () => {
  let component: AdmClientesEditarComponent;
  let fixture: ComponentFixture<AdmClientesEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmClientesEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmClientesEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
