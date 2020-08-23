import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavbarNotLoggedinComponent } from './top-navbar-not-loggedin.component';

describe('TopNavbarNotLoggedinComponent', () => {
  let component: TopNavbarNotLoggedinComponent;
  let fixture: ComponentFixture<TopNavbarNotLoggedinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopNavbarNotLoggedinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavbarNotLoggedinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
