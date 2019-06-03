import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

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

// Rutas
import { PAGES_ROUTES } from './pages.routes'

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent,
    GraficaDonaComponent,
    AccountSettingsComponent,
  ],
  exports: [DashboardComponent, ProgressComponent, Graficas1Component],
  imports: [SharedModule, PAGES_ROUTES, FormsModule, ChartsModule],
})
export class PagesModule {}
