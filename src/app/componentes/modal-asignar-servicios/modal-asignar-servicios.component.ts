import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { AsignarServiciosService } from './asignar-servicios.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ListaServiciosComponent } from 'src/app/lista-servicios/lista-servicios.component';

@Component({
  selector: 'app-modal-asignar-servicios',
  templateUrl: './modal-asignar-servicios.component.html',
  styleUrls: ['./modal-asignar-servicios.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalAsignarServiciosComponent {
  trabajadoras: ITrabajadora[] = [];
  trabajadoraSeleccionada = [];
  servicios: IServicio[] = [];
  clienteFiltrado = '';
  clientes: ICliente[] = [];
  ordenes = [];
  nombresClientes: string[];
  filteredOptions: Observable<string[]>;
  options: string[] = ['One', 'Two', 'Three'];
  myControl = new FormControl();

  constructor(public dialogRef: MatDialogRef<ListaServiciosComponent>, private service: AsignarServiciosService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.servicios = data.servicios
  }

  async ngOnInit() {

    this.service.obtenerTrabajadoras().subscribe(o => {
      this.trabajadoras = Object.values(o);

    });

    this.clientes = await Object.values(await this.service.obtenerClientes());

    this.nombresClientes = this.clientes.map(o => o.nombre)

    console.log(this.nombresClientes);




    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.nombresClientes.filter(o => o.toLowerCase().includes(filterValue));
    
  }

  async asignarServicios() {

    const boleta: IBoleta = {
      cliente: this.filtrarCliente(this.myControl.value),
      total: this.ordenes.map(o => o.servicio.valor).reduce((a, b) => a + b),
      fecha: (new Date().toLocaleString('es-CL')).toString(),
      ordenes: this.ordenes
    };
    console.log(boleta);


    await this.service.agregarBoleta(boleta);
    this.dialogRef.close();
    document.getElementById('LinkCobros').click();

  }

  filtrarCliente(nombre): ICliente {

    return this.clientes.find(o => o.nombre.includes(nombre.trim()));
  }

  asignarServicioTrabajadora(servicio, i) {

    this.ordenes[i] = {
      'servicio': {
        descripcion: servicio.descripcion,
        categoria: servicio.categoria,
        valor: servicio.valor
      },
      'trabajadora': this.trabajadoraSeleccionada[i]
    };


  }
}
