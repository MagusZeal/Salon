import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-modal-ver-clientes-servicios',
  templateUrl: './modal-ver-clientes-servicios.component.html',
  styleUrls: ['./modal-ver-clientes-servicios.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ModalVerClientesServiciosComponent {

 
  dataSource;
  cliente: string;
  columnsToDisplay: string[] = ['fecha' , 'montoCobrado'];
 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  
    this.dataSource = new MatTableDataSource(data.serviciosCliente);
 
this.cliente = data.cliente;
 
    
  }


}
