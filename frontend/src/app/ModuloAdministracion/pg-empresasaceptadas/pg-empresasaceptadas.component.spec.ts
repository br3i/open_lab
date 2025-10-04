import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgempresaaceptadaComponent } from './pg-empresasaceptadas.component';

describe('PgempresaaceptadaComponent', () => {
  let component: PgempresaaceptadaComponent;
  let fixture: ComponentFixture<PgempresaaceptadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgempresaaceptadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgempresaaceptadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
