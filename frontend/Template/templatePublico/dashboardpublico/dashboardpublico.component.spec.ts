import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardpublicoComponent } from './dashboardpublico.component';

describe('DashboardpublicoComponent', () => {
  let component: DashboardpublicoComponent;
  let fixture: ComponentFixture<DashboardpublicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardpublicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardpublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
