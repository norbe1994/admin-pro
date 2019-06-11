import { Component, OnInit } from '@angular/core'
import { SidebarService } from 'src/app/services/service.index'
import { Router } from '@angular/router'
import { UsuarioService } from '../../services/usuario/usuario.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  constructor(
    public _sidebar: SidebarService,
    private router: Router,
    public usuarioService: UsuarioService
  ) {}

  ngOnInit() {}

  logout() {
    this.router.navigate(['/login'])
  }
}
