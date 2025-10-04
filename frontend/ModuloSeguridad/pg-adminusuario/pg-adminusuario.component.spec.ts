import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgAdminusuarioComponent } from './pg-adminusuario.component';

describe('PgAdminusuarioComponent', () => {
  let component: PgAdminusuarioComponent;
  let fixture: ComponentFixture<PgAdminusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgAdminusuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgAdminusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
