import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tablaTotalesCheckbox: boolean = false;
  tablaSueldoCheckbox: boolean = false;
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
  serviciosRealizados: any = [];
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

  sueldo = {
    total: 0,
    ganancia: 0,
    cantidadServicios: 0

  }

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

  }




  mapearObjetosArray(objeto) {

    for (var i in objeto) {
      for (var z in objeto[i]) {
        let boleta = objeto[i][z];
        this.boletas.push(boleta);
      }

    }
  }

  limpiar() {
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
    this.tablaTotalesCheckbox = false;
    this.tablaSueldoCheckbox = false;
    this.sueldo = {
      total: 0,
      ganancia: 0,
      cantidadServicios: 0

    };
    this.serviciosRealizados = [];
    this.boletas = [];
  }

  async buscar() {


    this.limpiar();

    console.log(this.trabajadoraSeleccionada);


    this.fechaInicio = this.lena((this.inicio['day'].toString())) + "-" +
      this.lena((this.inicio['month'].toString())) + "-" +
      this.inicio['year'].toString();
    this.fechaTermino = this.lena((this.termino['day'].toString())) + "-" +
      this.lena((this.termino['month'].toString())) + "-" +
      this.termino['year'].toString();


    this.jornadas = await Object.values(await this.Dashboard.obtenerJornadas(this.fechaInicio, this.fechaTermino));
    this.mapearObjetosArray(this.jornadas);

    if (this.trabajadoraSeleccionada['name'] == "TODAS LAS TRABAJADORAS") {
      this.tablaTotalesCheckbox = true;
      this.montos(this.trabajadoraSeleccionada, this.boletas);

    } else {
      this.tablaSueldoCheckbox = true;
      this.dineroGanado(this.boletas);
      console.log(this.sueldo.total);
      console.log(this.sueldo.ganancia);
    }



  }


  dineroGanado(objeto) {
    if (this.trabajadoraSeleccionada['name'] != 'TODAS LAS TRABAJADORAS') {
      for (var i in objeto) {
        console.log(objeto[i]);
        for (var z in objeto[i].ordenes) {


          if (this.trabajadoraSeleccionada['name'] == objeto[i].ordenes[z].TrabajadoraNombre) {
            console.log(objeto[i].ordenes[z].ValorServicio);
            this.serviciosRealizados.push(objeto[i].ordenes[z]);
            this.sueldo.total += objeto[i].ordenes[z].ValorServicio;
            console.log(objeto[i].ordenes[z].ValorServicio);
            this.sueldo.cantidadServicios += this.sueldo.cantidadServicios + 1;
            this.sueldo.ganancia += objeto[i].ordenes[z].ValorServicio * (this.trabajadoraSeleccionada['servicios'][objeto[i].ordenes[z].ServicioCategoria] * 0.01);



            //this.trabajadoraSeleccionada.servicios['objeto[i].ordenes[z].ServicioCategoria'];

          }

        }
      }
    }


  }


  montos(trabajadora, boleta) {
    if (trabajadora.name == "TODAS LAS TRABAJADORAS") {


      for (var i in boleta) {
        this.resumenDia.total = boleta[i].montoPrincipal + boleta[i].montoGiftCard +
          boleta[i].montoDescuento + boleta[i].montoEfectivo - boleta[i].montoVuelto;


        console.log(boleta[0].montoCobrado);
        console.log(boleta[0].montoVuelto);



        switch (boleta[i].formaDePagoPrincipal) {
          case 'Efectivo':

            this.resumenDia.totalEfectivo += boleta[i].montoPrincipal - boleta[i].montoVuelto;
            this.resumenDia.totalGiftCard += boleta[i].montoGiftCard;
            this.resumenDia.totalDescuento += boleta[i].montoDescuento;
            break;
          case 'Tarjeta de Crédito':
            this.resumenDia.totalCredito += boleta[i].montoPrincipal;
            this.resumenDia.totalEfectivo += boleta[i].montoEfectivo - boleta[i].montoVuelto;
            this.resumenDia.totalGiftCard += boleta[i].montoGiftCard;
            this.resumenDia.totalDescuento += boleta[i].montoDescuento;

            break;
          case 'Tarjeta de Débito':

            this.resumenDia.totalDebito += boleta[i].montoPrincipal;
            this.resumenDia.totalEfectivo += boleta[i].montoEfectivo - boleta.montoVuelto;
            this.resumenDia.totalGiftCard += boleta[i].montoGiftCard;
            this.resumenDia.totalDescuento += boleta[i].montoDescuento;

            break;
          case 'Transferencia':

            this.resumenDia.totalTransferencia += boleta[i].montoPrincipal;
            this.resumenDia.totalGiftCard += boleta[i].montoGiftCard;
            this.resumenDia.totalDescuento += boleta[i].montoDescuento;

            break;
          case 'Gift Card':
            this.resumenDia.totalGiftCard += boleta[i].montoPrincipal;
            this.resumenDia.totalDescuento += boleta[i].montoDescuento;
          default:

            break;
        }


      }
    }
  }

  lena(a) {

    if (a.length == 1) {
      a = "0" + a;

      return a;
    }
    return a;
  }



}
