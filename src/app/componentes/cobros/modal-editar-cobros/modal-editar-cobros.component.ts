import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { CobrosPendientesComponent } from 'src/app/cobros-pendientes/cobros-pendientes.component';
import { ModalEditarCobrosService } from './modal-editar-cobros.service';
import { ModalCambiarPrecioComponent } from '../../modal-cambiar-precio/modal-cambiar-precio.component';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-editar-cobros',
  templateUrl: './modal-editar-cobros.component.html',
  styleUrls: ['./modal-editar-cobros.component.scss']
})
export class ModalEditarCobrosComponent implements OnInit {
  boletaEditar;
  breakpoint;
  trabajadoraSeleccionada = [];
  categorias: any[] = [];
  servicios: any[] = [];
  serviciosSeleccionados: IServicio[] = [];
  precioTotal = 0;
  clientes: ICliente[] = [];
  trabajadoras: any[] = [];
  clienteFiltrado: string;
  serviciosOriginales = [];
  serviciosNuevos: any[] = [];
  categoriaSeleccion = 'TODAS LAS CATEGORIAS';
  dpReserva = new FormControl('', [Validators.required]);
  horaReserva = new FormControl('',[Validators.required]);
  minutoReserva = new FormControl('',[Validators.required]);
  horas = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];
  minutos = ['00', '15', '30', '45'];
  reservaHora = false;
  constructor(public dialogRef: MatDialogRef<CobrosPendientesComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ModalEditarCobrosService, public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.boletaEditar = data.boletaEditar;
    if(this.boletaEditar.horaReservada == true){
     this.reservaHora = true;
      this.dpReserva = new FormControl(new Date(this.boletaEditar.fecha.substring(6,10),  this.boletaEditar.fecha.substring(3,5) -1, this.boletaEditar.fecha.substring(0,2)), [Validators.required]);
      this.horaReserva = new FormControl(this.boletaEditar.hora,[Validators.required]);
      this.minutoReserva = new FormControl(this.boletaEditar.minuto,[Validators.required]);

    }
  }

  async ngOnInit() {

    if (window.innerWidth <= 801) {
      this.breakpoint = 1
    }else{
this.breakpoint = 2;
    }
    

    this.service.obtenerTrabajadoras().subscribe(o => {
      this.mapearTrabajadorasArray(o);

    });
    this.mapearClientesArray(await this.service.obtenerClientes());


    this.service.obtenerCategorias().subscribe(o => this.categorias = o)
    this.mapearServiciosArray(await this.service.obtenerServicios());



  }

  mapearTrabajadorasArray(objeto) {

    for (let key in objeto) {


      let boleta = objeto[key];
      boleta['idTrabajadora'] = key;
      this.trabajadoras.push(boleta);
    }
  }

  mapearClientesArray(objeto) {

    for (let key in objeto) {


      let boleta = objeto[key];
      boleta['idCliente'] = key;
      this.clientes.push(boleta);
    }
  }

  lechedetoro() {

    console.log(this.boletaEditar);

  }

  mapearServiciosArray(objeto) {

    for (let key in objeto) {


      let boleta = objeto[key];
      boleta['idServicio'] = key;
      for (var i in this.boletaEditar.ordenes) {
       
        if (this.boletaEditar.ordenes[i].servicio.descripcion == objeto[key].descripcion) {
          objeto[key].seleccionado = "#65DFDD";
        
          
        }
      }

      this.servicios.push(boleta);
      this.calcularPrecio();
    }

    for (var i in this.boletaEditar.ordenes) {
      for (let key in objeto) {
        if (this.boletaEditar.ordenes[i].servicio.descripcion == objeto[key].descripcion) {
          this.serviciosOriginales.push(JSON.parse(JSON.stringify(objeto[key])));
        }
      }
    }
  }

  onResize(event) {

    if (event.target.innerWidth <= 801) {
      this.breakpoint = 1
    }
    else
      this.breakpoint = 2;

  }


  async asignarServicios(botonCuliao) {


    if( !this.boletaEditar.ordenes.some(o=>o.trabajadora == undefined) && this.boletaEditar.ordenes.findIndex(o=> o == undefined) == -1){
   
    console.log(this.reservaHora);

    if (this.reservaHora == true) {

if(this.dpReserva.valid && this.horaReserva.valid && this.minutoReserva.valid){
      const boleta = {
        cliente: this.boletaEditar.cliente,
        total: this.boletaEditar.ordenes.map(o => o.servicio.valor).reduce((a, b) => a + b),
        fecha: (this.dpReserva.value.toLocaleString('es-CL').substring(0, 11) + this.horaReserva.value + ':' + this.minutoReserva.value + ':' + '01'),
        ordenes: this.boletaEditar.ordenes,
        horaReservada: this.reservaHora,
        hora: this.horaReserva.value,
        minuto: this.minutoReserva.value

      };
      console.log("reserva");
      
      console.log(boleta);
      
      await this.service.editarBoleta(boleta,this.boletaEditar.idBoleta );
      this.dialogRef.close(true);
    
    }else{
      this.openSnackBar("Error! Debe asignar Fecha Reserva, hora y minutos validos ✋🏻", "Ok");
    }

    } else {
      const boleta = {
        cliente: this.boletaEditar.cliente,
        total: this.boletaEditar.ordenes.map(o => o.servicio.valor).reduce((a, b) => a + b),
        fecha: (new Date().toLocaleString('es-CL')).toString(),
        ordenes: this.boletaEditar.ordenes,
        horaReservada: false,
      };
      console.log("no reserva");
      
      console.log(boleta);
      
      await this.service.editarBoleta(boleta, this.boletaEditar.idBoleta);
      this.dialogRef.close(true);
   
    }
  }else{
    this.openSnackBar("Error! Debe asignar trabajadora/s y cliente primero ✋🏻", "Ok");
  }



      // botonCuliao.disabled = false;
  }


  seleccionarServicio(servicio) {
    


    let existe = this.boletaEditar.ordenes.find(o => o.servicio.descripcion == servicio.descripcion);
    if (existe) {
      this.boletaEditar.ordenes = this.boletaEditar.ordenes.filter(o => o.servicio.descripcion != servicio.descripcion);


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
      this.boletaEditar.ordenes.push({servicio:servicio, trabajadora:undefined});
      
      this.serviciosOriginales.push(JSON.parse(JSON.stringify(servicio)));
      servicio['seleccionado'] = "#65DFDD";
      

    }

    this.calcularPrecio();



  }



  calcularPrecio() {

    if (this.boletaEditar.ordenes.length == 0) {
      this.precioTotal = 0;
    } else {
      this.precioTotal = this.boletaEditar.ordenes.map(o => o.servicio.valor).reduce((a, b) => a + b);
    }
  }

  abrirModalPrecioVariable() {



    const dialogRef = this.dialog.open(ModalCambiarPrecioComponent, {
      width: "600px",
      maxWidth: "600px",
      hasBackdrop: true,
      data: { servicios: this.boletaEditar.ordenes.map(o=>o.servicio), serviciosOriginales: this.serviciosOriginales }
    }
    );

    dialogRef.afterClosed().subscribe(o => {
     
      if (o) {
     
        for (var i = 0; i < this.boletaEditar.ordenes.length; i++) {
          this.boletaEditar.ordenes[i].servicio =o[i];
          for (var z = 0; z < this.servicios.length; z++) {
            if (this.servicios[z].descripcion == this.boletaEditar.ordenes[i].servicio.descripcion) {
              this.servicios[z].valor = this.boletaEditar.ordenes[i].servicio.valor;
            }
          }
        }
        this.calcularPrecio();
      }

    });



  }
  asignarServicioTrabajadora(servicio, i) {

    this.boletaEditar.ordenes[i] = {
      'servicio': {
        descripcion: servicio.descripcion,
        categoria: servicio.categoria,
        valor: servicio.valor,
        idServicio:servicio.idServicio
      },
      'trabajadora': this.boletaEditar.ordenes[i].trabajadora
    };


  }
  compareObjects(o1: any, o2: any): boolean {
  if(o1 && o2){
    return o1.nombre === o2.nombre;
  }
  }

  seleccionarCategoria(categoria) {
    if (categoria.value) {
      this.categoriaSeleccion = categoria.value.nombre;
    } else {
      this.categoriaSeleccion = 'TODAS LAS CATEGORIAS';
    }
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }


}
