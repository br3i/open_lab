import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgPersonalorganizacionComponent } from './pg-personalorganizacion.component';

describe('PgPersonalorganizacionComponent', () => {
  let component: PgPersonalorganizacionComponent;
  let fixture: ComponentFixture<PgPersonalorganizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgPersonalorganizacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgPersonalorganizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
