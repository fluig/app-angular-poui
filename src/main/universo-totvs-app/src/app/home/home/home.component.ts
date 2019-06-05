import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThfChartType } from '@totvs/thf-ui/components/thf-chart/enums/thf-chart-type.enum';
import { ThfDialogService } from '@totvs/thf-ui/services/thf-dialog';
import { ThfPieChartSeries } from '@totvs/thf-ui/components/thf-chart/interfaces/thf-chart-series.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  chartType: ThfChartType = ThfChartType.Pie;

  lowProducts: Array<ThfPieChartSeries> = [
    { category: 'Envelope 16x22', value: 0.2, tooltip: 'Envelope 16x22 (Escritório)' },
    { category: 'Grafite 0.5mm', value: 0.29, tooltip: 'Grafite 0.5mm (Escritório)' },
    { category: 'Lápis de escrever', value: 0.32, tooltip: 'Lápis de escrever (Escritório)' },
    { category: 'Caneta Azul', value: 0.58, tooltip: 'Caneta Azul (Escritório)' },
    { category: 'Caneta Preta', value: 0.62, tooltip: 'Caneta Preta (Escritório)' }
  ];

  highProducts: Array<ThfPieChartSeries> = [
    { category: 'Calculadora Científica', value: 50.29, tooltip: 'Calculadora Científica (Escritório)' },
    { category: 'Apagador', value: 6.53, tooltip: 'Apagador (Escritório)' },
    { category: 'Papel A4 - 500 Folhas', value: 6.22, tooltip: 'Papel A4 - 500 Folhas (Escritório)' },
    { category: 'Caneta Marca Texto', value: 5.00, tooltip: 'Caneta Marca Texto (Escritório)' },
    { category: 'Bloco Adesivo de Anotações - Post It', value: 3.22, tooltip: 'Bloco Adesivo de Anotações - Post It (Escritório)' }
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
    private thfAlert: ThfDialogService,
    private router: Router
  ) {}

  ngOnInit() {}

  showMeTheProduct(event: any) {
    this.thfAlert.alert({
      title: 'Detalhes do produto',
      message: `O produto ${event.category} custa R$ ${event.value}.`,
      ok: () => {}
    });
  }

  newPurchaseOrder() {
    this.router.navigateByUrl('/purchase-order');
  }
}
