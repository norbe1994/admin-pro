import { Injectable } from '@angular/core'
import { URL_SERVICIOS } from 'src/app/config/config'

@Injectable({
  providedIn: 'root',
})
export class SubirArchivoService {
  constructor() {}

  subirArchivo(archivo: File, colecccion: string, id: string) {
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      const xhr = new XMLHttpRequest()

      formData.append('imagen', archivo, archivo.name)

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response))
          } else {
            reject(xhr.response)
          }
        }
      }
      const url = `${URL_SERVICIOS}/upload/${colecccion}/${id}`

      xhr.open('POST', url, true)
      xhr.send(formData)
    })
  }
}
