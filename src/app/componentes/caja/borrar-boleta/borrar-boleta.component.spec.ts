import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarBoletaComponent } from './borrar-boleta.component';

describe('BorrarBoletaComponent', () => {
  let component: BorrarBoletaComponent;
  let fixture: ComponentFixture<BorrarBoletaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarBoletaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarBoletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
