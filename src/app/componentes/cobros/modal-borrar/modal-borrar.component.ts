import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CobrosPendientesComponent } from 'src/app/cobros-pendientes/cobros-pendientes.component';

@Component({
  selector: 'app-modal-borrar',
  templateUrl: './modal-borrar.component.html',
  styleUrls: ['./modal-borrar.component.scss']
})
export class ModalBorrarComponent  {
  boletaSeleccionada;
  flag = false;
  constructor(public dialogRef: MatDialogRef<CobrosPendientesComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.boletaSeleccionada = data.boleta;
    
    
  }
cerrarModal(bool){

this.dialogRef.close(bool);
}
  

}
