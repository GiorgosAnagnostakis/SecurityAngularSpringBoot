import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerCrudProductComponent } from './buyer-crud-product.component';

describe('BuyerCrudProductComponent', () => {
  let component: BuyerCrudProductComponent;
  let fixture: ComponentFixture<BuyerCrudProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerCrudProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerCrudProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
