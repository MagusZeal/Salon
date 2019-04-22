import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardClientesRoutingModule } from './dashboard-clientes-routing.module';
import { DashboardClientesComponent } from './dashboard-clientes.component';
import { ModalVerClienteComponent } from '../componentes/dashboard-clientes/modal-ver-cliente/modal-ver-cliente.component';
import { ModalVerClientesServiciosComponent } from '../componentes/dashboard-clientes/modal-ver-clientes-servicios/modal-ver-clientes-servicios.component';
import { TotalesClientesComponent } from '../componentes/dashboard-clientes/totales-clientes/totales-clientes.component';
import { MatToolbarModule, MatGridListModule, MatDatepickerModule, MatInputModule, MatTabsModule, MatPaginatorModule, MatTableModule, MatButtonModule, MatSortModule, MatFormFieldModule, MatDialogModule, MatNativeDateModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    DashboardClientesComponent,
    TotalesClientesComponent,
    ModalVerClientesServiciosComponent,
    ModalVerClienteComponent
  ],
  imports: [
    CommonModule,
    DashboardClientesRoutingModule,
    MatToolbarModule,
    MatGridListModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSortModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatInputModule,
    MatDialogModule,
    MatNativeDateModule

  ],
  entryComponents: [
    ModalVerClientesServiciosComponent,
    ModalVerClienteComponent
  ]
})
export class DashboardClientesModule { }
