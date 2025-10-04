import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgAdminrolesComponent } from './pg-adminroles.component';

describe('PgAdminrolesComponent', () => {
  let component: PgAdminrolesComponent;
  let fixture: ComponentFixture<PgAdminrolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgAdminrolesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgAdminrolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
