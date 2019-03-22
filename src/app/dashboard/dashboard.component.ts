import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { MatTableDataSource, MatPaginator } from '@angular/material';
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
  serviciosRealizadosTrabajadora: any[] = [];
  total: number;
  trabajadoras: any[] = [];
  trabajadoraSeleccionada = 'TODAS LAS TRABAJADORAS';
  trabajadoraDrop: any[] = [];
  serviciosRealizados: any = [];
  
  sueldo2: any[] = [];
  breakpoint: number;
  dpInicio =  new FormControl(new Date());
  dpTermino = new FormControl(new Date());
  dataSource;
  dataSource2;
  dataSource3;
  displayedColumns: string[] = ['total', 'ganancia', 'cantidadServicios'];
  displayedColumns2: string[] = ['servicio' , 'precio','cliente','fecha'];
  displayedColumns3: string[] = ['fecha', 'ganancia', 'sinSueldoBase', 'servicios'];

  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild('paginator3') paginator3: MatPaginator;
  
  
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


  sueldo: ISueldo[] = [
    { total: 0, ganancia: 0, cantidadServicios: 0 }
  ];

  constructor(private Dashboard: DashboardService) { }




  seleccionarTrabajadora(event) {
    if (event.value) {
      this.trabajadoraSeleccionada = event.value.nombre;
    } else {
      this.trabajadoraSeleccionada = 'TODAS LAS TRABAJADORAS';
    }

    console.log(this.trabajadoraSeleccionada);
    
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 2;
  }

  async ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
    this.trabajadoras = await Object.values(await this.Dashboard.obtenerTrabajadoras());
   
 


  }

  mapearObjetosArray(objeto) {

    for (var i in objeto) {
      for (var z in objeto[i]) {
        let boleta = objeto[i][z];
        this.boletas.push(boleta);
      }

    }
  }

  _setDataSource(indexNumber) {
    setTimeout(() => {
      switch (indexNumber) {
          case 1:
          !this.dataSource2.paginator ? this.dataSource2.paginator = this.paginator2 : null;
          break;
        case 2:
          !this.dataSource3.paginator ? this.dataSource3.paginator = this.paginator3 : null;
      }
    });
  }


  async buscar() {


    this.limpiar();

    
    
    this.fechaInicio = this.dpInicio.value.toLocaleString('es-CL').substring(6, 10) +
    this.dpInicio.value.toLocaleString('es-CL').substring(3, 5) +
    this.dpInicio.value.toLocaleString('es-CL').substring(0, 2);
    this.fechaTermino = this.dpTermino.value.toLocaleString('es-CL').substring(6, 10) +
    this.dpTermino.value.toLocaleString('es-CL').substring(3, 5) +
    this.dpTermino.value.toLocaleString('es-CL').substring(0, 2);


      console.log(this.fechaInicio, "inicio");
      console.log(this.fechaTermino, "termino");
     
    this.jornadas = await Object.values(await this.Dashboard.obtenerJornadas(this.fechaInicio, this.fechaTermino));
    this.mapearObjetosArray(this.jornadas);



    if (this.trabajadoraSeleccionada == "TODAS LAS TRABAJADORAS") {
      this.tablaTotalesCheckbox = true;
      this.montos(this.boletas);

    } else {
      this.tablaSueldoCheckbox = true;
      this.dineroGanado(this.boletas);

      for (var k in this.sueldo2) {
        this.sueldo[0].ganancia += this.sueldo2[k].valorDia;
      }

    }
  
   


    
    this.dataSource = new MatTableDataSource<any>(this.sueldo);
    this.dataSource2 = new MatTableDataSource<any>(this.serviciosRealizadosTrabajadora);
    this.dataSource3 = new MatTableDataSource<any>(this.sueldo2);

    this.dataSource2.paginator = this.paginator2;
    this.dataSource3.paginator = this.paginator3;
    console.log(this.dataSource3);
    
  }


  dineroGanado(objeto) {

    if (this.trabajadoraSeleccionada != 'TODAS LAS TRABAJADORAS') {
      for (var i in objeto) {




        for (var z in objeto[i].ordenes) {



          if (this.trabajadoraSeleccionada == objeto[i].ordenes[z].trabajadora.nombre) {


            if (!this.sueldo2.find(o => o.fecha === objeto[i].fecha.substring(0, 10))) {
              this.sueldo2.push({ fecha: objeto[i].fecha.substring(0, 10), valor: 0, cantidadServicios: 0, valorDia: 0 });
            }
            this.serviciosRealizadosTrabajadora.push({
              servicio:objeto[i].ordenes[z].servicio.descripcion,
              trabajadora:objeto[i].ordenes[z].trabajadora.nombre,
            precio:objeto[i].ordenes[z].servicio.valor,
          cliente:objeto[i].cliente.nombre,
        fecha:objeto[i].fecha.substring(0, 10)});

            this.serviciosRealizados.push(objeto[i].ordenes[z]);

            this.sueldo[0].total += objeto[i].ordenes[z].servicio.valor;

            this.sueldo[0].cantidadServicios += + 1;


            for (var k in this.sueldo2) {

              if (this.sueldo2[k].fecha == objeto[i].fecha.substring(0, 10)) {
                this.sueldo2[k].cantidadServicios += +1;
                this.sueldo2[k].valor += objeto[i].ordenes[z].servicio.valor *
                  (objeto[i].ordenes[z].trabajadora.categoriaTrabajadora.find(o => o.categoria === objeto[i].ordenes[z].servicio.categoria).porcentaje) * 0.01;

                if (this.sueldo2[k].valor <= objeto[i].ordenes[z].trabajadora.sueldoBase) {

                  this.sueldo2[k].valorDia = objeto[i].ordenes[z].trabajadora.sueldoBase;


                }else{

                  this.sueldo2[k].valorDia= this.sueldo2[k].valor;
                }

              }





            }

          }
        }
      }


    }
  }


  montos(boleta) {

    for (var i in boleta) {

      this.resumenDia.total += boleta[i].montoPrincipal + boleta[i].montoGiftCard +
        boleta[i].montoDescuento + boleta[i].montoEfectivo - boleta[i].montoVuelto;

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
          this.resumenDia.totalEfectivo += boleta[i].montoEfectivo - boleta[i].montoVuelto;
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
      for (var z in boleta[i].ordenes) {
        this.resumenDia.serviciosRealizados += + 1;
       this.resumenDia.totalConBase += boleta[i].ordenes[z].servicio.valor * 
       (((boleta[i].ordenes[z].trabajadora.categoriaTrabajadora.find(o => o.categoria === boleta[i].ordenes[z].servicio.categoria).porcentaje)-100)*(-0.01));
      
      }
    }
  }

  //utils

  lena(a) {

    if (a.length == 1) {
      a = "0" + a;

      return a;
    }
    return a;
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
    this.sueldo = [
      { total: 0, ganancia: 0, cantidadServicios: 0 }
    ];

    this.sueldo2 = [];
    this.serviciosRealizados = [];
    this.boletas = [];
  }

}
