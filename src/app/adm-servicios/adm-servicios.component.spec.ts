import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmServiciosComponent } from './adm-servicios.component';

describe('AdmServiciosComponent', () => {
  let component: AdmServiciosComponent;
  let fixture: ComponentFixture<AdmServiciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmServiciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
