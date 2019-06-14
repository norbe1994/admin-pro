import { Component, OnInit } from '@angular/core'
import { Hospital } from 'src/app/models/hospital.model'
import {
  HospitalService,
  UsuarioService,
  ModalUploadService,
} from 'src/app/services/service.index'
import Swal from 'sweetalert2'
import { ModalUploadComponent } from '../../components/modal-upload/modal-upload.component'

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css'],
})
export class HospitalesComponent implements OnInit {
  cargando = true
  total = 0
  hospitales: Hospital[] = []
  desde = 0
  porPagina = 5

  constructor(
    private hospitalService: HospitalService,
    private usuarioService: UsuarioService,
    private modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarHospitales()
    this.modalUploadService.notificactionImagenSubida.subscribe(
      (coleccion: string) => {
        if (coleccion === 'hospital') {
          this.cargarHospitales()
        }
      }
    )
  }

  cargarHospitales() {
    this.cargando = true
    this.hospitalService
      .cargarHospitales(this.desde, this.porPagina)
      .subscribe((res: any) => {
        this.total = res.conteo
        this.hospitales = res.hospitales
        this.cargando = false
      })
  }

  buscar(termino: string) {
    if (termino === '') {
      this.cargarHospitales()
      return
    }
    this.cargando = true
    this.hospitalService
      .buscarHospitales(termino)
      .subscribe((res: Hospital[]) => {
        this.hospitales = res
        this.total = res.length
        this.cargando = false
      })
  }

  mostrarModal(id: string) {
    this.modalUploadService.mostrarModal('hospital', id)
  }

  async crearHospital() {
    const { value: nombre } = await Swal.fire({
      title: 'Crear hospital',
      input: 'text',
      inputPlaceholder: 'nombre del hospital',
      inputValidator: (value: string) => {
        if (!value) {
          return '¡El nombre es requerido! 🧐'
        }
      },
    })

    const hospital = new Hospital(nombre, this.usuarioService.usuario._id)

    this.hospitalService.crearHospital(hospital).subscribe(res => {
      this.cargarHospitales()
    })
  }

  guardarHospital(hospital: Hospital, nuevoNombre: string) {
    const nuevoHospital: Hospital = {
      ...hospital,
      nombre: nuevoNombre,
    }

    console.log(nuevoHospital)
    this.hospitalService.actualizarHospital(nuevoHospital).subscribe()
  }

  borrarHospital(hospital: Hospital) {
    Swal.fire({
      title: 'Confirmación',
      text: `¿Seguro que desea borrar el ${
        hospital.nombre
      }?¡No es posible revertir esta acción!🔍👀`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Borrar.',
    }).then(result => {
      if (result.value) {
        Swal.fire(
          '¡Borrado!',
          ` ${hospital.nombre} ha sido borraro.`,
          'success'
        )
        this.hospitalService.borrarHospital(hospital._id).subscribe(res => {
          this.desde = 0
          this.cargarHospitales()
        })
      } else {
        Swal.fire({
          text:
            'Gracias a Dios que tenemos a un prorgamador que anticipa estas cosas',
          type: 'info',
          confirmButtonText: `🙊 ¡Eso estuvo cerca!`,
        })
      }
    })
  }

  pasarPagina(modificador: number) {
    this.desde += this.porPagina * modificador

    if (this.desde >= this.total) {
      this.desde = this.total - 1
      return
    }

    if (this.desde < 0) {
      this.desde = 0
      return
    }

    this.cargarHospitales()
  }
}
