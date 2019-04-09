import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerBoletaComponent } from './ver-boleta.component';

describe('VerBoletaComponent', () => {
  let component: VerBoletaComponent;
  let fixture: ComponentFixture<VerBoletaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerBoletaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerBoletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
