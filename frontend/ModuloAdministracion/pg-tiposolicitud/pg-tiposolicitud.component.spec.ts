import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgTiposolicitudComponent } from './pg-tiposolicitud.component';


describe('PgTiposolicitudComponent', () => {
  let component: PgTiposolicitudComponent;
  let fixture: ComponentFixture<PgTiposolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgTiposolicitudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgTiposolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
