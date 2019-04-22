import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CajaRoutingModule } from './caja-routing.module';
import { CajaComponent } from './caja.component';
import { MatToolbarModule, MatGridListModule, MatFormFieldModule, MatSortModule, MatPaginatorModule, MatTableModule, MatIconModule, MatInputModule, MatButtonModule, MatDividerModule, MatListModule, MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BorrarBoletaComponent } from '../componentes/caja/borrar-boleta/borrar-boleta.component';
@NgModule({
  declarations: [
    CajaComponent,
    BorrarBoletaComponent
  ],
  imports: [
    CommonModule,
    CajaRoutingModule,
    MatToolbarModule,
    MatGridListModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule

  ],
  entryComponents:[BorrarBoletaComponent]
})
export class CajaModule { }
