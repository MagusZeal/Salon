import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalesClientesComponent } from './totales-clientes.component';

describe('TotalesClientesComponent', () => {
  let component: TotalesClientesComponent;
  let fixture: ComponentFixture<TotalesClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalesClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalesClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
