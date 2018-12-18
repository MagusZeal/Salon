import { Component, OnInit } from '@angular/core';
import { CobrosPendientesService } from '../cobros-pendientes/cobros-pendientes.service';
@Component({
  selector: 'app-cobros-pendientes',
  templateUrl: './cobros-pendientes.component.html',
  styleUrls: ['./cobros-pendientes.component.scss']
})
export class CobrosPendientesComponent implements OnInit {

  boletas: any[] = [];
  botones: any[] = [];
  checkboxes: any[] = [];
  botonSeleccionado: string;
  constructor(private CobroPendiente: CobrosPendientesService) { }

  async ngOnInit() {
    this.botones = [
      { "nombre": "Efectivo" },
      { "nombre": "Tarjeta de Crédito" },
      { "nombre": "Tarjeta de Débito" },
      { "nombre": "Transferencia" },
      { "nombre": "Gift Card" },
    ]
    this.checkboxes = [
      { "nombre": "Descuento", "enabled": false },
      { "nombre": "Gift Card", "enabled": false },
      { "nombre": "Efectivo", "enabled": false }
    ]
    this.boletas = await Object.values(await this.CobroPendiente.obtenerBoletas());


  }

  radioButtonChange(event) {

    let botones = this.botonSeleccionado;

    switch (this.botonSeleccionado) {
      case "Efectivo":
        this.checkboxes = [
          { "nombre": "Descuento", "enabled": true },
          { "nombre": "Gift Card", "enabled": true },
          { "nombre": "Efectivo", "enabled": false }]
        break;
      case "Tarjeta de Crédito":
        this.checkboxes = [
          { "nombre": "Descuento", "enabled": true },
          { "nombre": "Gift Card", "enabled": true },
          { "nombre": "Efectivo", "enabled": true }]
        break;
      case "Tarjeta de Débito":
        this.checkboxes = [
          { "nombre": "Descuento", "enabled": true },
          { "nombre": "Gift Card", "enabled": true },
          { "nombre": "Efectivo", "enabled": true }]
        break;
      case "Transferencia":
        this.checkboxes = [
          { "nombre": "Descuento", "enabled": true },
          { "nombre": "Gift Card", "enabled": true },
          { "nombre": "Efectivo", "enabled": false }]
        break;
      case "Gift Card":
        this.checkboxes = [
          { "nombre": "Descuento", "enabled": true },
          { "nombre": "Gift Card", "enabled": false },
          { "nombre": "Efectivo", "enabled": false }]
        break;


    }

  }

}
