import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgPrincipalseguridadComponent } from './pg-principalseguridad.component';

describe('PgPrincipalseguridadComponent', () => {
  let component: PgPrincipalseguridadComponent;
  let fixture: ComponentFixture<PgPrincipalseguridadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgPrincipalseguridadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgPrincipalseguridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
