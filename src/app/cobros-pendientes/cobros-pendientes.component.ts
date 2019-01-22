import { Component, OnInit } from '@angular/core';
import { CobrosPendientesService } from '../cobros-pendientes/cobros-pendientes.service';
import { log } from 'util';
@Component({
  selector: 'app-cobros-pendientes',
  templateUrl: './cobros-pendientes.component.html',
  styleUrls: ['./cobros-pendientes.component.scss']
})
export class CobrosPendientesComponent implements OnInit {

  boletas: any[] = [];
  botones: any[] = [];
  boletaSeleccionada: any;
  checkboxes: any[] = [];
  botonSeleccionado: string;
  montoPrincipal: number;
  montoVuelto: number;
  montoDescuento:number;
  montoGiftCard: number;
  montoEfectivo: number;
  modalDescripcionError: string="";
  
  constructor(private CobroPendiente: CobrosPendientesService) { }

  async ngOnInit() {
 
    this.boletas = [];
    this.botones = [
      { "nombre": "Efectivo" },
      { "nombre": "Tarjeta de Crédito" },
      { "nombre": "Tarjeta de Débito" },
      { "nombre": "Transferencia" },
      { "nombre": "Gift Card" },
    ]
    this.checkboxes = [
      { "nombre": "Descuento", "enabled": false, "valor":false },
      { "nombre": "Gift Card", "enabled": false, "valor":false },
      { "nombre": "Efectivo", "enabled": false, "valor":false }
    ]
    this.CobroPendiente.obtenerBoletas().subscribe(o => this.mapearObjetosArray(o));

  }

 
  mapearObjetosArray(objeto) {

    for (let key in objeto) {

      let boleta = objeto[key];
      boleta['idBoleta'] = key;
      this.boletas.push(boleta);
    }
  }

   pagarBoleta() {
     
  
this.modalDescripcionError="";

    if (isNaN(this.montoPrincipal) || this.montoPrincipal == null ) {
      this.montoPrincipal = 0;

  }

  if (isNaN(this.montoEfectivo) || this.montoEfectivo == null ) {
      this.montoEfectivo = 0;

  }
  if (isNaN(this.montoDescuento) || this.montoDescuento == null ) {
      this.montoDescuento = 0;

  }
  if (isNaN(this.montoGiftCard) || this.montoGiftCard == null || this.montoGiftCard <= 0) {
      this.montoGiftCard = 0;
  }
  
  if (this.boletaSeleccionada.total > (this.montoPrincipal + this.montoDescuento + this.montoGiftCard + this.montoEfectivo)) {
      this.modalDescripcionError = "Lo sentimos! Monto cancelado debe ser mayor o igual al total a pagar";
      
      return;
  }
  
   var jornada ={
    
    pagado:true,
    nombreCliente:this.boletaSeleccionada.nombreCliente,
    fechaPago:new Date().toLocaleString(),
    formaDePagoPrincipal:this.botonSeleccionado,
    montoPrincipal:this.montoPrincipal,
    montoDescuento:this.montoDescuento,
    montoEfectivo:this.montoEfectivo,
    montoGiftCard:this.montoGiftCard,
    montoCobrado:this.boletaSeleccionada.total,
    ordenes:this.boletaSeleccionada.ordenes,
    montoVuelto:this.montoVuelto
      };
      document.getElementById("cerrarModal").click();
      document.getElementById("LinkServicios").click();
      
this.CobroPendiente.agregarJornada(new Date().toLocaleString().substring(0,10),jornada);
this.CobroPendiente.eliminarBoleta(this.boletaSeleccionada['idBoleta']).subscribe();


}
  validarValor(campo) {
    if (isNaN(campo) ||
        campo == null ||
        campo <= 0 ||
        campo == '') {
        return 0;
    }
    return campo;

}
  calcularVuelto(){
    this.montoDescuento = this.checkboxes[0].valor ? this.montoDescuento : NaN;
    this.montoGiftCard = this.checkboxes[1].valor ? this.montoGiftCard : NaN;
    this.montoEfectivo = this.checkboxes[2].valor ? this.montoEfectivo : NaN;

    this.montoVuelto = this.boletaSeleccionada.total - this.montoPrincipal -this.montoEfectivo; 

    this.montoVuelto = - this.boletaSeleccionada.total + this.validarValor(this.montoPrincipal)
    + this.validarValor(this.montoDescuento)
    + this.validarValor(this.montoGiftCard)
    + this.validarValor(this.montoEfectivo);
  }

  seleccionarBoletaBorrar(boleta) {

    this.boletaSeleccionada = boleta;
  }

  seleccionarBoletaPagar(boleta) {

    this.botonSeleccionado= "Efectivo";
    this.radioButtonChange(this.botonSeleccionado);
    this.boletaSeleccionada = boleta;
  }

  borrarBoleta(boleta) {

    this.CobroPendiente.eliminarBoleta(boleta['idBoleta']).subscribe(() => this.ngOnInit());
  }

  radioButtonChange(boton) {
    
    switch (boton) {
      case "Efectivo":
        this.checkboxes = [
          { "nombre": "Descuento", "enabled": true, "valor":false },
          { "nombre": "Gift Card", "enabled": true, "valor":false },
          { "nombre": "Efectivo", "enabled": false, "valor":false }]
        break;
      case "Tarjeta de Crédito":
        this.checkboxes = [
          { "nombre": "Descuento", "enabled": true, "valor":false },
          { "nombre": "Gift Card", "enabled": true, "valor":false },
          { "nombre": "Efectivo", "enabled": true, "valor":false }]
        break;
      case "Tarjeta de Débito":
        this.checkboxes = [
          { "nombre": "Descuento", "enabled": true, "valor":false },
          { "nombre": "Gift Card", "enabled": true, "valor":false },
          { "nombre": "Efectivo", "enabled": true, "valor":false }]
        break;
      case "Transferencia":
        this.checkboxes = [
          { "nombre": "Descuento", "enabled": true, "valor":false },
          { "nombre": "Gift Card", "enabled": true, "valor":false },
          { "nombre": "Efectivo", "enabled": false, "valor":false }]
        break;
      case "Gift Card":
        this.checkboxes = [
          { "nombre": "Descuento", "enabled": true, "valor":false },
          { "nombre": "Gift Card", "enabled": false, "valor":false },
          { "nombre": "Efectivo", "enabled": false, "valor":false }]
        break;


    }

  }

}
