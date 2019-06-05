import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ThfModalAction, ThfModalComponent } from '@totvs/thf-ui/components/thf-modal';
import { ThfMultiselectOption } from '@totvs/thf-ui/components/thf-field';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent implements OnInit {

  reactiveForm: FormGroup;
  options: Array<ThfMultiselectOption> = [
    { value: 'fornecedor1', label: 'Paper And Crafts & Arts' },
    { value: 'fornecedor2', label: 'Sorveio e Sives S.A.' },
    { value: 'fornecedor3', label: 'Kormex Comércio e Indústria Gráfica Ltda.' },
    { value: 'fornecedor4', label: 'Contabilista' }
  ];

  public readonly modalPrimaryAction: ThfModalAction = {
    action: () => this.reactiveFormModal.close(),
    label: 'Close'
  };

  @ViewChild('reactiveFormData') reactiveFormModal: ThfModalComponent;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.createReactiveForm();
  }

  createReactiveForm() {
    this.reactiveForm = this.fb.group({
      name: ['Bruno Quadrotti de Freitas', Validators.compose([
        Validators.required, Validators.minLength(5), Validators.maxLength(30)
      ])],
      category: ['', Validators.compose([
        Validators.required
      ])],
      justify: ['', Validators.compose([
        Validators.required
      ])],
      providers: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  saveForm() {
    this.reactiveFormModal.open();
  }

  cancel() {
    this.router.navigateByUrl('/dashboard');
  }

}
