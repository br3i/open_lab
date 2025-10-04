import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgConvenioFormularioComponent } from './pg-convenioformulario.component';

describe('PgConvenioFormularioComponent', () => {
  let component: PgConvenioFormularioComponent;
  let fixture: ComponentFixture<PgConvenioFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgConvenioFormularioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgConvenioFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
