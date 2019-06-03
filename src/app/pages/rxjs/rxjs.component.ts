import { Component, OnInit, OnDestroy } from '@angular/core'
import { Observable, Subscriber, Subscription } from 'rxjs'
import { retry, map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscription: Subscription

  constructor() {
    this.subscription = this.regresarObservable()
      .pipe(retry(2))

      .subscribe(
        data => {
          console.log('Subs', data)
        },
        err => {
          console.error('Error en el obs', err)
        },
        () => {
          console.log('El observador termino')
        }
      )
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  regresarObservable(): Observable<number> {
    return new Observable((observer: Subscriber<objetoPersonalizado>) => {
      let objeto = {
        valor: 0,
      }

      let intervalo = setInterval(() => {
        objeto.valor += 1
        observer.next(objeto)

        if (objeto.valor === 10) {
          clearInterval(intervalo)
          observer.complete()
        }

        if (objeto.valor === 9) {
          clearInterval(intervalo)
          observer.error('¡Error!: ¡el valor es 9 y eso no es permitido!')
        }
      }, 1000)
    }).pipe(
      map(dataEnBruto => dataEnBruto.valor),
      filter((valor, index) => {
        return valor % 2 === 1
      })
    )
  }
}

interface objetoPersonalizado {
  valor: number
}
