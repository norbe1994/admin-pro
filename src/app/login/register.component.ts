import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import Swal from 'sweetalert2'
import { UsuarioService } from '../services/usuario/usuario.service'
import { Usuario } from '../models/usuario.model'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup

  constructor(private router: Router, public usuarioService: UsuarioService) {}

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      if (group.controls[campo1].value === group.controls[campo2].value) {
        return null
      }

      return {
        sonIguales: true,
      }
    }
  }

  ngOnInit() {
    this.form = new FormGroup(
      {
        nombre: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
        ]),
        password2: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
        ]),
        aceptaCondiciones: new FormControl(false),
      },
      {
        validators: this.sonIguales('password', 'password2'),
      }
    )
  }

  registrar() {
    if (this.form.invalid) {
      return
    }

    if (!this.form.value.aceptaCondiciones) {
      Swal.fire({
        title: 'Importante',
        text: 'Debe aceptar los término para registrarse',
        type: 'error',
        confirmButtonText: 'Ok',
      })
      return
    }

    const { nombre, email, password } = this.form.value

    const usuario = new Usuario(nombre, email, password)

    this.usuarioService
      .crearUsuario(usuario)
      .subscribe(res => this.router.navigate(['/login']))
  }
}
