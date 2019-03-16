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
import { ModalAgregarClienteComponent } from './componentes/modal-agregar-cliente/modal-agregar-cliente.component';
import { DashboardClientesComponent } from './dashboard-clientes/dashboard-clientes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MAT_DIALOG_DEFAULT_OPTIONS, MatInputModule, MatDialogModule, MatButtonToggleModule } from '@angular/material';
import { MatTableModule, MatMenuModule, MatIconModule } from '@angular/material';
import { MatSortModule, MatToolbarModule, MatSidenavModule } from '@angular/material';
import { TableSortingExampleComponent } from './componentes/table-sorting-example/table-sorting-example.component';
import { ModalVerClienteComponent } from './componentes/dashboard-clientes/modal-ver-cliente/modal-ver-cliente.component';
import { ModalVerClientesServiciosComponent } from './componentes/dashboard-clientes/modal-ver-clientes-servicios/modal-ver-clientes-servicios.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ModalCambiarPrecioComponent } from './componentes/modal-cambiar-precio/modal-cambiar-precio.component';
import { ModalPagarComponent } from './componentes/cobros/modal-pagar/modal-pagar.component';
import { ModalBorrarComponent } from './componentes/cobros/modal-borrar/modal-borrar.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { BorrarBoletaComponent } from './componentes/caja/borrar-boleta/borrar-boleta.component';
import { ModalAgregarComponent } from './componentes/adm-servicios/modal-agregar/modal-agregar.component';
import { ModalEditarComponent } from './componentes/adm-servicios/modal-editar/modal-editar.component';
import { ModalBorrarServicioComponent } from './componentes/adm-servicios/modal-borrar-servicio/modal-borrar-servicio.component';
import { AdmClientesAgregarComponent } from './componentes/adm-clientes/adm-clientes-agregar/adm-clientes-agregar.component';
import { AdmClientesEditarComponent } from './componentes/adm-clientes/adm-clientes-editar/adm-clientes-editar.component';
import { AdmClientesBorrarComponent } from './componentes/adm-clientes/adm-clientes-borrar/adm-clientes-borrar.component';
import {MatPaginatorModule} from '@angular/material/paginator';
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
    ModalAgregarClienteComponent,
    DashboardClientesComponent,
    TableSortingExampleComponent,
    ModalVerClienteComponent,
    ModalVerClientesServiciosComponent,
    MainNavComponent,
    ModalCambiarPrecioComponent,
    ModalPagarComponent,
    ModalBorrarComponent,
    BorrarBoletaComponent,
    ModalAgregarComponent,
    ModalEditarComponent,
    ModalBorrarServicioComponent,
    AdmClientesAgregarComponent,
    AdmClientesEditarComponent,
    AdmClientesBorrarComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    TypeaheadModule.forRoot(),
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatSelectModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatSnackBarModule,
    MatCardModule,
    MatExpansionModule,
    MatPaginatorModule

  ],
  providers: [ListaServiciosService,
    AsignarServiciosService,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    { provide: LOCALE_ID, useValue: 'es-CL' }],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalVerClienteComponent,
    ModalVerClientesServiciosComponent,
    ModalAsignarServiciosComponent,
    ModalCambiarPrecioComponent,
    ModalPagarComponent,
    ModalBorrarComponent,
    BorrarBoletaComponent,
    ModalAgregarComponent,
    ModalEditarComponent,
    ModalBorrarServicioComponent,
    AdmClientesAgregarComponent,
    AdmClientesEditarComponent,
    AdmClientesBorrarComponent
  ]
})
export class AppModule { }
