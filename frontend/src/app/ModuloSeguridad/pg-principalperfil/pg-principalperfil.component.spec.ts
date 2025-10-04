import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgPrincipalperfilComponent } from './pg-principalperfil.component';

describe('PgPrincipalperfilComponent', () => {
  let component: PgPrincipalperfilComponent;
  let fixture: ComponentFixture<PgPrincipalperfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgPrincipalperfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgPrincipalperfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
