import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { TableSortingExampleService } from './table-sorting-example.service';
import { ModalVerClienteComponent } from '../dashboard-clientes/modal-ver-cliente/modal-ver-cliente.component';
import { ModalVerClientesServiciosComponent } from '../dashboard-clientes/modal-ver-clientes-servicios/modal-ver-clientes-servicios.component';

@Component({
  selector: 'app-table-sorting-example',
  templateUrl: './table-sorting-example.component.html',
  styleUrls: ['./table-sorting-example.component.scss']
})
export class TableSortingExampleComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'numeroServicios', 'dineroInvertido'];
  dataSource;
  clientes: any[] = [];
  boletas: any[] = [];
  clienteFiltrado: any[] = [];
  constructor(private servicio: TableSortingExampleService, public dialog: MatDialog) { }
  @ViewChild(MatSort) sort: MatSort;


  ngOnInit() {

    this.servicio.getDataObserver().subscribe(o => {
      this.dataSource = new MatTableDataSource(o.clientesFiltrados);
      this.dataSource.sort = this.sort;
      this.clientes = o.clientes;
      this.boletas = o.boletas;
    })
  }

  modalDatosCliente(nombre) {

    var a = this.clientes.find(o => o.nombre === nombre);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners',
      cliente: a
    };

    this.dialog.open(ModalVerClienteComponent, dialogConfig);


  }

  modalServiciosCliente(nombre) {

    const dialogConfig2 = new MatDialogConfig();
    for (var i in this.boletas) {

      if (nombre === this.boletas[i].cliente.nombre) {

        this.clienteFiltrado.push(this.boletas[i]);

      }
    }

   
    dialogConfig2.data = {
      id: 1,
      title: 'Angular For Beginners',
      serviciosCliente:this.clienteFiltrado
    };
    this.dialog.open(ModalVerClientesServiciosComponent, dialogConfig2);
  }




}
