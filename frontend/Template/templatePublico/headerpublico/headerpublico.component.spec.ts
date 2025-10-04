import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderpublicoComponent } from './headerpublico.component';

describe('HeaderpublicoComponent', () => {
  let component: HeaderpublicoComponent;
  let fixture: ComponentFixture<HeaderpublicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderpublicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderpublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
