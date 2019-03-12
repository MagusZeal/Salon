import { Component, OnInit, Inject } from '@angular/core';
import { ListaServiciosService } from '../lista-servicios/lista-servicios.service';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ModalAsignarServiciosComponent } from '../componentes/modal-asignar-servicios/modal-asignar-servicios.component';
import { ModalCambiarPrecioComponent } from '../componentes/modal-cambiar-precio/modal-cambiar-precio.component';

@Component({
  selector: 'app-lista-servicios',
  templateUrl: './lista-servicios.component.html',
  styleUrls: ['./lista-servicios.component.scss']
})
export class ListaServiciosComponent implements OnInit {

  categorias: ICategoria[] = [];
  servicios: IServicio[] = [];
  serviciosSeleccionados: IServicio[] = [];
  precioTotal = 0;

  clientes: ICliente[] = [];
  clienteFiltrado: string;
  serviciosOriginales = [];
  serviciosNuevos: any[] = [];

  ordenes: IOrden[] = [];
  dias: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  meses: any[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  categoriaSeleccion = 'TODAS LAS CATEGORIAS';
  constructor(private ListaServicio: ListaServiciosService, public dialog: MatDialog) { }

  async ngOnInit() {

    this.ListaServicio.obtenerCategorias().subscribe(o => this.categorias = o)
    this.ListaServicio.obtenerServicios().subscribe(o => {
      this.servicios = Object.values(o);
      this.cargarServicios();
    })



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
      servicio['seleccionado'] = "white";
      servicio['seleccionado2'] = "black";
    } else {
      this.serviciosSeleccionados.push(servicio);
      this.serviciosOriginales.push(JSON.parse(JSON.stringify(servicio)));

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
      data: { servicios: this.serviciosSeleccionados, serviciosOriginales:this.serviciosOriginales }
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


  abrirModalServicios() {

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