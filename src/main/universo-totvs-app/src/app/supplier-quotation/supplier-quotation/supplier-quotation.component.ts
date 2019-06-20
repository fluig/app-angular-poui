import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProcessManagementService } from 'src/app/services/process-management.service';
import { ThfNotificationService, ThfDialogService, ThfToasterOrientation } from '@totvs/thf-ui';

@Component({
  selector: 'app-supplier-quotation',
  templateUrl: './supplier-quotation.component.html',
  styleUrls: ['./supplier-quotation.component.scss']
})
export class SupplierQuotationComponent implements OnInit {

  private WKNumProcess: string;
  status: string;
  sendDate: string;
  trackingCode: string;
  isSended = false;
  objectKeys = Object.keys;
  literals = {
    description: 'Descrição',
    unitMeasurement: 'Unidade de medida',
    manufacturer: 'Fabricante',
    quantity: 'Quantidade',
    product_code: 'Código do produto',
    price: 'Valor do produto',
    warning: 'Atenção',
    error_get_process: 'Não foi possível carregar essa solicitação.',
    error_empty_fields: 'Preencha todos os valores dos produtos.',
    success_send_process: 'Cotação enviada com sucesso.',
    error_send_process: 'Não foi possível enviar a cotação.',
    error_empty_send_options: 'Preencha os dados de envio dos produtos.'
  };
  products: Array<any>;
  productsList: Array<any> = [];
  whiteListItems = [
    'description',
    'unitMeasurement',
    'manufacturer',
    'quantity',
    'product_code',
    'price'
  ];

  constructor(
    private route: ActivatedRoute,
    private thfNotification: ThfNotificationService,
    private thfDialog: ThfDialogService,
    private processManagementService: ProcessManagementService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {

      this.WKNumProcess = params.WKNumProcess;
      this.status = params.status;

      if (this.WKNumProcess) {
        this.getProcessManagement();
      }
    });
  }

  getProcessManagement() {

    this.processManagementService.getProcessManagement(
      this.WKNumProcess
    ).subscribe(res => {
      this.products = res.products;

      if (!this.products.length) {
        this.showToasterMessage(
          this.literals.error_get_process,
          'error'
        );
        return false;
      }

      this.products.forEach(product => {

        product = Object.keys(product).filter(item => {
          if (!this.isWhiteListItem(item)) {
            return false;
          }
          return item;
        }).map(item => {
          return {
            key: item,
            value: product[item]
          };
        });

        this.productsList.push(
          product
        );
      });
    }, error => {
      console.error('error', error);
      this.showToasterMessage(
        this.literals.error_get_process,
        'error'
      );
    });
  }

  showToasterMessage(message, type = 'success'): void {
    this.thfNotification[type]({
      message: message,
      orientation: ThfToasterOrientation.Top
    });
  }

  isWhiteListItem(item): boolean {
    return this.whiteListItems.includes(item);
  }

  saveForm() {

    if (this.hasFieldEmpty()) {
      this.thfDialog.alert({
        title: this.literals.warning,
        message: this.literals.error_empty_fields
      });
      return false;
    }

    if (this.status && this.hasSendOptionsEmpty()) {
      this.thfDialog.alert({
        title: this.literals.warning,
        message: this.literals.error_empty_send_options
      });
      return false;
    }

    this.processManagementService.moveProcessManagement(
      this.WKNumProcess,
      this.getProcessData()
    ).subscribe(res => {
      this.showToasterMessage(
        this.literals.success_send_process
      );
      this.isSended = true;
    }, error => {
      console.error('error', error);
      this.showToasterMessage(
        this.literals.error_send_process,
        'error'
      );
    });
  }

  hasSendOptionsEmpty() {
    return !this.sendDate || !this.trackingCode;
  }

  getProcessData() {

    const data: any = {};
    data.formFields = {};

    this.productsList.map((product, idx) => product.map(item => {
      data.formFields[`${item.key}___${idx + 1}`] = `${item.value}`;
    }));

    return data;
  }

  hasFieldEmpty(): boolean {
    let hasEmpty = false;
    this.productsList.map(product => product.map(item => {
      if (item.key === 'price' && !item.value) {
        hasEmpty = true;
      }
    }));
    return hasEmpty;
  }

}
