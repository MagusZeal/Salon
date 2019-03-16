import { Component, OnInit, ViewChild } from '@angular/core';
import { AdmClientesService } from '../adm-clientes/adm-clientes.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AdmClientesAgregarComponent } from '../componentes/adm-clientes/adm-clientes-agregar/adm-clientes-agregar.component';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { AdmClientesEditarComponent } from '../componentes/adm-clientes/adm-clientes-editar/adm-clientes-editar.component';
import { AdmClientesBorrarComponent } from '../componentes/adm-clientes/adm-clientes-borrar/adm-clientes-borrar.component';


@Component({
  selector: 'app-adm-clientes',
  templateUrl: './adm-clientes.component.html',
  styleUrls: ['./adm-clientes.component.scss']
})
export class AdmClientesComponent implements OnInit {
  clienteForm: FormGroup;
  clientes: ICliente[] = [];
  customCollapsedHeight;
  customExpandedHeight;
  dataSource;
  displayedColumns: string[] = ['nombre', 'editar', 'borrar'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private AdmClientes: AdmClientesService, public dialog: MatDialog) { }

  async ngOnInit() {
    this.clientes = [];

    this.dataSource = [];



    this.mapearObjetosArray(await this.AdmClientes.obtenerClientes());


    this.dataSource = new MatTableDataSource<any>(this.clientes);
    this.dataSource.paginator = this.paginator;

    this.customCollapsedHeight = (window.innerWidth <= 400) ? '100px' : '40px';
    this.customExpandedHeight = (window.innerWidth <= 400) ? '100px' : '40px';

    console.log(this.clientes);

  }

  applyFilter(filterValue: string) {
    console.log(this.dataSource);

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onResize(event) {

    this.customCollapsedHeight = (event.target.innerWidth <= 400) ? '100px' : '40px';
    this.customExpandedHeight = (event.target.innerWidth <= 400) ? '100px' : '40px';
  }



  mapearObjetosArray(objeto) {

    for (let key in objeto) {

      let cliente = objeto[key];
      cliente['idCliente'] = key;
      this.clientes.push(cliente);
    }
  }


  modalAgregarCliente() {

    const dialogRef = this.dialog.open(AdmClientesAgregarComponent, {
      width: "600px",
      maxWidth: "600px",
      autoFocus: true,
      hasBackdrop: true,
      data: { clientes: this.clientes }

    });

    dialogRef.afterClosed().subscribe(o => {
      console.log(o);

      if (o == true) {
        this.ngOnInit();
      }
    });

  }

  modalEditarCliente(cliente) {

    const dialogRef = this.dialog.open(AdmClientesEditarComponent, {
      width: "600px",
      maxWidth: "600px",
      autoFocus: true,
      hasBackdrop: true,
      data: {
        clientes: this.clientes,
        clienteSeleccionado: cliente
      }

    });

    dialogRef.afterClosed().subscribe(o => {
      console.log(o);

      if (o == true) {
        this.ngOnInit();
      }
    });

  }

  modalBorrarCliente(cliente) {

    const dialogRef = this.dialog.open(AdmClientesBorrarComponent, {
      width: "600px",
      maxWidth: "600px",
      autoFocus: true,
      hasBackdrop: true,
      data: {
        clientes: this.clientes,
        clienteSeleccionado: cliente
      }

    });

    dialogRef.afterClosed().subscribe(o => {
      console.log(o);

      if (o == true) {
        this.ngOnInit();
      }
    });

  }


}
