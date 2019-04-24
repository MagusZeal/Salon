import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletaReservaDiaComponent } from './boleta-reserva-dia.component';

describe('BoletaReservaDiaComponent', () => {
  let component: BoletaReservaDiaComponent;
  let fixture: ComponentFixture<BoletaReservaDiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoletaReservaDiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletaReservaDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
