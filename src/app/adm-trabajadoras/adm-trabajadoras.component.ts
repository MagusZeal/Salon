import { Component, OnInit } from '@angular/core';
import { AdmTrabajadorasService } from './adm-trabajadoras.service';

import { MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { log } from 'util';

@Component({
  selector: 'app-adm-trabajadoras',
  templateUrl: './adm-trabajadoras.component.html',
  styleUrls: ['./adm-trabajadoras.component.scss']
})
export class AdmTrabajadorasComponent implements OnInit {
  trabajadoras: any[] = [];
  trabajadoraSeleccionada;
  categorias: any[] = [];
  flag = false;
  nombre = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  sueldoBase = new FormControl('', [Validators.required, Validators.min(0)]);
  categoriasT: any[] = [];
  opciones = ['No Realiza', '0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60', '65', '70', '75', '80', '85', '90', '95', '100']

  constructor(private service: AdmTrabajadorasService, private snackBar: MatSnackBar, private user: UserService) {




  }

  mapearTrabajadorasArray(objeto) {

    for (let key in objeto) {

      let trabajadora = objeto[key];
      trabajadora['idTrabajadora'] = key;
      this.trabajadoras.push(trabajadora);
    }
  }

  buscar() {
    console.log(this.trabajadoraSeleccionada);
    console.log(this.categorias);
    this.flag = true;

    for (var i in this.categorias) {
      if (this.trabajadoraSeleccionada.categoriaTrabajadora.some(o => o.categoria == this.categorias[i].nombre) == false)
        this.trabajadoraSeleccionada.categoriaTrabajadora.push({ categoria: this.categorias[i].nombre, porcentaje: "No Realiza" })
    }

  }


  async modificarTrabajadora() {
    console.log(this.trabajadoraSeleccionada);
    if (this.trabajadoraSeleccionada.sueldoBase >= -1) {

      this.trabajadoraSeleccionada.categoriaTrabajadora = this.trabajadoraSeleccionada.categoriaTrabajadora.filter(o => o.porcentaje != "No Realiza");
      this.flag = false;
      this.openSnackBar("Trabajadora Modificada 👍🏻", "Ok");
      var id = this.trabajadoraSeleccionada.idTrabajadora;
      delete this.trabajadoraSeleccionada.idTrabajadora;
      console.log(this.trabajadoraSeleccionada);

      await this.service.editarTrabajadora(this.trabajadoraSeleccionada, id);
    } else {
      this.openSnackBar("Lo sentimos! Sueldo Base inaceptable 🙅‍", "Ok");
    }
    console.log(this.trabajadoraSeleccionada);

  }

  agregarTrabajadora() {
    if (this.nombre.valid && this.sueldoBase.valid && this.password.valid && this.email) {
      this.categoriasT = this.categoriasT.filter(o => o.porcentaje != "No Realiza");
      this.openSnackBar("Valido", "Ok");
      console.log(this.categoriasT);
      var trabajadora = {
        nombre: this.nombre.value,
        sueldoBase: this.sueldoBase.value,
        categoriaTrabajadora: this.categoriasT
      }
      this.user.singup(this.email.value, this.password.value, trabajadora);


    }
  }

  ngOnInit() {

    this.service.obtenerTrabajadoras().subscribe(o => {
      this.mapearTrabajadorasArray(o)
    })
    this.service.obtenerCategorias().subscribe(o => {
      this.categorias = o;
      for (var i in this.categorias) {
        console.log(this.categorias[i]);

        this.categoriasT.push({ categoria: this.categorias[i].nombre, porcentaje: "No Realiza" })
      }
    })

    console.log(this.categoriasT);

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

}
