import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierQuotationComponent } from './supplier-quotation.component';

describe('SupplierQuotationComponent', () => {
  let component: SupplierQuotationComponent;
  let fixture: ComponentFixture<SupplierQuotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
