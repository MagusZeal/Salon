import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { ModalPagarService } from './modal-pagar.service'
import { CobrosPendientesComponent } from 'src/app/cobros-pendientes/cobros-pendientes.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modal-pagar',
  templateUrl: './modal-pagar.component.html',
  styleUrls: ['./modal-pagar.component.scss']
})
export class ModalPagarComponent implements OnInit {
  botones: any[] = [];
  boletaSeleccionada: IBoleta;
  checkboxes: any[] = [];
  botonSeleccionado: string;
  montoPrincipal: number;
  montoVuelto: number;
  montoDescuento: number;
  montoGiftCard: number;
  montoEfectivo: number;
  filter: any;
  floatLabel = 'always';
  reserva;
  one;
  constructor(private router: Router, public dialogRef: MatDialogRef<CobrosPendientesComponent>, private snackBar: MatSnackBar, private service: ModalPagarService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.boletaSeleccionada = data.boleta;
    this.reserva = data.reserva;
  }




  ngOnInit() {


    this.botones = [
      { "nombre": "Efectivo" },
      { "nombre": "Tarjeta de Crédito" },
      { "nombre": "Tarjeta de Débito" },
      { "nombre": "Transferencia" },
      { "nombre": "Gift Card" },
    ]
    this.checkboxes = [
      { "nombre": "Descuento", "enabled": false, "valor": false },
      { "nombre": "Gift Card", "enabled": false, "valor": false },
      { "nombre": "Efectivo", "enabled": false, "valor": false }
    ]

    this.botonSeleccionado = "Efectivo";
    this.radioButtonChange(this.botonSeleccionado);

  }

  getCheckboxes() {
    console.log(this.checkboxes.filter(x => x.valor === true).map(x => x.nombre));
  }

  radioButtonChange(boton) {
    console.log(boton);

    switch (boton) {
      case "Efectivo":
        this.checkboxes = [
          { "nombre": "Descuento", "enabled": true, "valor": false },
          { "nombre": "Gift Card", "enabled": true, "valor": false },
          { "nombre": "Efectivo", "enabled": false, "valor": false }]
        break;
      case "Tarjeta de Crédito":
        this.checkboxes = [
          { "nombre": "Descuento", "enabled": true, "valor": false },
          { "nombre": "Gift Card", "enabled": true, "valor": false },
          { "nombre": "Efectivo", "enabled": true, "valor": false }]
        break;
      case "Tarjeta de Débito":
        this.checkboxes = [
          { "nombre": "Descuento", "enabled": true, "valor": false },
          { "nombre": "Gift Card", "enabled": true, "valor": false },
          { "nombre": "Efectivo", "enabled": true, "valor": false }]
        break;
      case "Transferencia":
        this.checkboxes = [
          { "nombre": "Descuento", "enabled": true, "valor": false },
          { "nombre": "Gift Card", "enabled": true, "valor": false },
          { "nombre": "Efectivo", "enabled": false, "valor": false }]
        break;
      case "Gift Card":
        this.checkboxes = [
          { "nombre": "Descuento", "enabled": true, "valor": false },
          { "nombre": "Gift Card", "enabled": false, "valor": false },
          { "nombre": "Efectivo", "enabled": false, "valor": false }]
        break;


    }

  }

  calcularVuelto() {

    this.montoDescuento = this.checkboxes[0].valor ? this.montoDescuento : NaN;
    this.montoGiftCard = this.checkboxes[1].valor ? this.montoGiftCard : NaN;
    this.montoEfectivo = this.checkboxes[2].valor ? this.montoEfectivo : NaN;

    this.montoVuelto = this.boletaSeleccionada.total - this.montoPrincipal - this.montoEfectivo;

    this.montoVuelto = - this.boletaSeleccionada.total + this.validarValor(this.montoPrincipal)
      + this.validarValor(this.montoDescuento)
      + this.validarValor(this.montoGiftCard)
      + this.validarValor(this.montoEfectivo);
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
  pagarBoleta(botonDeshabilitado) {

    botonDeshabilitado.disabled = true;

    if (isNaN(this.montoPrincipal) || this.montoPrincipal == null) {
      this.montoPrincipal = 0;

    }

    if (isNaN(this.montoEfectivo) || this.montoEfectivo == null) {
      this.montoEfectivo = 0;

    }
    if (isNaN(this.montoDescuento) || this.montoDescuento == null) {
      this.montoDescuento = 0;

    }
    if (isNaN(this.montoGiftCard) || this.montoGiftCard == null || this.montoGiftCard <= 0) {
      this.montoGiftCard = 0;
    }

    if (this.boletaSeleccionada.total > (this.montoPrincipal + this.montoDescuento + this.montoGiftCard + this.montoEfectivo)) {

      this.openSnackBar("Lo sentimos! Monto cancelado debe ser mayor o igual al total a pagar 🙅‍", "Ok");
      botonDeshabilitado.disabled = false;
      return;
    }

    var jornada: IJornada = {


      fecha: this.boletaSeleccionada.fecha,
      formaDePagoPrincipal: this.botonSeleccionado,
      montoPrincipal: this.montoPrincipal,
      montoDescuento: this.montoDescuento,
      montoEfectivo: this.montoEfectivo,
      montoGiftCard: this.montoGiftCard,
      montoCobrado: this.boletaSeleccionada.total,
      ordenes: this.boletaSeleccionada.ordenes,
      montoVuelto: this.montoVuelto,
      cliente: this.boletaSeleccionada.cliente,
      horaReservada: this.boletaSeleccionada.horaReservada,
      idUsuario: this.boletaSeleccionada.idUsuario
    };

    this.dialogRef.close();
 

    var a = this.boletaSeleccionada.fecha.substring(6, 10) + this.boletaSeleccionada.fecha.substring(3, 5) + this.boletaSeleccionada.fecha.substring(0, 2);

    this.service.agregarJornada(a, jornada).subscribe();
   


    
    


    if (this.reserva == false) {
      this.service.eliminarBoletaDia(this.boletaSeleccionada['idBoleta']).subscribe();

    } else {
      this.service.eliminarBoletaReserva(this.boletaSeleccionada['idBoleta']).subscribe();
    }

    this.router.navigate(['Caja']);
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
}