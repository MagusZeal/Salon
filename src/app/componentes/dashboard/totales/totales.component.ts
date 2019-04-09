import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { TotalesService } from './totales.service';
import { VerBoletaComponent } from '../ver-boleta/ver-boleta.component';


@Component({
  selector: 'app-totales',
  templateUrl: './totales.component.html',
  styleUrls: ['./totales.component.scss']
})
export class TotalesComponent implements OnInit {
  jornadas: any[] = [];
  boletas: any[] = [];

  serviciosRealizadosTrabajadora: any[] = [];
  serviciosRealizados: any = [];
  serviciosMasRealizados: any[] = [];

  dataServiciosRealizados;
  dataMasRealizados;
  dataSourceTodo;
  dataBoletas;

  columnsTodo: string[] = ['total', 'ganancia', 'serviciosRealizados', 'totalEfectivo', 'totalCredito'];
  columnsServiciosRealizados: string[] = ['servicio', 'trabajadora', 'precio', 'cliente', 'fecha'];
  columnsBoletas: string[] = ['fecha', 'cliente', 'montoCobrado'];
  columnsMasRealizados: string[] = ['servicio', 'cantidadServicios', 'valorTotal'];
  columnsTodo2: string[] = ['totalDebito', 'totalTransferencia', 'totalGiftCard', 'totalDescuento'];

  @ViewChild('paginatorServiciosRealizados') paginatorServiciosRealizados: MatPaginator;
  @ViewChild('paginatorMasRealizados') paginatorMasRealizados: MatPaginator;
  @ViewChild('paginatorBoletas') paginatorBoletas: MatPaginator;

  @ViewChild('sortServiciosRealizados') sortServiciosRealizados: MatSort;
  @ViewChild('sortMasRealizados') sortMasRealizados: MatSort;
  @ViewChild('sortBoletas') sortBoletas: MatSort;

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

  constructor(private service: TotalesService, public dialog: MatDialog) { }

  _setDataSource2(indexNumber) {
    setTimeout(() => {
      switch (indexNumber) {
        case 1:

          !this.dataServiciosRealizados.paginator ? this.dataServiciosRealizados.paginator = this.paginatorServiciosRealizados : null;
          !this.dataServiciosRealizados.sort ? this.dataServiciosRealizados.sort = this.sortServiciosRealizados : null;
          break;

        case 2:

          !this.dataMasRealizados.paginator ? this.dataMasRealizados.paginator = this.paginatorMasRealizados : null;
          !this.dataMasRealizados.sort ? this.dataMasRealizados.sort = this.sortMasRealizados : null;
          break;
        case 3:

          !this.dataBoletas.paginator ? this.dataBoletas.paginator = this.paginatorBoletas : null;
          !this.dataBoletas.sort ? this.dataBoletas.sort = this.sortBoletas : null;
          break;
      }
    });
  }


  ngOnInit() {

    this.service.obtenerDatos().subscribe(jornadas => {
      this.limpiar();


      this.mapearObjetosArray(jornadas);
      this.montos(this.boletas);

      this.dataServiciosRealizados = new MatTableDataSource<any>(this.serviciosRealizadosTrabajadora);
      this.dataMasRealizados = new MatTableDataSource<any>(this.serviciosMasRealizados);
      this.dataSourceTodo = new MatTableDataSource<any>(this.resumen);
      this.dataBoletas = new MatTableDataSource<any>(this.boletas);

      this.sortMasRealizados.direction = "desc";
      this.sortMasRealizados.active = "cantidadServicios"

      this.dataServiciosRealizados.sort = this.sortServiciosRealizados;
      this.dataMasRealizados.sort = this.sortMasRealizados;
      this.dataBoletas.sort = this.sortBoletas;

      this.dataServiciosRealizados.paginator = this.paginatorServiciosRealizados;
      this.dataMasRealizados.paginator = this.paginatorMasRealizados;
      this.dataBoletas.paginator = this.paginatorBoletas;

      this.dataServiciosRealizados.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'fecha': {

            return (`${item.fecha.substring(6, 10)}-${item.fecha.substring(3, 5)}-${item.fecha.substring(0, 2)}`);
          }
          default: {
            return item[property];
          }
        }
      };

      this.dataBoletas.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'fecha': {

            return (`${item.fecha.substring(6, 10)}-${item.fecha.substring(3, 5)}-${item.fecha.substring(0, 2)}`);
          }
          default: {
            return item[property];
          }
        }
      };
    })
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
  modalVerBoletaDashboard(boleta) {

    this.dialog.open(VerBoletaComponent, {
      width: "600px",
      maxWidth: "600px",
      autoFocus: true,
      hasBackdrop: true,
      data: {
        boleta: boleta
      }
    });
  }

  limpiar() {
    this.serviciosMasRealizados = [];
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
    this.serviciosRealizados = [];
    this.boletas = [];
  }


}
