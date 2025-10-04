import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgContratoComponent } from './pg-contrato.component';

describe('PgContratoComponent', () => {
  let component: PgContratoComponent;
  let fixture: ComponentFixture<PgContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PgContratoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
