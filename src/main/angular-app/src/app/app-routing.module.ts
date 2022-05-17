import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), pathMatch: 'full' },
  { path: 'purchase-order', loadChildren: () => import('./purchase-order/purchase-order.module').then(m => m.PurchaseOrderModule) },
  { path: 'supplier-quotation', loadChildren: () => import('./supplier-quotation/supplier-quotation.module').then(m => m.SupplierQuotationModule) },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
