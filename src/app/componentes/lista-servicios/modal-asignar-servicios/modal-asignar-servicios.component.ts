import { Component, OnInit, Inject } from '@angular/core';
import { AsignarServiciosService } from './asignar-servicios.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ListaServiciosComponent } from 'src/app/lista-servicios/lista-servicios.component';
import { forbiddenNameValidator } from './validaciones';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-modal-asignar-servicios',
  templateUrl: './modal-asignar-servicios.component.html',
  styleUrls: ['./modal-asignar-servicios.component.scss']
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
  myControl = new FormControl('', [Validators.required, forbiddenNameValidator(this.clientes)]);
  dpReserva = new FormControl(new Date(), [Validators.required]);
  horaReserva = new FormControl('', [Validators.required]);
  minutoReserva = new FormControl('', [Validators.required]);
  userId;
  horas = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];
  minutos = ['00', '15', '30', '45'];
  reservaHora = false;
  constructor(public dialogRef: MatDialogRef<ListaServiciosComponent>, private service: AsignarServiciosService,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar, public afAuth: AngularFireAuth) {
    this.servicios = data.servicios
  }

  async ngOnInit() {

    this.service.obtenerTrabajadoras().subscribe(o => {
      this.mapearTrabajadorasArray(o);

    });
    this.mapearClientesArray(await this.service.obtenerClientes());
    this.nombresClientes = this.clientes.map(o => o.nombre)
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.afAuth.authState.subscribe(user => {

      if (user) this.userId = user.uid


    })
  }

  mapearTrabajadorasArray(objeto) {

    for (let key in objeto) {


      let boleta = objeto[key];
      boleta['idTrabajadora'] = key;
      this.trabajadoras.push(boleta);
    }
  }

  mapearClientesArray(objeto) {

    for (let key in objeto) {


      let boleta = objeto[key];
      boleta['idCliente'] = key;
      this.clientes.push(boleta);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.nombresClientes.filter(o => o.toLowerCase().includes(filterValue));

  }

  async asignarServicios(botonDeshabilitado) {
    botonDeshabilitado.disabled = true;

    if (this.ordenes.length == this.servicios.length && this.myControl.valid && this.ordenes.findIndex(o => o == undefined) == -1) {



      if (this.reservaHora == true) {

        if (this.dpReserva.valid && this.horaReserva.valid && this.minutoReserva.valid) {
          const boleta = {
            cliente: this.filtrarCliente(this.myControl.value),
            total: this.ordenes.map(o => o.servicio.valor).reduce((a, b) => a + b),
            fecha: (this.dpReserva.value.toLocaleString('es-CL').substring(0, 11) + this.horaReserva.value + ':' + this.minutoReserva.value + ':' + '01'),
            ordenes: this.ordenes,
            horaReservada: this.reservaHora,
            hora: this.horaReserva.value,
            minuto: this.minutoReserva.value,
            idUsuario:this.userId
          };
          await this.service.agregarBoleta(boleta);
          this.dialogRef.close();
          document.getElementById('LinkCobros').click();
        } else {
          this.openSnackBar("Error! Debe asignar Fecha Reserva, hora y minutos validos ✋🏻", "Ok");
          botonDeshabilitado.disabled = false;
        }

      } else {
        const boleta = {
          cliente: this.filtrarCliente(this.myControl.value),
          total: this.ordenes.map(o => o.servicio.valor).reduce((a, b) => a + b),
          fecha: (new Date().toLocaleString('es-CL')).toString(),
          ordenes: this.ordenes,
          idUsuario: this.userId

        };
        await this.service.agregarBoleta(boleta);
        this.dialogRef.close();
        document.getElementById('LinkCobros').click();
      }
    } else {
      this.openSnackBar("Error! Debe asignar trabajadora/s y cliente primero ✋🏻", "Ok");
      botonDeshabilitado.disabled = false;
    }


  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  filtrarCliente(nombre): ICliente {

    return this.clientes.find(o => o.nombre.includes(nombre.trim()));
  }

  asignarServicioTrabajadora(servicio, i) {

    this.ordenes[i] = {
      'servicio': {
        descripcion: servicio.descripcion,
        categoria: servicio.categoria,
        valor: servicio.valor,
        idServicio: servicio.idServicio
      },
      'trabajadora': this.trabajadoraSeleccionada[i]
    };


  }
}
