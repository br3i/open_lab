import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgEmpresaeditarComponent } from './pg-empresaeditar.component';

describe('PgEmpresaeditarComponent', () => {
  let component: PgEmpresaeditarComponent;
  let fixture: ComponentFixture<PgEmpresaeditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgEmpresaeditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgEmpresaeditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
