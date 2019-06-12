import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierQuotationComponent } from './supplier-quotation/supplier-quotation.component';
import { SupplierQuotationRoutingModule } from './supplier-quotation.routing.module';
import { ProcessManagementService } from '../services/process-management.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThfModule } from '@totvs/thf-ui';

@NgModule({
  declarations: [
    SupplierQuotationComponent
  ],
  imports: [
    CommonModule,
    SupplierQuotationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ThfModule
  ],
  exports: [
    SupplierQuotationComponent
  ],
  providers: [
    ProcessManagementService
  ]
})
export class SupplierQuotationModule { }
