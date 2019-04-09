import { Component, Inject } from '@angular/core';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-ver-boleta',
  templateUrl: './ver-boleta.component.html',
  styleUrls: ['./ver-boleta.component.scss']
})
export class VerBoletaComponent  {
  boletaSeleccionada;
  constructor(public dialogRef: MatDialogRef<DashboardComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.boletaSeleccionada = data.boleta;
   }

 

}
