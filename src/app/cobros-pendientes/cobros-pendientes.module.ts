import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CobrosPendientesRoutingModule } from './cobros-pendientes-routing.module';
import { CobrosPendientesComponent } from './cobros-pendientes.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule, MatNativeDateModule, MatSnackBarModule } from '@angular/material';
import { ModalBorrarComponent } from '../componentes/cobros/modal-borrar/modal-borrar.component';
import { ModalPagarComponent } from '../componentes/cobros/modal-pagar/modal-pagar.component';
import { ModalEditarCobrosComponent } from '../componentes/cobros/modal-editar-cobros/modal-editar-cobros.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalCobrosCambiarPrecioComponent } from '../componentes/cobros/modal-cobros-cambiar-precio/modal-cobros-cambiar-precio.component';
import { BoletaSinReservaComponent } from '../componentes/cobros/boleta-sin-reserva/boleta-sin-reserva.component';
import { BoletaReservaDiaComponent } from '../componentes/cobros/boleta-reserva-dia/boleta-reserva-dia.component';
import { BoletaReservasFuturasComponent } from '../componentes/cobros/boleta-reservas-futuras/boleta-reservas-futuras.component';

@NgModule({
  declarations: [
    CobrosPendientesComponent,
    ModalBorrarComponent,
    ModalPagarComponent,
    ModalEditarCobrosComponent,
    ModalCobrosCambiarPrecioComponent,
    BoletaSinReservaComponent,
    BoletaReservaDiaComponent,
    BoletaReservasFuturasComponent
  ],
  imports: [
    CommonModule,
    CobrosPendientesRoutingModule,
    MatGridListModule,
    MatToolbarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    FormsModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatNativeDateModule

  ],
  entryComponents: [
    ModalBorrarComponent,
    ModalPagarComponent,
    ModalEditarCobrosComponent,
    ModalCobrosCambiarPrecioComponent
  ]
})
export class CobrosPendientesModule { }
