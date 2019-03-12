import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


import { ListaServiciosComponent } from 'src/app/lista-servicios/lista-servicios.component';

@Component({
  selector: 'app-modal-cambiar-precio',
  templateUrl: './modal-cambiar-precio.component.html',
  styleUrls: ['./modal-cambiar-precio.component.scss']
})
export class ModalCambiarPrecioComponent implements OnInit {


  servicios = [];
  serviciosEditados = [];
  serviciosOriginales = [];

  constructor(public dialogRef: MatDialogRef<ListaServiciosComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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