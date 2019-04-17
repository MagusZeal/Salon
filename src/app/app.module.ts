import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaServiciosComponent } from './lista-servicios/lista-servicios.component';
import { ListaServiciosService } from './lista-servicios/lista-servicios.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';


import { CobrosPendientesComponent } from './cobros-pendientes/cobros-pendientes.component';
import { CajaComponent } from './caja/caja.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { LOCALE_ID, NgModule } from '@angular/core';
import LocaleCL from '@angular/common/locales/es-CL';
import { registerLocaleData } from '@angular/common';
import { AdmClientesComponent } from './adm-clientes/adm-clientes.component';
import { AdmServiciosComponent } from './adm-servicios/adm-servicios.component';
import { ModalAsignarServiciosComponent } from './componentes/modal-asignar-servicios/modal-asignar-servicios.component';
import { AsignarServiciosService } from './componentes/modal-asignar-servicios/asignar-servicios.service';

import { DashboardClientesComponent } from './dashboard-clientes/dashboard-clientes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MAT_DIALOG_DEFAULT_OPTIONS, MatInputModule, MatDialogModule, MatButtonToggleModule, MatNativeDateModule } from '@angular/material';
import { MatTableModule, MatMenuModule, MatIconModule } from '@angular/material';
import { MatSortModule, MatToolbarModule, MatSidenavModule } from '@angular/material';
import { TableSortingExampleComponent } from './componentes/table-sorting-example/table-sorting-example.component';
import { ModalVerClienteComponent } from './componentes/dashboard-clientes/modal-ver-cliente/modal-ver-cliente.component';
import { ModalVerClientesServiciosComponent } from './componentes/dashboard-clientes/modal-ver-clientes-servicios/modal-ver-clientes-servicios.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule, } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { VerBoletaComponent } from './componentes/dashboard/ver-boleta/ver-boleta.component';
import { GraficosComponent } from './graficos/graficos.component';
import { ModalEditarCobrosComponent } from './componentes/cobros/modal-editar-cobros/modal-editar-cobros.component';
import { TotalesComponent } from './componentes/dashboard/totales/totales.component';
import { EspecificoTrabajadoraComponent } from './componentes/dashboard/especifico-trabajadora/especifico-trabajadora.component';
import { TotalesClientesComponent } from './componentes/dashboard-clientes/totales-clientes/totales-clientes.component';
import { ModalAgregarClientesListaComponent } from './componentes/lista-servicios/modal-agregar-clientes-lista/modal-agregar-clientes-lista.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { PasswordRecoveryComponent } from './componentes/login/password-recovery/password-recovery.component';
import { ModalPasswordRecoveryComponent } from './componentes/login/modal-password-recovery/modal-password-recovery.component';
import { PerfilComponent } from './perfil/perfil/perfil.component';


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
    AdmClientesBorrarComponent,
    VerBoletaComponent,
    GraficosComponent,
    ModalEditarCobrosComponent,
    TotalesComponent,
    EspecificoTrabajadoraComponent,
    TotalesClientesComponent,
    ModalAgregarClientesListaComponent,
    LoginComponent,
    PasswordRecoveryComponent,
    ModalPasswordRecoveryComponent,
    PerfilComponent,
  
  
  ],
  
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAEuWcpnCL2ctm5lc0Wu-7ho1TaORoxMJQ",
      authDomain: "devs-c9cdc.firebaseapp.com",
      databaseURL: "https://devs-c9cdc.firebaseio.com",
      projectId: "devs-c9cdc",
      storageBucket: "devs-c9cdc.appspot.com",
      messagingSenderId: "477801868148"
    }),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
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
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule
  ],
  providers: [ListaServiciosService,
    AsignarServiciosService,
    AuthGuard,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    { provide: LOCALE_ID, useValue: 'es-CL' }],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalPasswordRecoveryComponent,
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
    AdmClientesBorrarComponent,
    VerBoletaComponent,
    ModalEditarCobrosComponent,
    PasswordRecoveryComponent,
    ModalAgregarClientesListaComponent,
  

  ],


})
export class AppModule { }
