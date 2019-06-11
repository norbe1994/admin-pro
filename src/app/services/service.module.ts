import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'

import {
  SharedService,
  SidebarService,
  SettingService,
  UsuarioService,
} from './service.index'
import { LoginGuard } from './guards/login.guard'

@NgModule({
  declarations: [],
  providers: [
    SharedService,
    SidebarService,
    SettingService,
    UsuarioService,
    LoginGuard,
  ],
  imports: [CommonModule, HttpClientModule],
})
export class ServiceModule {}
