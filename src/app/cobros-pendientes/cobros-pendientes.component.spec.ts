import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CobrosPendientesComponent } from './cobros-pendientes.component';

describe('CobrosPendientesComponent', () => {
  let component: CobrosPendientesComponent;
  let fixture: ComponentFixture<CobrosPendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CobrosPendientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CobrosPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
