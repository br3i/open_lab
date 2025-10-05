import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgIndicadorComponent } from './pg-indicador.component';

describe('PgIndicadorComponent', () => {
  let component: PgIndicadorComponent;
  let fixture: ComponentFixture<PgIndicadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgIndicadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgIndicadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
