import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteamBoatMenuComponent } from './steam-boat-menu.component';

describe('SteamBoatMenuComponent', () => {
  let component: SteamBoatMenuComponent;
  let fixture: ComponentFixture<SteamBoatMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SteamBoatMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteamBoatMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
