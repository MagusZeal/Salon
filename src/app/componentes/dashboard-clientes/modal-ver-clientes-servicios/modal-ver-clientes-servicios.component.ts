import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-modal-ver-clientes-servicios',
  templateUrl: './modal-ver-clientes-servicios.component.html',
  styleUrls: ['./modal-ver-clientes-servicios.component.scss']
})
export class ModalVerClientesServiciosComponent {

  modalTitle: string;
  nombre: string;
  serviciosCliente: any[] = [];
  dataSource;
  displayedColumns: string[] = ['Servicio','Trabajadora','Precio','Fecha'];
  displayedColumns2: string[] = ['Servicio'];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.modalTitle = data.title;
    this.dataSource = new MatTableDataSource(data.serviciosCliente);
    this.serviciosCliente = data.serviciosCliente;
    console.log(data)
    console.log(this.dataSource);
    console.log(this.serviciosCliente);
    
    
  }


}
