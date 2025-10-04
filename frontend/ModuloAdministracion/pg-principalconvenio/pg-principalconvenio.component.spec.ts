import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgPrincipalconvenioComponent } from './pg-principalconvenio.component';

describe('PgPrincipalconvenioComponent', () => {
  let component: PgPrincipalconvenioComponent;
  let fixture: ComponentFixture<PgPrincipalconvenioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgPrincipalconvenioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgPrincipalconvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
