import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgPrincipalindicadorComponent } from './pg-principalindicador.component';

describe('PgPrincipalindicadorComponent', () => {
  let component: PgPrincipalindicadorComponent;
  let fixture: ComponentFixture<PgPrincipalindicadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgPrincipalindicadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgPrincipalindicadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
