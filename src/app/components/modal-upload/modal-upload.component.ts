import { Component, OnInit, EventEmitter } from '@angular/core'
import Swal from 'sweetalert2'
import {
  SubirArchivoService,
  ModalUploadService,
} from 'src/app/services/service.index'

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.css'],
})
export class ModalUploadComponent implements OnInit {
  oculto = false
  imagen: File
  imagenTemporal: any

  constructor(
    private subirArchivoService: SubirArchivoService,
    public modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {}

  cerrarModal() {
    this.imagen = null
    this.imagenTemporal = null
    this.modalUploadService.ocultarModal()
  }

  seleccionImagen(imagen: File) {
    if (!imagen) {
      this.imagen = null
      return
    }

    if (imagen.type.indexOf('image') < 0) {
      Swal.fire({
        title: 'Error',
        text: 'El archivo debe ser una imagen',
        type: 'error',
        confirmButtonText: 'Ok',
      })
      this.imagen = null
      return
    }

    this.imagen = imagen

    const reader = new FileReader()
    const urlImagenTemporal = reader.readAsDataURL(imagen)

    reader.onloadend = () => (this.imagenTemporal = reader.result)
  }

  subirImagen() {
    this.subirArchivoService
      .subirArchivo(
        this.imagen,
        this.modalUploadService.tipo,
        this.modalUploadService.id
      )
      .then(res => {
        this.modalUploadService.notification.emit(res)
        this.modalUploadService.notificactionImagenSubida.emit(
          this.modalUploadService.tipo
        )
        this.cerrarModal()
      })
      .catch(err => {
        this.cerrarModal()
        Swal.fire({
          title: 'Error',
          type: 'error',
          text:
            'Error al cargar imagen. Asegurese de que sea png, jpg, gif o jpeg',
          confirmButtonText: 'Ok',
        })
      })
  }
}
