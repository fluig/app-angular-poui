import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoChartType } from '@po-ui/ng-components';
import { PoDialogService } from '@po-ui/ng-components';
import { PoChartSerie } from '@po-ui/ng-components';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  chartType: PoChartType = PoChartType.Pie;

  lowProducts: Array<PoChartSerie> = [
    { label: 'Envelope 16x22', data: 0.2, tooltip: 'Envelope 16x22 (Escritório)' },
    { label: 'Grafite 0.5mm', data: 0.29, tooltip: 'Grafite 0.5mm (Escritório)' },
    { label: 'Lápis de escrever', data: 0.32, tooltip: 'Lápis de escrever (Escritório)' },
    { label: 'Caneta Azul', data: 0.58, tooltip: 'Caneta Azul (Escritório)' },
    { label: 'Caneta Preta', data: 0.62, tooltip: 'Caneta Preta (Escritório)' }
  ];

  highProducts: Array<PoChartSerie> = [
    { label: 'Calculadora Científica', data: 50.29, tooltip: 'Calculadora Científica (Escritório)' },
    { label: 'Apagador', data: 6.53, tooltip: 'Apagador (Escritório)' },
    { label: 'Papel A4 - 500 Folhas', data: 6.22, tooltip: 'Papel A4 - 500 Folhas (Escritório)' },
    { label: 'Caneta Marca Texto', data: 5.00, tooltip: 'Caneta Marca Texto (Escritório)' },
    { label: 'Bloco Adesivo de Anotações - Post It', data: 3.22, tooltip: 'Bloco Adesivo de Anotações - Post It (Escritório)' }
  ];

  items: Array<any> = [
    {
      posicao: '1',
      produto: 'Caneta Azul',
      fornecedor: 'Paper And Crafts & Arts',
      valor: 'R$ 0,58'
    },
    {
      posicao: '2',
      produto: 'Caneta Preta',
      fornecedor: 'Kormex Comércio e Indústria Gráfica Ltda.',
      valor: 'R$ 0,62'
    },
    {
      posicao: '3',
      produto: 'Papel A4 - 500 Folhas',
      fornecedor: 'Kormex Comércio e Indústria Gráfica Ltda.',
      valor: 'R$ 6,22'
    },
    {
      posicao: '4',
      produto: 'Lápis de escrever',
      fornecedor: 'Paper And Crafts & Arts',
      valor: 'R$ 0,32'
    },
    {
      posicao: '5',
      produto: 'Grafite 0.5mm',
      fornecedor: 'Paper And Crafts & Arts',
      valor: 'R$ 0,29'
    },
    {
      posicao: '6',
      produto: 'Bloco Adesivo de Anotações - Post It',
      fornecedor: 'Kormex Comércio e Indústria Gráfica Ltda.',
      valor: 'R$ 3,22'
    },
    {
      posicao: '7',
      produto: 'Caneta Marca Texto',
      fornecedor: 'Sorveio e Sives S.A.',
      valor: 'R$ 5,00'
    },
    {
      posicao: '8',
      produto: 'Apagador',
      fornecedor: 'Paper And Crafts & Arts',
      valor: 'R$ 6,53'
    },
    {
      posicao: '9',
      produto: 'Calculadora Científica',
      fornecedor: 'Sorveio e Sives S.A.',
      valor: 'R$ 50,29'
    },
    {
      posicao: '10',
      produto: 'Envelope 16x22',
      fornecedor: 'Sorveio e Sives S.A.',
      valor: 'R$ 0,20'
    }
  ];

  constructor(
    private poAlert: PoDialogService,
    private router: Router
  ) {}

  ngOnInit() {}

  showMeTheProduct(event: any) {
    this.poAlert.alert({
      title: 'Detalhes do produto',
      message: `O produto ${event.label} custa R$ ${event.data}.`,
      ok: () => {}
    });
  }

  newPurchaseOrder() {
    this.router.navigateByUrl('/purchase-order');
  }
}
