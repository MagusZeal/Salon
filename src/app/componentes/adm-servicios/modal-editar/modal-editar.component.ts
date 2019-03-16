import { Component, OnInit, Inject } from '@angular/core';
import { ModalEditarService } from './modal-editar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdmServiciosComponent } from 'src/app/adm-servicios/adm-servicios.component';
import { forbiddenNameValidator } from './validaciones';
@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.component.html',
  styleUrls: ['./modal-editar.component.scss']
})
export class ModalEditarComponent implements OnInit {
  servicios: any[] = [];
  servicioSeleccionado;
  categorias: ICategoria[];
  servicioForm: FormGroup;
  constructor(private service: ModalEditarService, private fb: FormBuilder, public dialogRef: MatDialogRef<AdmServiciosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.servicios = data.servicios,
      this.servicioSeleccionado = data.servicioSeleccionado
  }

  ngOnInit() {

    this.servicios = this.servicios.filter(o=>o.descripcion != this.servicioSeleccionado.descripcion)
    this.service.obtenerCategorias().subscribe(o => this.categorias = o);
    this.servicioForm = this.fb.group({
      descripcion: [this.servicioSeleccionado.descripcion, [Validators.required, Validators.minLength(3), forbiddenNameValidator(this.servicios)]],
      valor: [this.servicioSeleccionado.valor, [Validators.required, Validators.min(999)]],
      categoria: [this.servicioSeleccionado.categoria, [Validators.required]]
    });
    console.log(this.servicioSeleccionado['idServicio']);

  }

 async onSubmit() {
    if (this.servicioForm.valid == true) {

     await this.service.editarServicio(this.servicioForm.value, this.servicioSeleccionado.idServicio);
      this.dialogRef.close(true);
    }
  }

}
