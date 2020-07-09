import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducdDashBoardComponent } from './producd-dash-board.component';

describe('ProducdDashBoardComponent', () => {
  let component: ProducdDashBoardComponent;
  let fixture: ComponentFixture<ProducdDashBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducdDashBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducdDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
