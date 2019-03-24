import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';


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
  serviciosMasRealizados: any[] = [];
  sueldo2: any[] = [];
  breakpoint: number;
  dpInicio = new FormControl(new Date());
  dpTermino = new FormControl(new Date());
  dataSource;
  dataSource2;
  dataSource3;
  dataSource4;
  dataSourceTodo;
  dataSourceTodo2;
  dataSourceTodo3;

  displayedColumns: string[] = ['total', 'ganancia', 'cantidadServicios'];
  displayedColumns2: string[] = ['servicio', 'precio', 'cliente', 'fecha'];
  displayedColumns3: string[] = ['fecha', 'valorDia', 'valor', 'cantidadServicios'];
  displayedColumns4: string[] = ['servicio', 'cantidadServicios', 'valorTotal'];

  columnsTodo: string[] = ['total', 'ganancia', 'serviciosRealizados', 'totalEfectivo', 'totalCredito'];
  columnsTodo2: string[] = ['totalDebito', 'totalTransferencia', 'totalGiftCard', 'totalDescuento'];
  columnsTodo3: string[] = ['servicio', 'trabajadora', 'precio', 'cliente', 'fecha'];

  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild('paginator3') paginator3: MatPaginator;
  @ViewChild('paginator4') paginator4: MatPaginator;

  @ViewChild('sort2') sort2: MatSort;
  @ViewChild('sort3') sort3: MatSort;
  @ViewChild('sort4') sort4: MatSort;

  resumen = [{
    serviciosRealizados: 0,
    total: 0,
    ganancia: 0,
    clientesAtendidos: 0,
    totalTransbank: 0,
    totalDebito: 0,
    totalCredito: 0,
    totalTransferencia: 0,
    totalEfectivo: 0,
    totalGiftCard: 0,
    totalDescuento: 0

  }];

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

  applyFilter(filterValue: string, dataSource) {
    dataSource.filter = filterValue.trim().toLowerCase();
  }

  _setDataSource(indexNumber) {
    setTimeout(() => {
      switch (indexNumber) {
        case 1:
          !this.dataSource2.paginator ? this.dataSource2.paginator = this.paginator2 : null;
          !this.dataSource2.sort ? this.dataSource2.sort = this.sort2 : null;

          break;
        case 2:
          !this.dataSource3.paginator ? this.dataSource3.paginator = this.paginator3 : null;
          !this.dataSource3.sort ? this.dataSource3.sort = this.sort3 : null;

          break;
        case 3:
          !this.dataSource4.paginator ? this.dataSource4.paginator = this.paginator4 : null;
          !this.dataSource4.sort ? this.dataSource4.sort = this.sort4 : null;
          break;
      }
    });
  }
  _setDataSource2(indexNumber) {
    setTimeout(() => {
      switch (indexNumber) {
        case 1:

          !this.dataSource2.paginator ? this.dataSource2.paginator = this.paginator2 : null;
          !this.dataSource2.sort ? this.dataSource2.sort = this.sort2 : null;
          break;

        case 2:

          !this.dataSource4.paginator ? this.dataSource4.paginator = this.paginator4 : null;
          !this.dataSource4.sort ? this.dataSource4.sort = this.sort4 : null;
          break;

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
    this.dataSource4 = new MatTableDataSource<any>(this.serviciosMasRealizados);
    this.dataSourceTodo = new MatTableDataSource<any>(this.resumen);

    this.dataSource2.sort = this.sort2;
    this.dataSource3.sort = this.sort3;
    this.dataSource4.sort = this.sort4;

    this.dataSource2.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'fecha': {
          console.log(item.fecha);

          return (`${item.fecha.substring(6, 10)}-${item.fecha.substring(3, 5)}-${item.fecha.substring(0, 2)}`);
        }
        default: {
          return item[property];
        }
      }
    };

    this.dataSource3.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'fecha': {
          console.log(item.fecha);

          return (`${item.fecha.substring(6, 10)}-${item.fecha.substring(3, 5)}-${item.fecha.substring(0, 2)}`);
        }
        default: {
          return item[property];
        }
      }
    };


    this.dataSource2.paginator = this.paginator2;
    this.dataSource3.paginator = this.paginator3;
    this.dataSource4.paginator = this.paginator4;

  }


  dineroGanado(objeto) {

    if (this.trabajadoraSeleccionada != 'TODAS LAS TRABAJADORAS') {
      for (var i in objeto) {




        for (var z in objeto[i].ordenes) {



          if (this.trabajadoraSeleccionada == objeto[i].ordenes[z].trabajadora.nombre) {


            if (!this.sueldo2.find(o => o.fecha === objeto[i].fecha.substring(0, 10))) {
              this.sueldo2.push({ fecha: objeto[i].fecha.substring(0, 10), valor: 0, cantidadServicios: 0, valorDia: 0 });

              //console.log( objeto[i].fecha.substring(6, 10) + '-'+ objeto[i].fecha.substring(3, 5) + '-' + objeto[i].fecha.substring(0, 2));





            }
            this.serviciosRealizadosTrabajadora.push({
              servicio: objeto[i].ordenes[z].servicio.descripcion,

              precio: objeto[i].ordenes[z].servicio.valor,
              cliente: objeto[i].cliente.nombre,
              fecha: objeto[i].fecha.substring(0, 10)
            });
            if (!this.serviciosMasRealizados.find(o => o.servicio === objeto[i].ordenes[z].servicio.descripcion)) {
              this.serviciosMasRealizados.push({ servicio: objeto[i].ordenes[z].servicio.descripcion, valorTotal: 0, cantidadServicios: 0 });
            }


            this.serviciosRealizados.push(objeto[i].ordenes[z]);

            this.sueldo[0].total += objeto[i].ordenes[z].servicio.valor;

            this.sueldo[0].cantidadServicios += + 1;


            for (var p in this.serviciosMasRealizados) {

              if (this.serviciosMasRealizados[p].servicio == objeto[i].ordenes[z].servicio.descripcion) {
                this.serviciosMasRealizados[p].cantidadServicios += +1;
                this.serviciosMasRealizados[p].valorTotal += objeto[i].ordenes[z].servicio.valor *
                  (objeto[i].ordenes[z].trabajadora.categoriaTrabajadora.find(o => o.categoria === objeto[i].ordenes[z].servicio.categoria).porcentaje) * 0.01;

              }
            }



            for (var k in this.sueldo2) {

              if (this.sueldo2[k].fecha == objeto[i].fecha.substring(0, 10)) {
                this.sueldo2[k].cantidadServicios += +1;
                this.sueldo2[k].valor += objeto[i].ordenes[z].servicio.valor *
                  (objeto[i].ordenes[z].trabajadora.categoriaTrabajadora.find(o => o.categoria === objeto[i].ordenes[z].servicio.categoria).porcentaje) * 0.01;

                if (this.sueldo2[k].valor <= objeto[i].ordenes[z].trabajadora.sueldoBase) {

                  this.sueldo2[k].valorDia = objeto[i].ordenes[z].trabajadora.sueldoBase;


                } else {

                  this.sueldo2[k].valorDia = this.sueldo2[k].valor;
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

      this.resumen[0].total += boleta[i].montoPrincipal + boleta[i].montoGiftCard +
        boleta[i].montoDescuento + boleta[i].montoEfectivo - boleta[i].montoVuelto;

      switch (boleta[i].formaDePagoPrincipal) {
        case 'Efectivo':


          this.resumen[0].totalEfectivo += boleta[i].montoPrincipal - boleta[i].montoVuelto;
          this.resumen[0].totalGiftCard += boleta[i].montoGiftCard;
          this.resumen[0].totalDescuento += boleta[i].montoDescuento;
          break;
        case 'Tarjeta de Crédito':

          this.resumen[0].totalCredito += boleta[i].montoPrincipal;
          this.resumen[0].totalEfectivo += boleta[i].montoEfectivo - boleta[i].montoVuelto;
          this.resumen[0].totalGiftCard += boleta[i].montoGiftCard;
          this.resumen[0].totalDescuento += boleta[i].montoDescuento;
          break;
        case 'Tarjeta de Débito':

          this.resumen[0].totalDebito += boleta[i].montoPrincipal;
          this.resumen[0].totalEfectivo += boleta[i].montoEfectivo - boleta[i].montoVuelto;
          this.resumen[0].totalGiftCard += boleta[i].montoGiftCard;
          this.resumen[0].totalDescuento += boleta[i].montoDescuento;
          break;
        case 'Transferencia':

          this.resumen[0].totalTransferencia += boleta[i].montoPrincipal;
          this.resumen[0].totalGiftCard += boleta[i].montoGiftCard;
          this.resumen[0].totalDescuento += boleta[i].montoDescuento;
          break;
        case 'Gift Card':

          this.resumen[0].totalGiftCard += boleta[i].montoPrincipal;
          this.resumen[0].totalDescuento += boleta[i].montoDescuento;
        default:

          break;

      }
      for (var z in boleta[i].ordenes) {
        this.resumen[0].serviciosRealizados += + 1;
        this.resumen[0].ganancia += boleta[i].ordenes[z].servicio.valor *
          (((boleta[i].ordenes[z].trabajadora.categoriaTrabajadora.find(o => o.categoria === boleta[i].ordenes[z].servicio.categoria).porcentaje) - 100) * (-0.01));

        if (!this.serviciosMasRealizados.find(o => o.servicio === boleta[i].ordenes[z].servicio.descripcion)) {
          this.serviciosMasRealizados.push({ servicio: boleta[i].ordenes[z].servicio.descripcion, valorTotal: 0, cantidadServicios: 0 });
        }

        for (var p in this.serviciosMasRealizados) {

          if (this.serviciosMasRealizados[p].servicio == boleta[i].ordenes[z].servicio.descripcion) {
            this.serviciosMasRealizados[p].cantidadServicios += +1;
            this.serviciosMasRealizados[p].valorTotal += boleta[i].ordenes[z].servicio.valor *
              (((boleta[i].ordenes[z].trabajadora.categoriaTrabajadora.find(o => o.categoria === boleta[i].ordenes[z].servicio.categoria).porcentaje) - 100) * (-0.01));

            //   boleta[i].ordenes[z].servicio.valor *  (boleta[i].ordenes[z].trabajadora.categoriaTrabajadora.find(o => o.categoria === boleta[i].ordenes[z].servicio.categoria).porcentaje) * 0.01;

          }

        }
        this.serviciosRealizadosTrabajadora.push({
          servicio: boleta[i].ordenes[z].servicio.descripcion,
          trabajadora: boleta[i].ordenes[z].trabajadora.nombre,
          precio: boleta[i].ordenes[z].servicio.valor,
          cliente: boleta[i].cliente.nombre,
          fecha: boleta[i].fecha.substring(0, 10)
        });


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
    this.serviciosMasRealizados = [];
    this.tablaTotalesCheckbox = false;
    this.tablaSueldoCheckbox = false;
    this.sueldo = [
      { total: 0, ganancia: 0, cantidadServicios: 0 }
    ];
    this.resumen = [{
      serviciosRealizados: 0,
      total: 0,
      ganancia: 0,
      clientesAtendidos: 0,
      totalTransbank: 0,
      totalDebito: 0,
      totalCredito: 0,
      totalTransferencia: 0,
      totalEfectivo: 0,
      totalGiftCard: 0,
      totalDescuento: 0

    }];

    this.serviciosRealizadosTrabajadora = [];
    this.sueldo2 = [];
    this.serviciosRealizados = [];
    this.boletas = [];
  }

}
