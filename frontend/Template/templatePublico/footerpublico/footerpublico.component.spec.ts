import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterpublicoComponent } from './footerpublico.component';

describe('FooterpublicoComponent', () => {
  let component: FooterpublicoComponent;
  let fixture: ComponentFixture<FooterpublicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterpublicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterpublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
