import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgPrincipalorganizacionComponent } from './pg-principalorganizacion.component';

describe('PgPrincipalorganizacionComponent', () => {
  let component: PgPrincipalorganizacionComponent;
  let fixture: ComponentFixture<PgPrincipalorganizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgPrincipalorganizacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgPrincipalorganizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
