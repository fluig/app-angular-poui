import { Injectable } from '@angular/core';
import { PurchaseRequest } from '../models/purchase-request.interface';

@Injectable()
export class ProductsConverterService {

  public convertToObject(response): PurchaseRequest {

    // TODO: Fix this
    const purchaseRequest: PurchaseRequest = {};
    const productsMap = {};
    const products = [];

    response.formFields.forEach(item => {
      if (item.field.indexOf('___') !== -1) {
        const productSplit = item.field.split('___');
        if (!productsMap[productSplit[1]]) {
          productsMap[productSplit[1]] = {};
        }
        productsMap[productSplit[1]][productSplit[0]] = item.value;
      } else {
        purchaseRequest[item.field] = item.value;
      }
    });

    Object.keys(productsMap).forEach(item => {
      products.push(productsMap[item]);
    });

    purchaseRequest.products = products;

    return purchaseRequest;
  }
}
