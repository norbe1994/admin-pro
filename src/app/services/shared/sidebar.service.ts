import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'ProgressBar', url: '/progress' },
        { titulo: 'Gráficas', url: '/graficas1' },
        { titulo: 'Promesas', url: '/promesas' },
        { titulo: 'RxJS', url: '/rxjs' },
      ],
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: '/usuarios'},
        { titulo: 'Médicos', url: '/medicos'},
        { titulo: 'Hospitales', url: '/hospitales'},
      ]
    }
  ]

  constructor() {}
}
