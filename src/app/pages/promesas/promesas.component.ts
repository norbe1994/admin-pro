import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [],
})
export class PromesasComponent implements OnInit {
  constructor() {
    this.contar()
      .then(i => {
        console.log('promesa resuelta, el valor de i es:', i)
      })
      .catch(err => {
        console.error(err)
      })
  }

  ngOnInit() {}

  contar(): Promise<number> {
    return new Promise((resolve, reject) => {
      let i = 0

      let intervalo = setInterval(() => {
        i += 1

        if (i === 5) {
          resolve(i)
          clearInterval(intervalo)
        }
      }, 1000)
    })
  }
}
