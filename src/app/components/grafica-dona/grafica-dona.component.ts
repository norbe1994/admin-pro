import { Component, OnInit, Input } from '@angular/core'
import { ChartType } from 'chart.js'
import { Label } from 'ng2-charts'

@Component({
  selector: 'app-grafica-dona',
  templateUrl: './grafica-dona.component.html',
  styles: [],
})
export class GraficaDonaComponent implements OnInit {
  @Input() data: number[]
  @Input() labels: Label[]
  @Input() type: ChartType
  @Input('titulo') leyenda: string = 'Gráfica de Dona'

  constructor() {}

  ngOnInit() {}
}
