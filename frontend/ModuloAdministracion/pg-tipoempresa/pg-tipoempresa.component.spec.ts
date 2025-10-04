import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgTipoempresaComponent } from './pg-tipoempresa.component';

describe('PgTipoempresaComponent', () => {
  let component: PgTipoempresaComponent;
  let fixture: ComponentFixture<PgTipoempresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgTipoempresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgTipoempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
