import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortadainicialComponent } from './portadainicial.component';

describe('PortadainicialComponent', () => {
  let component: PortadainicialComponent;
  let fixture: ComponentFixture<PortadainicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortadainicialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortadainicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
