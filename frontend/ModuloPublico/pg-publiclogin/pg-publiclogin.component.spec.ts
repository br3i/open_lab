import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgPublicloginComponent } from './pg-publiclogin.component';

describe('PgPublicloginComponent', () => {
  let component: PgPublicloginComponent;
  let fixture: ComponentFixture<PgPublicloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgPublicloginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgPublicloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
