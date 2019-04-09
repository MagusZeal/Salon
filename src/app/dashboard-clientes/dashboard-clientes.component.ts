import { Component, OnInit } from '@angular/core';
import { DashboardClientesService } from './dashboard-clientes.service';
import { FormControl } from '@angular/forms';
import { TotalesClientesService } from '../componentes/dashboard-clientes/totales-clientes/totales-clientes.service';

@Component({
  selector: 'app-dashboard-clientes',
  templateUrl: './dashboard-clientes.component.html',
  styleUrls: ['./dashboard-clientes.component.scss']
})

export class DashboardClientesComponent implements OnInit {
  dpInicio = new FormControl(new Date());
  dpTermino = new FormControl(new Date());
  clientes: ICliente[] = [];

  fechaInicio: string;
  fechaTermino: string;

  breakpoint;
  dataSource;
  flag = false;

  total = {
    totalClientes: 0,
    totalInvertido: 0,
    totalServicios: 0,
  }

  constructor(private DashboardClientes: DashboardClientesService, private service: TotalesClientesService) { }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 2;
  }


  async ngOnInit() {

    this.clientes = [];
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;

    this.mapearClientesArray(await this.DashboardClientes.obtenerClientes());

  }

  mapearClientesArray(objeto) {

    for (let key in objeto) {

      let cliente = objeto[key];
      cliente['idCliente'] = key;
      this.clientes.push(cliente);
    }
  }

  async buscar() {

    this.flag = true;
    this.fechaInicio = this.dpInicio.value.toLocaleString('es-CL').substring(6, 10) +
      this.dpInicio.value.toLocaleString('es-CL').substring(3, 5) +
      this.dpInicio.value.toLocaleString('es-CL').substring(0, 2);
    this.fechaTermino = this.dpTermino.value.toLocaleString('es-CL').substring(6, 10) +
      this.dpTermino.value.toLocaleString('es-CL').substring(3, 5) +
      this.dpTermino.value.toLocaleString('es-CL').substring(0, 2);

    this.service.obtenerJornadas(this.fechaInicio, this.fechaTermino, this.clientes);

  }
}





