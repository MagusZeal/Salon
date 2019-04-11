import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TotalesClientesService } from './totales-clientes.service';
import { ModalVerClientesServiciosComponent } from '../modal-ver-clientes-servicios/modal-ver-clientes-servicios.component';
import { ModalVerClienteComponent } from '../modal-ver-cliente/modal-ver-cliente.component';

@Component({
  selector: 'app-totales-clientes',
  templateUrl: './totales-clientes.component.html',
  styleUrls: ['./totales-clientes.component.scss']
})
export class TotalesClientesComponent implements OnInit {
  boletas: any[] = [];
  clientes: ICliente[] = [];
  clienteFiltrado: any[] = [];
  clientesFiltrados: IClienteFiltrado[] = [];
  dataSource;
  index;
  @ViewChild('sort') sort: MatSort;
  @ViewChild('paginator') paginator: MatPaginator;
  displayedColumns: string[] = ['nombre', 'numeroServicios', 'dineroInvertido'];

  total = {
    totalClientes: 0,
    totalInvertido: 0,
    totalServicios: 0,
  }

  constructor(private service: TotalesClientesService, public dialog: MatDialog) { }

  ngOnInit() {

  

    this.service.obtenerDatos().subscribe(o => {
      this.limpiar();

      this.mapearObjetosArray(o.jornadas)
      console.log(this.boletas);
      
if(this.boletas.length > 0){
      this.procesarJornadas();

      this.dataSource = new MatTableDataSource<any>(this.clientesFiltrados);

      this.sort.direction = 'desc';
      this.sort.active = "dineroInvertido";

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }

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

  procesarJornadas() {
    for (var i in this.boletas) {

      if (this.clientesFiltrados.find(o => o.nombre === this.boletas[i].cliente.nombre)) {

        this.index = this.clientesFiltrados.findIndex(o => o.nombre === this.boletas[i].cliente.nombre)

        this.clientesFiltrados[this.index].dineroInvertido += this.boletas[i].montoCobrado;
        this.clientesFiltrados[this.index].numeroServicios += this.boletas[i].ordenes.length;

      } else {
        this.clientesFiltrados.push({ nombre: this.boletas[i].cliente.nombre, dineroInvertido: this.boletas[i].montoCobrado, numeroServicios: this.boletas[i].ordenes.length, idCliente:this.boletas[i].cliente.idCliente });

      }

    }

    this.total.totalClientes = this.clientesFiltrados.length;
    this.total.totalInvertido = this.clientesFiltrados.map(o => o.dineroInvertido).reduce((a, b) => a + b);
    this.total.totalServicios = this.clientesFiltrados.map(o => o.numeroServicios).reduce((a, b) => a + b)

  }

  modalDatosCliente(element) {

    this.dialog.open(ModalVerClienteComponent, {
      width: "700px",
      maxWidth: "700px",
      autoFocus: true,
      hasBackdrop: true,
      data: {
        cliente: element
      }

    });
  }

  modalServiciosCliente(nombre) {
    this.clienteFiltrado = [];

    for (var i in this.boletas) {

      if (nombre === this.boletas[i].cliente.nombre) {

        this.clienteFiltrado.push(this.boletas[i]);

      }
    }

    this.dialog.open(ModalVerClientesServiciosComponent, {
      width: "700px",
      maxWidth: "700px",
      autoFocus: true,
      hasBackdrop: true,
      data: {
        serviciosCliente: this.clienteFiltrado,
        cliente: nombre
      }

    });
  }



  limpiar() {
    this.total = {
      totalClientes: 0,
      totalInvertido: 0,
      totalServicios: 0,
    }
    this.clientesFiltrados = [];
    this.boletas = [];
    this.clienteFiltrado = [];
    this.index = 0;

  }
}
