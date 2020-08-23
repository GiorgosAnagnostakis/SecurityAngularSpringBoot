import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerProductFormComponent } from './buyer-product-form.component';

describe('BuyerProductFormComponent', () => {
  let component: BuyerProductFormComponent;
  let fixture: ComponentFixture<BuyerProductFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerProductFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
