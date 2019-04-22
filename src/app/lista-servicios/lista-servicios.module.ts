import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaServiciosComponent } from './lista-servicios.component'
import { ListaServiciosRoutingModule } from './lista-servicios-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { ModalAgregarClientesListaComponent } from '../componentes/lista-servicios/modal-agregar-clientes-lista/modal-agregar-clientes-lista.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatSnackBarModule, MatNativeDateModule } from '@angular/material';
import { ModalCambiarPrecioComponent } from '../componentes/lista-servicios/modal-cambiar-precio/modal-cambiar-precio.component';
import { ModalAsignarServiciosComponent } from '../componentes/lista-servicios/modal-asignar-servicios/modal-asignar-servicios.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
@NgModule({
  declarations: [
    ListaServiciosComponent,
    ModalAgregarClientesListaComponent,
    ModalCambiarPrecioComponent,
    ModalAsignarServiciosComponent],
  imports: [
    CommonModule,
    ListaServiciosRoutingModule,
    MatGridListModule,
    MatSelectModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatNativeDateModule

  ]
  , entryComponents: [
    ModalAgregarClientesListaComponent,
    ModalCambiarPrecioComponent,
    ModalAsignarServiciosComponent
  ]
})
export class ListaServiciosModule { }
