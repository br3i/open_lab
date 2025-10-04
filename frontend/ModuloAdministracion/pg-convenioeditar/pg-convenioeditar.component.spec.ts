import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgConvenioeditarComponent } from './pg-convenioeditar.component';

describe('PgConvenioeditarComponent', () => {
  let component: PgConvenioeditarComponent;
  let fixture: ComponentFixture<PgConvenioeditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgConvenioeditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgConvenioeditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
