import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { URL_SERVICIOS } from 'src/app/config/config'
import { map } from 'rxjs/operators'
import { Hospital } from 'src/app/models/hospital.model'
import { UsuarioService } from '../usuario/usuario.service'
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) {}

  cargarHospitales(desde: Number, porPagina: Number) {
    const url = `${URL_SERVICIOS}/hospital?desde=${desde}&porPagina=${porPagina}`
    return this.http.get(url)
  }

  crearHospital(hospital: Hospital) {
    const url = `${URL_SERVICIOS}/hospital?token=${this.usuarioService.token}`
    return this.http.post(url, hospital).pipe(
      map((res: any) => {
        return res.hospital
      })
    )
  }

  actualizarHospital(hospital: Hospital) {
    const url = `${URL_SERVICIOS}/hospital/${hospital._id}?token=${
      this.usuarioService.token
    }`

    return this.http.put(url, hospital).pipe(
      map((res: any) => {
        Swal.fire({
          title: 'Éxito',
          text: 'Hospital exitosamente actualizado',
          type: 'success',
          confirmButtonText: 'Ok',
          timer: 2000,
        })
        return {
          ok: true,
          mensaje: 'Hospital exitosamente actualizado',
        }
      })
    )
  }

  borrarHospital(id: string) {
    const url = `${URL_SERVICIOS}/hospital/${id}?token=${
      this.usuarioService.token
    }`
    return this.http.delete(url)
  }

  buscarHospitales(termino: string) {
    const url = `${URL_SERVICIOS}/busqueda/hospital/${termino}`

    return this.http.get(url).pipe(map((res: any) => res.hospital))
  }
}
