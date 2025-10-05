import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgFormularioreporteComponent } from './pg-formularioreporte.component';

describe('PgFormularioreporteComponent', () => {
  let component: PgFormularioreporteComponent;
  let fixture: ComponentFixture<PgFormularioreporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgFormularioreporteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgFormularioreporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
