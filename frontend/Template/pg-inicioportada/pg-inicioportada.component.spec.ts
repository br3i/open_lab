import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgInicioportadaComponent } from './pg-inicioportada.component';

describe('PgInicioportadaComponent', () => {
  let component: PgInicioportadaComponent;
  let fixture: ComponentFixture<PgInicioportadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgInicioportadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgInicioportadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

