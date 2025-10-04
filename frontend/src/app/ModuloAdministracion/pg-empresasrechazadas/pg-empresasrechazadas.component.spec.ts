import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgempresarechazadaComponent } from './pg-empresasrechazadas.component';

describe('PgempresarechazadaComponent', () => {
  let component: PgempresarechazadaComponent;
  let fixture: ComponentFixture<PgempresarechazadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgempresarechazadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgempresarechazadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
