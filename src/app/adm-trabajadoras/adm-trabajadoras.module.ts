import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmTrabajadorasRoutingModule } from './adm-trabajadoras-routing.module';
import { AdmTrabajadorasComponent } from './adm-trabajadoras.component';
import { MatToolbarModule, MatGridListModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatTabsModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdmTrabajadorasComponent],
  imports: [
    CommonModule,
    AdmTrabajadorasRoutingModule,
    MatToolbarModule,
    MatGridListModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTabsModule
  ]
})
export class AdmTrabajadorasModule { }
