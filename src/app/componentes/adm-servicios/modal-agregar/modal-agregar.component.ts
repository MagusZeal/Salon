import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AdmServiciosComponent } from 'src/app/adm-servicios/adm-servicios.component';
import { ModalAgregarService } from './modal-agregar.service';
import { forbiddenNameValidator } from './validaciones';

@Component({
  selector: 'app-modal-agregar',
  templateUrl: './modal-agregar.component.html',
  styleUrls: ['./modal-agregar.component.scss']
})
export class ModalAgregarComponent implements OnInit {
  categorias: IBoleta[];
  servicios: any[]= [];
  servicioForm: FormGroup;


  constructor(private service: ModalAgregarService,private fb: FormBuilder, public dialogRef: MatDialogRef<AdmServiciosComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.servicios = data.servicios;
  }


ngOnInit(){
  this.service.obtenerCategorias().subscribe(o => this.categorias = o);
  this.servicioForm = this.fb.group({
    descripcion: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(this.servicios)]],
    valor: [null, [Validators.required, Validators.min(999)]],
    categoria: [null, [Validators.required]]
  });
}

 async onSubmit(botonDeshabilitado) {
  botonDeshabilitado.disabled = true;
    if (this.servicioForm.valid == true) {

await this.service.agregarServicio(this.servicioForm.value);
 this.dialogRef.close(true);
    } else{
      botonDeshabilitado.disabled = false;
    }



  }



}
