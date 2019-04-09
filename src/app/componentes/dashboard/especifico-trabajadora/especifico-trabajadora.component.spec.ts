import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecificoTrabajadoraComponent } from './especifico-trabajadora.component';

describe('EspecificoTrabajadoraComponent', () => {
  let component: EspecificoTrabajadoraComponent;
  let fixture: ComponentFixture<EspecificoTrabajadoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspecificoTrabajadoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecificoTrabajadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
