import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloPagoComponent } from './modulo-pago.component';

describe('ModuloPagoComponent', () => {
  let component: ModuloPagoComponent;
  let fixture: ComponentFixture<ModuloPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuloPagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuloPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
