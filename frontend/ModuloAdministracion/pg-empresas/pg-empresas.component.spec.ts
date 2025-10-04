import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgempresaComponent } from './pg-empresas.component';

describe('PgempresaComponent', () => {
  let component: PgempresaComponent;
  let fixture: ComponentFixture<PgempresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgempresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
