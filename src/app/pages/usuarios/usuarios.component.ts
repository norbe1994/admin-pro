import { Component, OnInit, OnDestroy } from '@angular/core'
import {
  UsuarioService,
  ModalUploadService,
} from '../../services/service.index'
import { Usuario } from 'src/app/models/usuario.model'
import Swal from 'sweetalert2'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  usuarios: Usuario[] = []
  desde = 0
  porPagina = 5
  total = 0
  cargando = true
  subCargarUsuarios: Subscription
  subNotificationModal: Subscription
  subBuscarUsuarios: Subscription
  subBorrarUsuario: Subscription
  subActualizarUsuario: Subscription

  constructor(
    private usuarioService: UsuarioService,
    private modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarUsuarios()
    this.subNotificationModal = this.modalUploadService.notification.subscribe(
      (res: any) => this.cargarUsuarios()
    )
  }

  cargarUsuarios() {
    this.cargando = true
    this.subCargarUsuarios = this.usuarioService
      .cargarUsuarios(this.desde, this.porPagina)
      .subscribe((res: any) => {
        // deberia ser 'conteo' typo que corregiré luego
        this.total = res.conteto
        this.usuarios = res.usuarios
        this.cargando = false
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

    this.cargarUsuarios()
  }

  buscar(termino: string) {
    if (termino === '') {
      this.cargarUsuarios()
      return
    }
    this.cargando = true
    this.subBuscarUsuarios = this.usuarioService
      .buscarUsuarios(termino)
      .subscribe((res: Usuario[]) => {
        // debería de ser 'res.usuarios', typo que corregiré luego
        this.usuarios = res
        this.total = res.length
        this.cargando = false
      })
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this.usuarioService.usuario._id) {
      Swal.fire({
        title: 'Error',
        text: `No puede borrarse a si mismo 🤣 🤷‍♂️`,
        type: 'error',
        confirmButtonText: 'Ok',
      })
      return
    }

    Swal.fire({
      title: 'Confirmación',
      text: `¿Seguro que desea borrar a ${
        usuario.email
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
          `El usuario previamente conocido como ${
            usuario.nombre
          } ha sido borraro. QEPD.💀`,
          'success'
        )
        this.subBorrarUsuario = this.usuarioService
          .borrarUsuario(usuario._id)
          .subscribe(res => {
            this.desde = 0
            this.cargarUsuarios()
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

  guardarUsuario(usuario: Usuario) {
    this.subActualizarUsuario = this.usuarioService
      .actualizarUsuario(usuario)
      .subscribe()
  }

  mostrarModal(id: string) {
    if (id === this.usuarioService.usuario._id) {
      Swal.fire({
        title: 'Temporal',
        text:
          'Actualmente hay un bug cuando un usuario cambia su propia imagen a través de la tabla de usuarios, mientras se arregla cambie su imagen desde la página de perfil',
        type: 'info',
        confirmButtonText: 'Ok',
      })
    } else {
      this.modalUploadService.mostrarModal('usuario', id)
    }
  }

  ngOnDestroy() {
    if (this.subNotificationModal) this.subNotificationModal.unsubscribe()
    if (this.subCargarUsuarios) this.subCargarUsuarios.unsubscribe()
    if (this.subBuscarUsuarios) this.subBuscarUsuarios.unsubscribe()
    if (this.subActualizarUsuario) this.subActualizarUsuario.unsubscribe()
    if (this.subBorrarUsuario) this.subBorrarUsuario.unsubscribe()
  }
}
