import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  fechaInicio: string;
  fechaTermino: string;
  inicio: string;
  termino: string;
  jornadas: any[] = [];
  boletas: any[] = [];
  asd: any[] = [];
  total: number;
  trabajadoras: any[] = [];
  trabajadoraSeleccionada: {};
  trabajadoraDrop: any[] = [];
  resumenDia = {

    serviciosRealizados: 0,
    total: 0,
    totalConBase: 0,
    clientesAtendidos: 0,
    totalTransbank: 0,
    totalDebito: 0,
    totalCredito: 0,
    totalTransferencia: 0,
    totalEfectivo: 0,
    totalGiftCard: 0,
    totalDescuento: 0

  };
  constructor(private Dashboard: DashboardService) { }


  trabajadorasDropdown(objeto) {
    this.trabajadoraDrop.push({ perfil: "trabajadora", name: "TODAS LAS TRABAJADORAS" })
    for (var i in objeto) {

      if (objeto[i].perfil == 'trabajadora') {

        this.trabajadoraDrop.push(objeto[i]);
      }

    }
  }


  async ngOnInit() {



    this.trabajadoras = await Object.values(await this.Dashboard.obtenerTrabajadoras());
    this.trabajadorasDropdown(this.trabajadoras);
    console.log(this.trabajadoraDrop);
    this.trabajadoraSeleccionada = this.trabajadoraDrop[0];

    this.resumenDia = {

      serviciosRealizados: 0,
      total: 0,
      totalConBase: 0,
      clientesAtendidos: 0,
      totalTransbank: 0,
      totalDebito: 0,
      totalCredito: 0,
      totalTransferencia: 0,
      totalEfectivo: 0,
      totalGiftCard: 0,
      totalDescuento: 0

    };
  }




  mapearObjetosArray(objeto) {

    for (var i in objeto) {
      for (var z in objeto[i]) {
        let boleta = objeto[i][z];
        this.boletas.push(boleta);
      }

    }
  }


  async buscar() {
    console.log(this.trabajadoraSeleccionada);


    this.fechaInicio = this.lena((this.inicio['day'].toString())) + "-" +
      this.lena((this.inicio['month'].toString())) + "-" +
      this.inicio['year'].toString();
    this.fechaTermino = this.lena((this.termino['day'].toString())) + "-" +
      this.lena((this.termino['month'].toString())) + "-" +
      this.termino['year'].toString();

    console.log(this.fechaInicio);
    console.log(this.fechaTermino);
    this.jornadas = await Object.values(await this.Dashboard.obtenerJornadas(this.fechaInicio, this.fechaTermino));
    this.mapearObjetosArray(this.jornadas);

    console.log(this.boletas);
    console.log(this.resumenDia.totalEfectivo);
    this.montos(this.trabajadoraSeleccionada, this.boletas);

console.log(this.resumenDia);

  }

  montos(trabajadora, boleta) {
if(trabajadora.name=="TODAS LAS TRABAJADORAS"){

  
    for (var i in boleta) {
      this.resumenDia.total = boleta[i].montoCobrado - boleta[i].montoVuelto;
 
   
      console.log(boleta[0].montoCobrado);
   console.log(boleta[0].montoVuelto);
   
   
     
      switch ( boleta[i].formaDePagoPrincipal){
        case 'Efectivo':
      
        this.resumenDia.totalEfectivo += boleta[i].montoPrincipal -boleta[i].montoVuelto;
        this.resumenDia.totalGiftCard+=boleta[i].montoGiftCard;
        this.resumenDia.totalDescuento+=boleta[i].montoDescuento;
          break;
        case 'Tarjeta de Crédito':
        this.resumenDia.totalCredito += boleta[i].montoPrincipal;
        this.resumenDia.totalEfectivo+= boleta[i].montoEfectivo -boleta[i].montoVuelto;
        this.resumenDia.totalGiftCard+=boleta[i].montoGiftCard;
        this.resumenDia.totalDescuento+=boleta[i].montoDescuento;
   
        break;
    case 'Tarjeta de Débito':
      
        this.resumenDia.totalDebito += boleta[i].montoPrincipal;
        this.resumenDia.totalEfectivo+= boleta[i].montoEfectivo -boleta.montoVuelto;
        this.resumenDia.totalGiftCard+=boleta[i].montoGiftCard;
        this.resumenDia.totalDescuento+=boleta[i].montoDescuento;
       
        break;
        case 'Transferencia':
      
        this.resumenDia.totalTransferencia += boleta[i].montoPrincipal;
        this.resumenDia.totalGiftCard+= boleta[i].montoGiftCard;
        this.resumenDia.totalDescuento+= boleta[i].montoDescuento;
       
        break;
    case 'Gift Card':
        this.resumenDia.totalGiftCard += boleta[i].montoPrincipal;
        this.resumenDia.totalDescuento+= boleta[i].montoDescuento;
    default:
        
          break;
      }

      
    }}
  }

  lena(a) {

    if (a.length == 1) {
      a = "0" + a;

      return a;
    }
    return a;
  }



}
