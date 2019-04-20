import { Component, OnInit} from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
import { FormControl } from '@angular/forms';
import { TotalesService } from '../componentes/dashboard/totales/totales.service';
import { EspecificoTrabajadoraService } from '../componentes/dashboard/especifico-trabajadora/especifico-trabajadora.service';
import { UserService } from '../user.service';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tablaTotalesCheckbox: boolean = false;
  tablaSueldoCheckbox: boolean = false;
  fechaInicio: string;
  fechaTermino: string;
   trabajadoras: any[] = [];
  trabajadoraSeleccionada = 'TODAS LAS TRABAJADORAS';
  breakpoint: number;
  dpInicio = new FormControl(new Date());
  dpTermino = new FormControl(new Date());
  userId;
  floatLabel="always";
  nombreTrabajadora = new FormControl();

  constructor(private Dashboard: DashboardService, private service: TotalesService, private serviceTrabajadora: EspecificoTrabajadoraService, 
    public user : UserService, public afAuth: AngularFireAuth) { }

  seleccionarTrabajadora(event) {
    if (event.value) {
      this.trabajadoraSeleccionada = event.value.nombre;
    } else {
      this.trabajadoraSeleccionada = 'TODAS LAS TRABAJADORAS';
    }
    console.log(this.trabajadoraSeleccionada);

  }
  buscarDatosTrabajadora(nombre) {
   this.trabajadoraSeleccionada = nombre;
   this.buscar();

  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 2;
  }

  async ngOnInit() {

    history.pushState(null, null, document.URL);
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
   this.mapearTrabajadorasArray(await this.Dashboard.obtenerTrabajadoras());
  this.afAuth.authState.subscribe(user => {
 
    if(user) this.userId = user.uid


  })  
 

    
  }

  mapearTrabajadorasArray(objeto) {

    for (let key in objeto) {

      let trabajadora = objeto[key];
      trabajadora['idTrabajadora'] = key;
      this.trabajadoras.push(trabajadora);
    }
  }

  async buscar() {

    this.limpiar();

    this.fechaInicio = this.dpInicio.value.toLocaleString('es-CL').substring(6, 10) +
      this.dpInicio.value.toLocaleString('es-CL').substring(3, 5) +
      this.dpInicio.value.toLocaleString('es-CL').substring(0, 2);
    this.fechaTermino = this.dpTermino.value.toLocaleString('es-CL').substring(6, 10) +
      this.dpTermino.value.toLocaleString('es-CL').substring(3, 5) +
      this.dpTermino.value.toLocaleString('es-CL').substring(0, 2);

    if (this.trabajadoraSeleccionada == "TODAS LAS TRABAJADORAS") {
      this.tablaTotalesCheckbox = true;
      this.service.obtenerJornadas(this.fechaInicio, this.fechaTermino);

    } else {
      this.tablaSueldoCheckbox = true;
      this.serviceTrabajadora.obtenerJornadas(this.fechaInicio, this.fechaTermino, this.trabajadoraSeleccionada);
         }
  }

  limpiar() {
   
    this.tablaTotalesCheckbox = false;
    this.tablaSueldoCheckbox = false;
    
  }
}
