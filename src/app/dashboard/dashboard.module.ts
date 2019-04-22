import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatToolbarModule, MatGridListModule, MatDatepickerModule, MatFormFieldModule, MatSortModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatTabsModule, MatInputModule, MatSelectModule, MatDividerModule, MatListModule, MatDialogModule, MatNativeDateModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerBoletaComponent } from '../componentes/dashboard/ver-boleta/ver-boleta.component';
import { TotalesComponent } from '../componentes/dashboard/totales/totales.component';
import { EspecificoTrabajadoraComponent } from '../componentes/dashboard/especifico-trabajadora/especifico-trabajadora.component';

@NgModule({
  declarations: [
    DashboardComponent,
    EspecificoTrabajadoraComponent,
    TotalesComponent,
    VerBoletaComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatToolbarModule,
    MatGridListModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSortModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    MatNativeDateModule

  ],
  entryComponents:[
  
    VerBoletaComponent,
  ]
})
export class DashboardModule { }
