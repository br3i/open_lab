import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgPrincipaladministracionComponent } from './pg-principaladministracion.component';

describe('PgPrincipaladministracionComponent', () => {
  let component: PgPrincipaladministracionComponent;
  let fixture: ComponentFixture<PgPrincipaladministracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgPrincipaladministracionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgPrincipaladministracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
