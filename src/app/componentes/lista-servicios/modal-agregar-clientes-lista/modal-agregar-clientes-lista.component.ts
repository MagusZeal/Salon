import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalAgregarClientesListaService } from './modal-agregar-clientes-lista.service';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { forbiddenNameValidator } from './validaciones';
import { ListaServiciosComponent } from 'src/app/lista-servicios/lista-servicios.component';

@Component({
  selector: 'app-modal-agregar-clientes-lista',
  templateUrl: './modal-agregar-clientes-lista.component.html',
  styleUrls: ['./modal-agregar-clientes-lista.component.scss']
})
export class ModalAgregarClientesListaComponent implements OnInit {
  
  clientes: any[] = [];
  clienteForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(this.clientes)]],
    numero: [''],
    mail: [''],
    cumple: this.fb.group({
      dia: [''],
      mes: [''],
    }),
    nota: ['']
  })
  dias: any[] = ["1", "2", "3", '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
  meses: any[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  constructor(private service: ModalAgregarClientesListaService, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
  private snackBar: MatSnackBar, public dialogRef: MatDialogRef<ListaServiciosComponent>) {}

async ngOnInit() {

    this.mapearObjetosArray(await this.service.obtenerClientes());

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
   this.dialogRef.close();
    } else{
      this.openSnackBar("Lo sentimos! Verifique si el nombre es valido 🙅‍", "Ok");
    }
  }
  mapearObjetosArray(objeto) {

    for (let key in objeto) {

      let cliente = objeto[key];
      cliente['idCliente'] = key;
      this.clientes.push(cliente);
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });

}
}