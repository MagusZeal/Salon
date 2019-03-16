import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AdmClientesEditarService } from './adm-clientes-editar.service';
import { AdmClientesComponent } from 'src/app/adm-clientes/adm-clientes.component';
import { forbiddenNameValidator } from './validaciones';
@Component({
  selector: 'app-adm-clientes-editar',
  templateUrl: './adm-clientes-editar.component.html',
  styleUrls: ['./adm-clientes-editar.component.scss']
})
export class AdmClientesEditarComponent implements OnInit {
  clienteForm: FormGroup;
  clientes: any[] = [];
  dias: any[] = ["1", "2", "3", '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
  meses: any[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  clienteSeleccionado;

  constructor(private service: AdmClientesEditarService, private fb: FormBuilder, public dialogRef: MatDialogRef<AdmClientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.clientes = data.clientes,
      this.clienteSeleccionado = data.clienteSeleccionado

  }
  ngOnInit() {
    this.clientes = this.clientes.filter(o => o.nombre != this.clienteSeleccionado.nombre);
    console.log(this.clientes);


    this.clienteForm = this.fb.group({
      nombre: [this.clienteSeleccionado.nombre, [Validators.required, Validators.minLength(3), forbiddenNameValidator(this.clientes)]],
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

    if (this.clienteForm.valid == true) {

      if (!this.clienteForm.value.cumple.dia) {
        this.clienteForm.value.cumple.dia = "1"
      }

      if (!this.clienteForm.value.cumple.mes) {
        this.clienteForm.value.cumple.mes = "Enero"
      }

      await this.service.editarCliente(this.clienteForm.value, this.clienteSeleccionado.idCliente);
      this.dialogRef.close(true);

    }
  }


}
