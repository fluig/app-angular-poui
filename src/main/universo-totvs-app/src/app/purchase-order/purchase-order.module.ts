import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { PurchaseOrderRoutingModule } from './purchase-order.routing.module';
import { PoModule } from '@po-ui/ng-components';

@NgModule({
  declarations: [
    PurchaseOrderComponent
  ],
  imports: [
    CommonModule,
    PurchaseOrderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PoModule
  ],
  exports: [
    PurchaseOrderComponent
  ]
})
export class PurchaseOrderModule { }
