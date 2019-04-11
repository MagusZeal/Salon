import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ModalVerClienteService } from './modal-ver-cliente.service';



@Component({
  selector: 'app-modal-ver-cliente',
  templateUrl: './modal-ver-cliente.component.html',
  styleUrls: ['./modal-ver-cliente.component.scss']
})
export class ModalVerClienteComponent implements OnInit {
  clientes: any[] = [];
  modalTitle: string;
  nombre: string;
  cliente: any[] = [];
  clienteFiltrado = [];
  check = false;
  checkError = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private service: ModalVerClienteService) {
    this.modalTitle = data.title;
    this.cliente = data.cliente;
    console.log(data)
  }


  async ngOnInit() {

    this.mapearObjetosArray(await this.service.obtenerClientes());

    if (this.cliente['idCliente']) {
      this.clienteFiltrado = this.clientes.find(o => o.idCliente == this.cliente['idCliente'])
      console.log(this.clienteFiltrado);
      this.check = true;

    } else if (this.clientes.find(o => o.idCliente == this.cliente['nombre'])) {
      this.clienteFiltrado = this.clienteFiltrado = this.clientes.find(o => o.idCliente == this.cliente['nombre'])
      this.check = true;
    } else {
      this.checkError = true;
    }




  }


  mapearObjetosArray(objeto) {

    for (let key in objeto) {

      let cliente = objeto[key];
      cliente['idCliente'] = key;
      this.clientes.push(cliente);
    }
  }




}
