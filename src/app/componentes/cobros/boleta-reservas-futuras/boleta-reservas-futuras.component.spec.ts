import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletaReservasFuturasComponent } from './boleta-reservas-futuras.component';

describe('BoletaReservasFuturasComponent', () => {
  let component: BoletaReservasFuturasComponent;
  let fixture: ComponentFixture<BoletaReservasFuturasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoletaReservasFuturasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletaReservasFuturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
