import { Component, Inject } from '@angular/core';
import { ModalBorrarServicioService } from './modal-borrar-servicio.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdmServiciosComponent } from 'src/app/adm-servicios/adm-servicios.component';

@Component({
  selector: 'app-modal-borrar-servicio',
  templateUrl: './modal-borrar-servicio.component.html',
  styleUrls: ['./modal-borrar-servicio.component.scss']
})
export class ModalBorrarServicioComponent {
  servicioSeleccionado;
  constructor(private service: ModalBorrarServicioService, public dialogRef: MatDialogRef<AdmServiciosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.servicioSeleccionado = data.servicioSeleccionado
  }

  async onSubmit() {

    await this.service.eliminarServicio(this.servicioSeleccionado.idServicio);
    this.dialogRef.close(true);

  }


}
