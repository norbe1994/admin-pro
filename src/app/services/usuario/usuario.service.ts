import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Usuario } from '../../models/usuario.model'
import { URL_SERVICIOS } from '../../config/config'
import { map } from 'rxjs/operators'
import Swal from 'sweetalert2'
import { Router } from '@angular/router'
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service'

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  usuario: Usuario
  token: string

  constructor(
    private http: HttpClient,
    private router: Router,
    private subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage()
  }

  guardarStorage(token: string, usuario: Usuario) {
    localStorage.setItem('token', token)
    localStorage.setItem('usuario', JSON.stringify(usuario))

    this.usuario = usuario
    this.token = token
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token')
      this.usuario = JSON.parse(localStorage.getItem('usuario'))
    } else {
      this.token = ''
      this.usuario = null
    }
  }

  crearUsuario(usuario: Usuario) {
    const url = `${URL_SERVICIOS}/usuario`
    return this.http.post(url, usuario).pipe(
      map((res: any) => {
        Swal.fire({
          title: 'Usuario exitosamente creado',
          text: usuario.email,
          type: 'success',
          confirmButtonText: 'Ok',
          timer: 2000,
        })

        return res.usuario
      })
    )
  }

  actualizarUsuario(usuario: Usuario) {
    const url = `${URL_SERVICIOS}/usuario/${usuario._id}?token=${this.token}`

    return this.http.put(url, usuario).pipe(
      map((res: any) => {
        this.guardarStorage(this.token, usuario)
        Swal.fire({
          title: 'Éxito',
          text: 'Usuario exitosamente actualizado',
          type: 'success',
          confirmButtonText: 'Ok',
          timer: 2000,
        })
        return {
          ok: true,
          mensaje: 'Usuario exitosamente actualizado',
        }
      })
    )
  }

  actualizarImagen(imagen: File, id: String) {
    this.subirArchivoService
      .subirArchivo(imagen, 'usuario', id)
      .then((res: any) => {
        console.log(res)
        this.usuario.img = res.imagenId
        Swal.fire({
          title: 'Éxito',
          text: 'Imagen de usuario exitosamente actualizada',
          type: 'success',
          confirmButtonText: 'Ok',
          timer: 2000,
        })

        this.guardarStorage(this.token, this.usuario)
      })
      .catch(err => {
        Swal.fire({
          title: 'Error',
          text: 'Error de servidor a subir imagen',
          type: 'error',
          confirmButtonText: 'Ok',
        })
        console.log(err)
      })
  }

  login(usuario: Usuario, recuerdame: boolean = false) {
    if (recuerdame) {
      localStorage.setItem('email', usuario.email)
    } else {
      localStorage.removeItem('email')
    }

    const url = `${URL_SERVICIOS}/login`
    return this.http.post(url, usuario).pipe(
      map((res: any) => {
        this.guardarStorage(res.token, res.usuario)

        Swal.fire({
          title: 'Login exitoso',
          text: `Bienvenido ${res.usuario.nombre}`,
          type: 'success',
          confirmButtonText: 'Ok',
          timer: 2000,
        })
        return true
      })
    )
  }

  loginGoogle(token: string) {
    const url = `${URL_SERVICIOS}/login/google`

    return this.http.post(url, { token }).pipe(
      map((res: any) => {
        this.guardarStorage(res.token, res.usuario)

        Swal.fire({
          title: 'Login exitoso',
          text: `Bienvenido ${res.usuario.nombre}`,
          type: 'success',
          confirmButtonText: 'Ok',
          timer: 2000,
        })
        return true
      })
    )
  }

  isLoggedIn() {
    return this.token.length > 0
  }

  logout() {
    this.token = ''
    this.usuario = null

    localStorage.removeItem('token')
    localStorage.removeItem('usuario')

    this.router.navigate(['/login'])
  }
}
