import { Component, OnInit } from '@angular/core';
import { ListaServiciosService } from '../lista-servicios/lista-servicios.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-lista-servicios',
  templateUrl: './lista-servicios.component.html',
  styleUrls: ['./lista-servicios.component.scss']
})
export class ListaServiciosComponent implements OnInit {

  categorias: ICategoria[] = [];
  servicios: IServicio[] = [];
  serviciosSeleccionados: IServicio[] = [];
  precioTotal: Number = 0;
  trabajadoras: ITrabajadora[] = [];
  clientes: ICliente[] = [];
  clienteFiltrado: string;
  nombresClientes: string[] = [];
  serviciosNuevos: any[] = [];
  dias: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  meses: any[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  constructor(private ListaServicio: ListaServiciosService) { }

  async ngOnInit() {
    this.ListaServicio.obtenerCategorias().subscribe(o=>this.categorias = o)
    this.ListaServicio.obtenerServicios().subscribe(o=>{
      this.servicios = Object.values(o);
      this.cargarServicios();
    })
    
    this.ListaServicio.obtenerTrabajadoras().subscribe(o=>this.trabajadoras = Object.values(o));
    this.ListaServicio.obtenerClientes().subscribe(o=>{
      this.clientes =Object.values(o);
      this.nombresClientes = this.clientes.map(o => o.nombre);
    });


    console.log(this.trabajadoras[0].categoriaTrabajadora[0].categoria);
 

  }

  seleccionarServicio(servicio) {
    let existe = this.serviciosSeleccionados.find(o => o.descripcion == servicio.descripcion);
    if (existe) {
      this.serviciosSeleccionados = this.serviciosSeleccionados.filter(o => o.descripcion != servicio.descripcion);
      servicio['seleccionado'] = "white";
      servicio['seleccionado2'] = "black";
    } else {
      this.serviciosSeleccionados.push(servicio);
      servicio['seleccionado'] = "#5f97ef";
      servicio['seleccionado2'] = 'white';
    }

    this.calcularPrecio();

  }

  calcularPrecio() {
    if (this.serviciosSeleccionados.length == 0) {
      this.precioTotal = 0;
    } else {


      this.precioTotal = this.serviciosSeleccionados.map(o => o.valor).reduce((a, b) => a + b);


    }


  }
   cargarServicios() {

    
    for (let item of this.servicios) {

      item['seleccionado'] = "white";
      item['seleccionado2'] = "black";
    }
  }

  async asignarServicios() {


    let servicios: any[] = [];

    for (let servicio of this.serviciosSeleccionados) {


      servicios.push({
        ServicioCategoria: servicio.categoria,
        ServicioDescripcion: servicio.descripcion,


        TrabajadoraNombre: this.trabajadoras.filter(o => o.nombre == servicio.descripcion)[0].nombre,
        ValorServicio: servicio.valor

      });
    }

    var boleta = {
      nombreCliente: this.clienteFiltrado,
      total: this.precioTotal,
      fecha: new Date().toLocaleString(),
      pagado: false,
      ordenes: servicios
    }

    await this.ListaServicio.agregarBoleta(boleta);

    document.getElementById("LinkCobros").click();

  }


  async agregarCliente(f: NgForm) {

    for (var i in this.clientes) {

      if (this.clientes[i].nombre.toLowerCase() == f.value.nombre.toLowerCase()) {
        console.log("Nombre ya existe, por favor use otro");

      }
    }
  }

  filtrarCliente() {

  }
}
