import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'

import {
  SharedService,
  SidebarService,
  SettingService,
  UsuarioService,
  SubirArchivoService,
  LoginGuard,
} from './service.index'

@NgModule({
  declarations: [],
  providers: [
    SharedService,
    SidebarService,
    SettingService,
    UsuarioService,
    LoginGuard,
    SubirArchivoService,
  ],
  imports: [CommonModule, HttpClientModule],
})
export class ServiceModule {}
