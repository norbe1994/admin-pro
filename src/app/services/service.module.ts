import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedService, SidebarService, SettingService } from './service.index'

@NgModule({
  declarations: [],
  providers: [SharedService, SidebarService, SettingService],
  imports: [CommonModule],
})
export class ServiceModule {}
