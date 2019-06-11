import { Component, OnInit } from '@angular/core'
import { SidebarService } from 'src/app/services/service.index'
import { Router } from '@angular/router'
import { UsuarioService } from '../../services/usuario/usuario.service'
import { Usuario } from '../../models/usuario.model'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  usuario: Usuario

  constructor(
    public _sidebar: SidebarService,
    private router: Router,
    public usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.usuario = this.usuarioService.usuario
  }

  logout() {
    this.router.navigate(['/login'])
  }
}
