import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierQuotationComponent } from './supplier-quotation/supplier-quotation.component';
import { SupplierQuotationRoutingModule } from './supplier-quotation.routing.module';

@NgModule({
  declarations: [
    SupplierQuotationComponent
  ],
  imports: [
    CommonModule,
    SupplierQuotationRoutingModule
  ],
  exports: [
    SupplierQuotationComponent
  ]
})
export class SupplierQuotationModule { }
