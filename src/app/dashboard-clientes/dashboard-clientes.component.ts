import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardClientesService } from './dashboard-clientes.service';
import { MatSort, MatTableDataSource } from '@angular/material';
import { TableSortingExampleService } from '../componentes/table-sorting-example/table-sorting-example.service';


@Component({
  selector: 'app-dashboard-clientes',
  templateUrl: './dashboard-clientes.component.html',
  styleUrls: ['./dashboard-clientes.component.scss']
})

export class DashboardClientesComponent implements OnInit {

  clientes: ICliente[] = [];
  clienteFiltrado = '';
  clientesFiltrados: IClienteFiltrado[] = [];
  nombresClientes = [];
  inicio: string;
  termino: string;
  fechaInicio: string;
  fechaTermino: string;
  jornadas: any[] = [];
  boletas: any[] = [];
  clientesFechas: any[] = [];
  nombres: any[] = [];

  // displayedColumns: string[] = ['nombre', 'dineroInvertido', 'numeroServicios'];




  total = {
    totalClientes: 0,
    totalInvertido: 0,
    totalServicios: 0,
  }

  constructor(private DashboardClientes: DashboardClientesService, private servicioSort: TableSortingExampleService) { }


  async ngOnInit() {

    this.DashboardClientes.obtenerClientes().subscribe(o => {
      this.clientes = Object.values(o);
      this.nombresClientes = this.clientes.map(o => o.nombre);
    });

  }


  async buscarTodos() {
    var a;

    this.fechaInicio = this.inicio['year'].toString() +
      this.lena((this.inicio['month'].toString())) +
      this.lena((this.inicio['day'].toString()));
    this.fechaTermino = this.termino['year'].toString() +
      this.lena((this.termino['month'].toString())) +
      this.lena((this.termino['day'].toString()));

    console.log(this.fechaInicio, "inicio");
    console.log(this.fechaTermino, "termino");

    this.jornadas = await Object.values(await this.DashboardClientes.obtenerJornadas(this.fechaInicio, this.fechaTermino));
    this.mapearObjetosArray(this.jornadas);

    for (var i in this.boletas) {

      if (this.clientesFiltrados.find(o => o.nombre === this.boletas[i].cliente.nombre)) {

        a = this.clientesFiltrados.findIndex(o => o.nombre === this.boletas[i].cliente.nombre)

        this.clientesFiltrados[a].dineroInvertido += this.boletas[i].montoCobrado;
        this.clientesFiltrados[a].numeroServicios += this.boletas[i].ordenes.length;

      } else {
        this.clientesFiltrados.push({ nombre: this.boletas[i].cliente.nombre, dineroInvertido: this.boletas[i].montoCobrado, numeroServicios: this.boletas[i].ordenes.length });

      }

      this.servicioSort.cargarDatos({
        clientesFiltrados: this.clientesFiltrados,
        clientes: this.clientes,
        boletas: this.boletas
      });

    }

    this.total.totalClientes = this.clientesFiltrados.length;
    this.total.totalInvertido = this.clientesFiltrados.map(o => o.dineroInvertido).reduce((a, b) => a + b);
    this.total.totalServicios = this.clientesFiltrados.map(o => o.numeroServicios).reduce((a, b) => a + b)


  }





  mapearObjetosArray(objeto) {

    for (var i in objeto) {
      for (var z in objeto[i]) {
        let boleta = objeto[i][z];
        this.boletas.push(boleta);
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





