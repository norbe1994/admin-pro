import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

// Módulos personalizados
import { SharedModule } from '../shared/shared.module'
import { ChartsModule } from 'ng2-charts'

// Temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component'
import { GraficaDonaComponent } from '../components/grafica-dona/grafica-dona.component'

// Componentes
import { PagesComponent } from './pages.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { ProgressComponent } from './progress/progress.component'
import { Graficas1Component } from './graficas1/graficas1.component'
import { AccountSettingsComponent } from './account-settings/account-settings.component'
import { ProfileComponent } from './profile/profile.component'
import { UsuariosComponent } from './usuarios/usuarios.component'
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component'
import { HospitalesComponent } from './hospitales/hospitales.component'

// Rutas
import { PAGES_ROUTES } from './pages.routes'
import { PromesasComponent } from './promesas/promesas.component'
import { RxjsComponent } from './rxjs/rxjs.component'

// Pipe Module
import { PipesModule } from '../pipes/pipes.module'

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent,
    GraficaDonaComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent,
    UsuariosComponent,
    ModalUploadComponent,
    HospitalesComponent,
  ],
  exports: [DashboardComponent, ProgressComponent, Graficas1Component],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule,
    PipesModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class PagesModule {}
