import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletaSinReservaComponent } from './boleta-sin-reserva.component';

describe('BoletaSinReservaComponent', () => {
  let component: BoletaSinReservaComponent;
  let fixture: ComponentFixture<BoletaSinReservaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoletaSinReservaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletaSinReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
