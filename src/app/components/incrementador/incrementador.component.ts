import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core'

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [],
})
export class IncrementadorComponent implements OnInit {
  @ViewChild('progresoTxt', { static: false })
  progresoTxt: ElementRef

  @Input('nombre') leyenda: string = 'Valor por defecto'
  @Input() progreso: number = 50

  @Output() cambioValor: EventEmitter<number> = new EventEmitter()

  constructor() {}

  ngOnInit() {}

  onChange(nuevoValor: number): void {
    if (nuevoValor > 100) {
      this.progreso = 100
    } else if (nuevoValor < 0) {
      this.progreso = 0
    } else {
      this.progreso = nuevoValor
    }

    this.progresoTxt.nativeElement.value = this.progreso

    this.cambioValor.emit(this.progreso)
  }

  cambiarValor(valor: number): void {
    this.progreso += valor

    if (this.progreso > 100) {
      this.progreso = 100
    }

    if (this.progreso < 0) {
      this.progreso = 0
    }

    this.cambioValor.emit(this.progreso)
    this.progresoTxt.nativeElement.focus()
  }
}
