import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgPublicempresaComponent } from './pg-publicempresa.component';

describe('PgPublicempresaComponent', () => {
  let component: PgPublicempresaComponent;
  let fixture: ComponentFixture<PgPublicempresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgPublicempresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgPublicempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
