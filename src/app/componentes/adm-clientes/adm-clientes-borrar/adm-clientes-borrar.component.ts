import { Component, OnInit, Inject } from '@angular/core';
import { AdmClientesBorrarService } from './adm-clientes-borrar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdmClientesComponent } from 'src/app/adm-clientes/adm-clientes.component';

@Component({
  selector: 'app-adm-clientes-borrar',
  templateUrl: './adm-clientes-borrar.component.html',
  styleUrls: ['./adm-clientes-borrar.component.scss']
})
export class AdmClientesBorrarComponent implements OnInit {
  clienteForm: FormGroup;
  clientes: any[] = [];
  clienteSeleccionado;
  dias: any[] = ["1", "2", "3", '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
  meses: any[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  constructor(private service: AdmClientesBorrarService, private fb: FormBuilder, public dialogRef: MatDialogRef<AdmClientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.clientes = data.clientes,
      this.clienteSeleccionado = data.clienteSeleccionado
  }

  ngOnInit() {
    this.clienteForm = this.fb.group({
      nombre: [this.clienteSeleccionado.nombre, [Validators.required, Validators.minLength(3)]],
      numero: [this.clienteSeleccionado.numero],
      mail: [this.clienteSeleccionado.mail],
      cumple: this.fb.group({
        dia: [this.clienteSeleccionado.cumple.dia],
        mes: [this.clienteSeleccionado.cumple.mes],
      }),
      nota: [this.clienteSeleccionado.nota]
    })
  }

  async onSubmit() {
      await this.service.eliminarCliente(this.clienteSeleccionado.idCliente);
    this.dialogRef.close(true);

  }


}
