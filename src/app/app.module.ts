import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaServiciosComponent } from './lista-servicios/lista-servicios.component';
import { ListaServiciosService } from './lista-servicios/lista-servicios.service';
import { FormsModule} from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CobrosPendientesComponent } from './cobros-pendientes/cobros-pendientes.component';
import { CajaComponent } from './caja/caja.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LOCALE_ID, NgModule } from '@angular/core';
import LocaleCL from '@angular/common/locales/es-CL';
import { registerLocaleData } from '@angular/common';
registerLocaleData(LocaleCL);

@NgModule({
  declarations: [
    AppComponent,
    ListaServiciosComponent,
    CobrosPendientesComponent,
    CajaComponent,
    DashboardComponent,    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    TypeaheadModule.forRoot(),
    NgbModule
  ],
  providers: [ListaServiciosService,
    {provide: LOCALE_ID, useValue: 'es-CL' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
