import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProcessManagementService } from 'src/app/services/process-management.service';

@Component({
  selector: 'app-supplier-quotation',
  templateUrl: './supplier-quotation.component.html',
  styleUrls: ['./supplier-quotation.component.scss']
})
export class SupplierQuotationComponent implements OnInit {

  private WKNumProces: string;

  products: Array<any>;

  constructor(
    private route: ActivatedRoute,
    private processManagementService: ProcessManagementService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {

      this.WKNumProces = params.WKNumProces;

      if (this.WKNumProces) {
        this.getProcessManagement();
      }
    });
  }

  getProcessManagement() {

    this.processManagementService.getProcessManagement(
      this.WKNumProces
    ).subscribe(res => {
      this.products = res.products;
    }, error => console.error('error', error));
  }

}
