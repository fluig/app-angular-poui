import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderComponent } from './purchase-order.component';

describe('PurchaseOrderComponent', () => {
  let component: PurchaseOrderComponent;
  let fixture: ComponentFixture<PurchaseOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
