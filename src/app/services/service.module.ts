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
  ModalUploadService,
  HospitalService,
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
    ModalUploadService,
    HospitalService,
  ],
  imports: [CommonModule, HttpClientModule],
})
export class ServiceModule {}
