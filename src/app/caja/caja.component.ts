import { Component, OnInit } from '@angular/core';
import { CajaService } from '../caja/caja.service';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.scss']
})
export class CajaComponent implements OnInit {

  boletas: any[] =[];
  boletaSeleccionada: any;
  resumenDia = {

    serviciosRealizados: 0,
    totalDia: 0,
    totalDiaConBase: 0,
    clientesAtendidos: 0,
    totalTransbank: 0,
    totalDebito: 0,
    totalCredito: 0,
    totalTransferencia:0,
    totalEfectivo: 0,
    totalGiftCard: 0,
    totalDescuento:0

};

  constructor(private Caja: CajaService) { }

 async ngOnInit() {
  this.boletas = [];
  let c  = new Date().toLocaleString().substring(0,10);


    this.Caja.obtenerJornada(c).subscribe(o => this.mapearObjetosArray(o));
    let b = 1;

console.log(this.boletas);

let d = 1;
    
  }

  mapearObjetosArray(objeto) {

    for (let key in objeto) {

      let boleta = objeto[key];
      boleta['idBoleta'] = key;
     
      switch ( boleta.formaDePagoPrincipal){
        case 'Efectivo':
       
        this.resumenDia.totalEfectivo += boleta.montoPrincipal;
        this.resumenDia.totalEfectivo+= boleta.montoEfectivo;
        this.resumenDia.totalGiftCard+=boleta.montoGiftCard;
        this.resumenDia.totalDescuento+=boleta.montoDescuento;
          break;
        case 'Tarjeta de Crédito':
        this.resumenDia.totalCredito += boleta.montoPrincipal;
        this.resumenDia.totalEfectivo+= boleta.montoEfectivo;
        this.resumenDia.totalGiftCard+=boleta.montoGiftCard;
        this.resumenDia.totalDescuento+=boleta.montoDescuento;
   
        break;
    case 'Tarjeta de Débito':
      
        this.resumenDia.totalDebito += boleta.montoPrincipal;
        this.resumenDia.totalEfectivo+= boleta.montoEfectivo;
        this.resumenDia.totalGiftCard+=boleta.montoGiftCard;
        this.resumenDia.totalDescuento+=boleta.montoDescuento;
       
        break;
        case 'Transferencia':
      
        this.resumenDia.totalTransferencia += boleta.montoPrincipal;
        this.resumenDia.totalGiftCard+=boleta.montoGiftCard;
        this.resumenDia.totalDescuento+=boleta.montoDescuento;
       
        break;
    case 'Gift Card':
        this.resumenDia.totalGiftCard += boleta.montoPrincipal;
        this.resumenDia.totalDescuento+=boleta.montoDescuento;
    default:
        
          break;
      }

      this.boletas.push(boleta);
    }
  }

  seleccionarBoleta(boleta) {

    this.boletaSeleccionada = boleta;
    console.log(this.boletaSeleccionada);
  }

  borrarBoleta(boleta) {

    let a  = new Date().toLocaleString().substring(0,10);
    console.log(a);
    this.Caja.eliminarBoleta(a,boleta['idBoleta']).subscribe(() => this.ngOnInit());

  }

 


}