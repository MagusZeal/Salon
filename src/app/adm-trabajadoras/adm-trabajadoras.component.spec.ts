import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmTrabajadorasComponent } from './adm-trabajadoras.component';

describe('AdmTrabajadorasComponent', () => {
  let component: AdmTrabajadorasComponent;
  let fixture: ComponentFixture<AdmTrabajadorasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmTrabajadorasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmTrabajadorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
