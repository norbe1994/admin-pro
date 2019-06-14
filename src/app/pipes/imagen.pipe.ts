import { Pipe, PipeTransform } from '@angular/core'
import { URL_SERVICIOS } from '../config/config'

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: string = 'usuario'): string {
    let url = `${URL_SERVICIOS}/imagen`

    if (!img) {
      return `${url}/usuario/noImageFound`
    }

    if (img.indexOf('https') >= 0) {
      return img
    }

    switch (tipo) {
      case 'usuario':
        url = `${url}/usuario/${img}`
        break

      case 'medico':
        url = `${url}/medico/${img}`
        break

      case 'hospital':
        url = `${url}/hospital/${img}`
        break

      default:
        url = `${url}/usuario/noImageFound`
        break
    }

    return url
  }
}
