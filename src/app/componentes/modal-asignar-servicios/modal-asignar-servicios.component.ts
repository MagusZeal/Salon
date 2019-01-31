import { Component, OnInit } from '@angular/core';
import { AsignarServiciosService } from './asignar-servicios.service';
import { TouchSequence } from 'selenium-webdriver';
import { ListaServiciosService } from 'src/app/lista-servicios/lista-servicios.service';


@Component({
  selector: 'app-modal-asignar-servicios',
  templateUrl: './modal-asignar-servicios.component.html',
  styleUrls: ['./modal-asignar-servicios.component.scss']
})
export class ModalAsignarServiciosComponent implements OnInit {
  trabajadoras: ITrabajadora[] = [];
  trabajadoraSeleccionada = [];
  servicios: IServicio[] = [];
  clienteFiltrado = '';
  clientes: ICliente[] = [];
  ordenes = [];
  nombresClientes: string;
  constructor(private service: AsignarServiciosService, private ListaServicio: ListaServiciosService) { }

  ngOnInit() {
    this.service.getAsignarServicios().subscribe(o => {

      this.trabajadoras = o.trabajadoras;
      this.servicios = o.servicios;
      this.nombresClientes = o.nombresClientes;
      this.clientes = o.clientes;
      if (this.servicios && this.servicios.length > 0) {
        document.getElementById('showModalButton').click();
      }

    });
  }

  async asignarServicios() {

    const boleta: IBoleta = {
      cliente: this.filtrarCliente(),
      total: this.ordenes.map(o => o.servicio.valor).reduce((a, b) => a + b),
      fecha: (new Date().toLocaleString()).toString(),
      ordenes: this.ordenes
    };

    await this.ListaServicio.agregarBoleta(boleta);

    document.getElementById('LinkCobros').click();

  }

  filtrarCliente(): ICliente {

    return this.clientes.find(o => o.nombre.includes(this.clienteFiltrado.trim()));
  }

  asignarServicioTrabajadora(servicio, i) {

    this.ordenes[i] = {
      'servicio': {
        descripcion: servicio.descripcion,
        categoria: servicio.categoria,
        valor: servicio.valor
      },
      'trabajadora': this.trabajadoraSeleccionada[i]
    };

  }
}
