import { Injectable, EventEmitter } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class ModalUploadService {
  tipo: string
  id: string
  oculto = true

  notification = new EventEmitter<any>()

  constructor() {}

  ocultarModal() {
    this.oculto = true
    this.tipo = null
    this.id = null
  }

  mostrarModal(coleccion: string, id: string) {
    this.oculto = false
    this.tipo = coleccion
    this.id = id
  }
}
