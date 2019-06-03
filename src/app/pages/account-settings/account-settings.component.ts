import { Component, OnInit } from '@angular/core'
import { SettingService } from 'src/app/services/service.index'

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [],
})
export class AccountSettingsComponent implements OnInit {
  constructor(private _ajustes: SettingService) {}

  ngOnInit() {
    this.colocarCheck()
  }

  cambiarTema(tema: string, link: Element) {
    this.aplicarCheck(link)
    this._ajustes.aplicarTema(tema)
  }

  aplicarCheck(link: Element) {
    const selectores: any = document.getElementsByClassName('selector')
    let ref: Element

    for (ref of selectores) {
      ref.classList.remove('working')
    }

    link.classList.add('working')
  }

  colocarCheck() {
    const selectores: any = document.getElementsByClassName('selector')
    const tema = this._ajustes.ajustes.tema
    let ref: Element

    for (ref of selectores) {
      if (ref.getAttribute('data-theme') === tema) {
        ref.classList.add('working')
      } else {
        ref.classList.remove('working')
      }
    }
  }
}
