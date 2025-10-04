import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgRegistroempresaComponent } from './pg-registroempresa.component';

describe('PgRegistroempresaComponent', () => {
  let component: PgRegistroempresaComponent;
  let fixture: ComponentFixture<PgRegistroempresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgRegistroempresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgRegistroempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
