import { Component, OnInit } from '@angular/core'
import { UsuarioService } from 'src/app/services/service.index'
import { Usuario } from 'src/app/models/usuario.model'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  usuario: Usuario
  form: FormGroup
  imagen: File
  imagenTemporal: any

  constructor(private usuarioService: UsuarioService) {
    this.usuario = this.usuarioService.usuario
  }

  ngOnInit() {
    this.form = new FormGroup({
      nombre: new FormControl(this.usuario.nombre, [
        Validators.required,
        Validators.minLength(1),
      ]),
      email: new FormControl(this.usuario.email, [
        Validators.required,
        Validators.email,
      ]),
    })
  }

  actualizar() {
    if (this.form.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Formulario inválido',
        type: 'error',
        confirmButtonText: 'Ok',
      })
      return
    }

    // este método nos puede dar problemas ya que si llegase a haber un error de servidor
    // la versión del usuario del front end (servicio y localStorage) y de MongoDB van a ser distintas
    // eventualmente aplicaremos el patron REDUX para ayudarnos a mantener una sola 'verdad'
    this.usuario.nombre = this.form.value.nombre
    // solo permitir modificar el correy a usuarios que no fueron creados por Google login
    if (!this.usuario.isGoogle) {
      this.usuario.email = this.form.value.email
    }

    this.usuarioService.actualizarUsuario(this.usuario).subscribe(res => {
      console.log(res)
    })
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

  actualizarImagen() {
    this.usuarioService.actualizarImagen(this.imagen, this.usuario._id)
  }
}
