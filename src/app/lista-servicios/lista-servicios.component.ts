import { Component, OnInit } from '@angular/core';
import { ListaServiciosService } from '../lista-servicios/lista-servicios.service';

@Component({
  selector: 'app-lista-servicios',
  templateUrl: './lista-servicios.component.html',
  styleUrls: ['./lista-servicios.component.scss']
})
export class ListaServiciosComponent implements OnInit {

  categorias: any[] = [];
  servicios: any[] = [];
  serviciosSeleccionados: any[] = [];
  precioTotal: Number = 0;
  trabajadoras: any[] = [];
  clientes: any[] = [];
  clienteFiltrado: string;
  nombresClientes: string[]=[];
  constructor(private ListaServicio: ListaServiciosService) { }

  async ngOnInit() {
    this.categorias = await this.ListaServicio.obtenerCategorias();
    await this.cargarServicios();
    this.trabajadoras = await Object.values(await this.ListaServicio.obtenerTrabajadoras());
    this.clientes = await Object.values(await this.ListaServicio.obtenerClientes());
    this.nombresClientes=this.clientes.map(o=> o.nombre);
    let algo = 1;

  }

  seleccionarServicio(servicio) {
    let existe = this.serviciosSeleccionados.find(o => o.id == servicio.id);
    if (existe) {
      this.serviciosSeleccionados = this.serviciosSeleccionados.filter(o => o.id != servicio.id);
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
  async cargarServicios() {

    this.servicios = Object.values(await this.ListaServicio.obtenerServicios());
    for (let item of this.servicios) {

      item['seleccionado'] = "white";
      item['seleccionado2'] = "black";
    }
  }

  async asignarServicios(){
    
    let servicios:any[]=[];

    for(let servicio of this.serviciosSeleccionados){

     
          servicios.push({
            ServicioCategoria:servicio.categoria,
            ServicioDescripcion:servicio.descripcion,
            ServicioDuracion:servicio.duracion,
            ServicioId:servicio.id,
            TrabajadoraId:servicio.trabajadoraId,
            TrabajadoraNombre:this.trabajadoras.filter(o=>o.id == servicio.trabajadoraId)[0].name,
            ValorServicio:servicio.valor
            
              });
    }
   
    var boleta = {
      nombreCliente:this.clienteFiltrado,
      total:this.precioTotal,
      fecha:new Date().toLocaleString(),
      pagado:false,
      ordenes:servicios
    }

    await this.ListaServicio.agregarBoleta(boleta);
    
    document.getElementById("LinkCobros").click();
    
  }

  filtrarCliente(){


  }
}
