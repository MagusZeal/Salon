import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmClientesRoutingModule } from './adm-clientes-routing.module';
import { AdmClientesComponent } from './adm-clientes.component';
import { AdmClientesEditarComponent } from '../componentes/adm-clientes/adm-clientes-editar/adm-clientes-editar.component';
import { AdmClientesBorrarComponent } from '../componentes/adm-clientes/adm-clientes-borrar/adm-clientes-borrar.component';
import { AdmClientesAgregarComponent } from '../componentes/adm-clientes/adm-clientes-agregar/adm-clientes-agregar.component';
import { MatInputModule, MatDialogModule, MatSelectModule, MatCardModule, MatPaginatorModule, MatTableModule, MatButtonModule, MatSortModule, MatGridListModule, MatFormFieldModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdmClientesComponent,
    AdmClientesAgregarComponent,
    AdmClientesBorrarComponent,
    AdmClientesEditarComponent
  ],
  imports: [
    CommonModule,
    AdmClientesRoutingModule,
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
    AdmClientesAgregarComponent,
    AdmClientesBorrarComponent,
    AdmClientesEditarComponent
  ]
})
export class AdmClientesModule { }
