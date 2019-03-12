import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CajaComponent } from 'src/app/caja/caja.component';

@Component({
  selector: 'app-borrar-boleta',
  templateUrl: './borrar-boleta.component.html',
  styleUrls: ['./borrar-boleta.component.scss']
})
export class BorrarBoletaComponent  {
  boletaSeleccionada;
  flag = false;
  constructor(public dialogRef: MatDialogRef<CajaComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.boletaSeleccionada = data.boleta;
   }

   cerrarModal(bool){

    this.dialogRef.close(bool);
    }
}
