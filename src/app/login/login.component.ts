import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { UsuarioService } from '../services/service.index'
import { Usuario } from '../models/usuario.model'

declare function init_plugins()
declare const gapi: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup
  email: string
  recuerdame: boolean = false
  auth2: any

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  ngOnInit() {
    init_plugins()
    this.googleInit()

    this.form = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      recuerdame: new FormControl(false),
    })

    this.email = localStorage.getItem('email') || ''

    if (this.email.length > 0) {
      this.recuerdame = true
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '982827135795-labud7i0vlid1974953g7srq64p1avqo.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email',
      })

      this.attachSignIn(document.getElementById('btnGoogle'))
    })
  }

  attachSignIn(element: any) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      const token = googleUser.getAuthResponse().id_token
      this.usuarioService.loginGoogle(token).subscribe(res => {
        this.router.navigate(['/dashboard'])
      })
    })
  }

  ingresar() {
    if (this.form.invalid) {
      return
    }

    const { email, password, recuerdame } = this.form.value

    const usuario = new Usuario(null, email, password)

    this.usuarioService.login(usuario, recuerdame).subscribe(res => {
      this.router.navigate(['/dashboard'])
    })
  }
}
