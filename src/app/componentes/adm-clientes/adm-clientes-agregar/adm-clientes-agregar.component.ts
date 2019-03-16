import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdmClientesComponent } from 'src/app/adm-clientes/adm-clientes.component';
import { AdmClientesAgregarService } from './adm-clientes-agregar.service';
import { forbiddenNameValidator } from './validaciones'
@Component({
  selector: 'app-adm-clientes-agregar',
  templateUrl: './adm-clientes-agregar.component.html',
  styleUrls: ['./adm-clientes-agregar.component.scss']
})
export class AdmClientesAgregarComponent implements OnInit {
  clienteForm: FormGroup;
  clientes: any[] = [];
  dias: any[] = ["1", "2", "3", '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
  meses: any[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];


  constructor(private service: AdmClientesAgregarService, private fb: FormBuilder, public dialogRef: MatDialogRef<AdmClientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.clientes = data.clientes

  }

  ngOnInit() {

    
    this.clienteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(this.clientes)]],
      numero: [''],
      mail: [''],
      cumple: this.fb.group({
        dia: [''],
        mes: [''],
      }),
      nota: ['']
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

      await this.service.agregarCliente(this.clienteForm.value);
      this.dialogRef.close(true);

    }
  }

}
