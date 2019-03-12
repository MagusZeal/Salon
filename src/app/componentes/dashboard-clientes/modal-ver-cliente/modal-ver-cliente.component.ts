import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';



@Component({
  selector: 'app-modal-ver-cliente',
  templateUrl: './modal-ver-cliente.component.html',
  styleUrls: ['./modal-ver-cliente.component.scss']
})
export class ModalVerClienteComponent {

  modalTitle: string;
  nombre: string;
  cliente: any[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.modalTitle = data.title;
    this.cliente = data.cliente;
    console.log(data)
  }
}
