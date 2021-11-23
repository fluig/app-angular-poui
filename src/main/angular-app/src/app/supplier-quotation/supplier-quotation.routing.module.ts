import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierQuotationComponent } from './supplier-quotation/supplier-quotation.component';

const routes: Routes = [
  { path: '', component: SupplierQuotationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierQuotationRoutingModule {}
