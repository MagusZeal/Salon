import { Component, OnInit } from '@angular/core';
import { ListaServiciosService } from '../lista-servicios/lista-servicios.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ModalAsignarServiciosComponent } from '../componentes/modal-asignar-servicios/modal-asignar-servicios.component';
import { ModalCambiarPrecioComponent } from '../componentes/modal-cambiar-precio/modal-cambiar-precio.component';
import { ModalAgregarClientesListaComponent } from '../componentes/lista-servicios/modal-agregar-clientes-lista/modal-agregar-clientes-lista.component';

@Component({
  selector: 'app-lista-servicios',
  templateUrl: './lista-servicios.component.html',
  styleUrls: ['./lista-servicios.component.scss']
})
export class ListaServiciosComponent implements OnInit {
  breakpoint: number;
  categorias: ICategoria[] = [];
  servicios: IServicio[] = [];
  serviciosSeleccionados: IServicio[] = [];
  precioTotal = 0;
  data: any[] = [];
  clientes: ICliente[] = [];
  clienteFiltrado: string;
  serviciosOriginales = [];
  serviciosNuevos: any[] = [];
  color;

  ordenes: IOrden[] = [];
  dias: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  meses: any[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  categoriaSeleccion = 'TODAS LAS CATEGORIAS';
  constructor(private ListaServicio: ListaServiciosService, public dialog: MatDialog) { }


  onOpenMenu(menu: any): void {
    console.log(menu);
  }

  async ngOnInit() {

    this.ListaServicio.obtenerCategorias().subscribe(o => this.categorias = o)
    this.ListaServicio.obtenerServicios().subscribe(o => {
      this.mapearServiciosArray(o);

    })

    if (window.innerWidth <= 500) {
      this.breakpoint = 1
    } else if (window.innerWidth >= 501 && window.innerWidth <= 1000) {
      this.breakpoint = 2;
    } else if (window.innerWidth >= 1001 && window.innerWidth <= 1400) {
      this.breakpoint = 3;
    }
    else
      this.breakpoint = 4;
  }
  mapearServiciosArray(objeto) {

    for (let key in objeto) {


      let boleta = objeto[key];
      boleta['idServicio'] = key;
      this.servicios.push(boleta);
    }
  }


  onResize(event) {

    if (event.target.innerWidth <= 500) {
      this.breakpoint = 1
    } else if (event.target.innerWidth >= 501 && event.target.innerWidth <= 1000) {
      this.breakpoint = 2;
    } else if (event.target.innerWidth >= 1001 && event.target.innerWidth <= 1400) {
      this.breakpoint = 3;
    }
    else
      this.breakpoint = 4;

  }
  seleccionarServicio(servicio) {


    let existe = this.serviciosSeleccionados.find(o => o.descripcion == servicio.descripcion);
    if (existe) {
      this.serviciosSeleccionados = this.serviciosSeleccionados.filter(o => o.descripcion != servicio.descripcion);


      for (var i = 0; i < this.serviciosOriginales.length; i++) {
        for (var z = 0; z < this.servicios.length; z++) {
          if (this.servicios[z].descripcion == this.serviciosOriginales[i].descripcion && this.serviciosOriginales[i].descripcion == servicio.descripcion) {
            this.servicios[z].valor = this.serviciosOriginales[i].valor;
          }
        }
      }
      this.serviciosOriginales = this.serviciosOriginales.filter(o => o.descripcion != servicio.descripcion);
      servicio['seleccionado'] = "#FAFAFA";


    } else {
      this.serviciosSeleccionados.push(servicio);
      this.serviciosOriginales.push(JSON.parse(JSON.stringify(servicio)));

      servicio['seleccionado'] = "#65DFDD";


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





  seleccionarCategoria(categoria) {
    if (categoria.value) {
      this.categoriaSeleccion = categoria.value.nombre;
    } else {
      this.categoriaSeleccion = 'TODAS LAS CATEGORIAS';
    }
  }


  abrirModalPrecioVariable() {



    const dialogRef = this.dialog.open(ModalCambiarPrecioComponent, {
      width: "600px",
      maxWidth: "600px",
      hasBackdrop: true,
      data: { servicios: this.serviciosSeleccionados, serviciosOriginales: this.serviciosOriginales }
    }
    );

    dialogRef.afterClosed().subscribe(o => {
      console.log('The dialog was closed');
      console.log(o);
      if (o) {
        this.serviciosSeleccionados = o;
        this.calcularPrecio();

        for (var i = 0; i < this.serviciosSeleccionados.length; i++) {
          for (var z = 0; z < this.servicios.length; z++) {
            if (this.servicios[z].descripcion == this.serviciosSeleccionados[i].descripcion) {
              this.servicios[z].valor = this.serviciosSeleccionados[i].valor;
            }
          }
        }
      }

    });



  }


  abrirModalAgregarCliente() {

    this.dialog.open(ModalAgregarClientesListaComponent, {
      width: "600px",
      maxWidth: "600px",
      autoFocus: true,
      hasBackdrop: true,
    });

  }

  abrirModalServicios() {

    if (this.serviciosSeleccionados.length > 0) {

      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = "600px";
      dialogConfig.maxWidth = "600px";
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        servicios: this.serviciosSeleccionados
      };
      console.log(dialogConfig);

      this.dialog.open(ModalAsignarServiciosComponent, dialogConfig);

    }
  }
}