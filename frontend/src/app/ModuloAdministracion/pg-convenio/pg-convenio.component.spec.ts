import { ComponentFixture, TestBed } from '@angular/core/testing';


import { PgConvenioComponent } from './pg-convenio.component';

describe('PgConvenioComponent', () => {
  let component: PgConvenioComponent;
  let fixture: ComponentFixture<PgConvenioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgConvenioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgConvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
