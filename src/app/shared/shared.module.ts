import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

// Componentes
import { HeaderComponent } from './header/header.component'
import { SidebarComponent } from './sidebar/sidebar.component'
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component'
import { NopagefoundComponent } from './nopagefound/nopagefound.component'

// Pipes Module
import { PipesModule } from '../pipes/pipes.module'

@NgModule({
  imports: [RouterModule, CommonModule, PipesModule],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    NopagefoundComponent,
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    NopagefoundComponent,
  ],
})
export class SharedModule {}
