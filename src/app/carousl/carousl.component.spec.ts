import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouslComponent } from './carousl.component';

describe('CarouslComponent', () => {
  let component: CarouslComponent;
  let fixture: ComponentFixture<CarouslComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouslComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouslComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
