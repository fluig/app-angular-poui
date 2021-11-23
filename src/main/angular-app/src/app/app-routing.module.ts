import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadChildren: './home/home.module#HomeModule', pathMatch: 'full' },
  { path: 'purchase-order', loadChildren: './purchase-order/purchase-order.module#PurchaseOrderModule' },
  { path: 'supplier-quotation', loadChildren: './supplier-quotation/supplier-quotation.module#SupplierQuotationModule' },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
