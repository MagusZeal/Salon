import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaServiciosComponent } from './lista-servicios/lista-servicios.component';
import { ListaServiciosService } from './lista-servicios/lista-servicios.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CobrosPendientesComponent } from './cobros-pendientes/cobros-pendientes.component';
import { CajaComponent } from './caja/caja.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LOCALE_ID, NgModule } from '@angular/core';
import LocaleCL from '@angular/common/locales/es-CL';
import { registerLocaleData } from '@angular/common';
import { AdmClientesComponent } from './adm-clientes/adm-clientes.component';
import { AdmServiciosComponent } from './adm-servicios/adm-servicios.component';
import { ModalAsignarServiciosComponent } from './componentes/modal-asignar-servicios/modal-asignar-servicios.component';
import { AsignarServiciosService } from './componentes/modal-asignar-servicios/asignar-servicios.service';

registerLocaleData(LocaleCL);

@NgModule({
  declarations: [
    AppComponent,
    ListaServiciosComponent,
    CobrosPendientesComponent,
    CajaComponent,
    DashboardComponent,
    AdmClientesComponent,
    AdmServiciosComponent,
    ModalAsignarServiciosComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    TypeaheadModule.forRoot(),
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [ListaServiciosService,
     AsignarServiciosService,
    { provide: LOCALE_ID, useValue: 'es-CL' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
