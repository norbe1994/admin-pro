import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

// Rutas
import { APP_ROUTES } from './app.routes'

// Módulos
import { PagesModule } from './pages/pages.module'

// Servicios
import { ServiceModule } from './services/service.module'

// Componentes
import { AppComponent } from './app.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './login/register.component'

// temporales
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [
    BrowserModule,
    PagesModule,
    APP_ROUTES,
    ServiceModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
