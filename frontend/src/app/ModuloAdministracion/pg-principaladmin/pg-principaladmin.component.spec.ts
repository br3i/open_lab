import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgPrincipaladminComponent } from './pg-principaladmin.component';

describe('PgPrincipaladminComponent', () => {
  let component: PgPrincipaladminComponent;
  let fixture: ComponentFixture<PgPrincipaladminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgPrincipaladminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgPrincipaladminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
