import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { EspecificoTrabajadoraService } from './especifico-trabajadora.service';

@Component({
  selector: 'app-especifico-trabajadora',
  templateUrl: './especifico-trabajadora.component.html',
  styleUrls: ['./especifico-trabajadora.component.scss']
})
export class EspecificoTrabajadoraComponent implements OnInit {
  trabajadoraSeleccionada;
  serviciosRealizadosTrabajadora: any[] = [];
  sueldo2: any[] = [];
  serviciosRealizados: any = [];
  serviciosMasRealizados: any[] = [];
  boletas: any[] = [];

  dataSueldo;
  dataServiciosRealizados;
  dataDiasTrabajados;
  dataServiciosMasRealizados;

  columnsSueldo: string[] = ['total', 'ganancia', 'cantidadServicios'];
  columnsServiciosRealizados: string[] = ['servicio', 'precio', 'cliente', 'fecha'];
  columnsDiasTrabajados: string[] = ['fecha', 'valorDia', 'valor', 'cantidadServicios'];
  columnsServiciosMasRealizados: string[] = ['servicio', 'cantidadServicios', 'valorTotal'];

  @ViewChild('paginatorServiciosRealizados') paginatorServiciosRealizados: MatPaginator;
  @ViewChild('paginatorDiasTrabajados') paginatorDiasTrabajados: MatPaginator;
  @ViewChild('paginatorServiciosMasRealizados') paginatorServiciosMasRealizados: MatPaginator;

  @ViewChild('sortServiciosRealizados') sortServiciosRealizados: MatSort;
  @ViewChild('sortDiasTrabajados') sortDiasTrabajados: MatSort;
  @ViewChild('sortServiciosMasRealizados') sortServiciosMasRealizados: MatSort;


  sueldo: ISueldo[] = [
    { total: 0, ganancia: 0, cantidadServicios: 0 }
  ];

  constructor(private service: EspecificoTrabajadoraService, public dialog: MatDialog) { }

  ngOnInit() {
    this.service.obtenerDatos().subscribe(o => {
      this.trabajadoraSeleccionada = o.trabajadora;
      this.limpiar();
      this.mapearObjetosArray(o.jornadas);
      this.dineroGanado(this.boletas);

      for (var k in this.sueldo2) {
        this.sueldo[0].ganancia += this.sueldo2[k].valorDia;
      }

      this.dataSueldo = new MatTableDataSource<any>(this.sueldo);
      this.dataServiciosRealizados = new MatTableDataSource<any>(this.serviciosRealizadosTrabajadora);
      this.dataDiasTrabajados = new MatTableDataSource<any>(this.sueldo2);
      this.dataServiciosMasRealizados = new MatTableDataSource<any>(this.serviciosMasRealizados);

      this.sortServiciosMasRealizados.direction="desc";
      this.sortServiciosMasRealizados.active="cantidadServicios";

      this.dataServiciosRealizados.sort = this.sortServiciosRealizados;
      this.dataDiasTrabajados.sort = this.sortDiasTrabajados;
      this.dataServiciosMasRealizados.sort = this.sortServiciosMasRealizados;


      this.dataServiciosRealizados.paginator = this.paginatorServiciosRealizados;
      this.dataDiasTrabajados.paginator = this.paginatorDiasTrabajados;
      this.dataServiciosMasRealizados.paginator = this.paginatorServiciosMasRealizados;

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

      this.dataDiasTrabajados.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'fecha': {

            return (`${item.fecha.substring(6, 10)}-${item.fecha.substring(3, 5)}-${item.fecha.substring(0, 2)}`);
          }
          default: {
            return item[property];
          }
        }
      };

    });
  }

  dineroGanado(objeto) {
    console.log(objeto);
    console.log(this.trabajadoraSeleccionada);



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
          !this.dataServiciosRealizados.paginator ? this.dataServiciosRealizados.paginator = this.paginatorServiciosRealizados : null;
          !this.dataServiciosRealizados.sort ? this.dataServiciosRealizados.sort = this.sortServiciosRealizados : null;

          break;
        case 2:
          !this.dataDiasTrabajados.paginator ? this.dataDiasTrabajados.paginator = this.paginatorDiasTrabajados : null;
          !this.dataDiasTrabajados.sort ? this.dataDiasTrabajados.sort = this.sortDiasTrabajados : null;

          break;
        case 3:
          !this.dataServiciosMasRealizados.paginator ? this.dataServiciosMasRealizados.paginator = this.paginatorServiciosMasRealizados : null;
          !this.dataServiciosMasRealizados.sort ? this.dataServiciosMasRealizados.sort = this.sortServiciosMasRealizados : null;
          break;
      }
    });
  }
  limpiar() {
    this.serviciosMasRealizados = [];

    this.sueldo = [
      { total: 0, ganancia: 0, cantidadServicios: 0 }
    ];

    this.serviciosRealizadosTrabajadora = [];
    this.sueldo2 = [];
    this.serviciosRealizados = [];
    this.boletas = [];
  }

}