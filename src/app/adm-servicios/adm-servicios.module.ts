import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmServiciosRoutingModule } from './adm-servicios-routing.module';
import { AdmServiciosComponent } from './adm-servicios.component';
import { ModalEditarComponent } from '../componentes/adm-servicios/modal-editar/modal-editar.component';
import { ModalBorrarServicioComponent } from '../componentes/adm-servicios/modal-borrar-servicio/modal-borrar-servicio.component';
import { ModalAgregarComponent } from '../componentes/adm-servicios/modal-agregar/modal-agregar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule, MatToolbarModule, MatFormFieldModule, MatGridListModule, MatPaginatorModule, 
  MatTableModule, MatButtonModule, MatSortModule, MatCardModule, MatSelectModule, MatDialogModule, MatInputModule } from '@angular/material';


@NgModule({
  declarations: [
    AdmServiciosComponent,
    ModalAgregarComponent,
    ModalBorrarServicioComponent,
    ModalEditarComponent
  ],
  imports: [
    CommonModule,
    AdmServiciosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatGridListModule,
    MatSortModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule

  ],
  entryComponents:[
    ModalAgregarComponent,
    ModalBorrarServicioComponent,
    ModalEditarComponent,
  ]
})
export class AdmServiciosModule { }
