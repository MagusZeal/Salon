import { Component, OnInit, Inject } from '@angular/core';
import { ModalEditarCobrosComponent } from '../modal-editar-cobros/modal-editar-cobros.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-cobros-cambiar-precio',
  templateUrl: './modal-cobros-cambiar-precio.component.html',
  styleUrls: ['./modal-cobros-cambiar-precio.component.scss']
})
export class ModalCobrosCambiarPrecioComponent implements OnInit {

  servicios = [];
  serviciosEditados = [];
  serviciosOriginales = [];

  constructor(public dialogRef: MatDialogRef<ModalEditarCobrosComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data.servicios);
    console.log(data.serviciosOriginales);
    
    this.servicios = data.servicios;
    this.serviciosOriginales = data.serviciosOriginales
  }

  ngOnInit() {



    this.serviciosEditados = JSON.parse(JSON.stringify(this.servicios));
    console.log(this.serviciosEditados);



  }



  modificarPrecio() {
    console.log(this.serviciosOriginales.length);

    var arr = [];
    for (var i = 0; i < this.serviciosOriginales.length; i++) {
      console.log(i);


      if (this.serviciosEditados[i].valor >= this.serviciosOriginales[i].valor) {
        arr[i] = true;

      } else {
        arr[i] = false;

      }

    }

    if (arr.every(o => o === true)) {
      this.dialogRef.close(this.serviciosEditados);
    }



  }
}
