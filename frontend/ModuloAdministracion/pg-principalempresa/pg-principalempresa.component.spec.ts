import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgPrincipalempresaComponent } from './pg-principalempresa.component';

describe('PgPrincipalempresaComponent', () => {
  let component: PgPrincipalempresaComponent;
  let fixture: ComponentFixture<PgPrincipalempresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgPrincipalempresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgPrincipalempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
