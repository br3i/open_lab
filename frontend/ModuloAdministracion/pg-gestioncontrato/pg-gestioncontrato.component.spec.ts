import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgGestioncontratosComponent } from './pg-gestioncontrato.component';

describe('PgGestioncontratosComponent', () => {
  let component: PgGestioncontratosComponent;
  let fixture: ComponentFixture<PgGestioncontratosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgGestioncontratosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgGestioncontratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
