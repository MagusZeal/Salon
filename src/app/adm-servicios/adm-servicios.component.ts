import { Component, OnInit } from '@angular/core';
import { AdmServiciosService } from '../adm-servicios/adm-servicios.service'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { forbiddenNameValidator } from './validaciones';
@Component({
  selector: 'app-adm-servicios',
  templateUrl: './adm-servicios.component.html',
  styleUrls: ['./adm-servicios.component.scss']
})
export class AdmServiciosComponent implements OnInit {
  constructor(private AdmServicios: AdmServiciosService, private fb: FormBuilder) { }

  servicioForm: FormGroup;
  editarServicioForm: FormGroup;
  servicios: IServicio[] = [];
  serviciosFiltrados: IServicio[] = [];
  categorias: ICategoria[] = [];
  serviciosX: IServicio[] = [];
  servicioSeleccionado;
  async ngOnInit() {
    this.servicios = [];

    await this.AdmServicios.obtenerServicios().subscribe(o => {

      this.mapearObjetosArray(o)

    });



    this.AdmServicios.obtenerCategorias().subscribe(o => this.categorias = o)
    this.serviciosFiltrados = this.servicios;
    this.servicioForm = this.fb.group({
      descripcion: ['', [Validators.required, Validators.minLength(2), forbiddenNameValidator(this.servicios)]],
      valor: ['', [Validators.required, Validators.min(99)]],
      categoria: ['Manicure', [Validators.required]]
    })


  }


  mapearObjetosArray(objeto) {

    for (let key in objeto) {

      let servicio = objeto[key];
      servicio['idServicio'] = key;
      this.servicios.push(servicio);
    }
  }

  async agregarServicios() {

    if (this.servicioForm.valid == true) {

      await this.AdmServicios.agregarServicio(this.servicioForm.value);
      document.getElementById("closeAgregar").click();
      this.ngOnInit();
    }
  }
  async editarServicio(servicio) {



    this.editarServicioForm = this.fb.group({
      descripcion: [servicio.descripcion, [Validators.required, Validators.minLength(2), forbiddenNameValidator(this.serviciosX)]],
      valor: [servicio.valor, [Validators.required, Validators.min(99)]],
      categoria: [servicio.categoria, [Validators.required]]
    })
    this.servicioSeleccionado = servicio;
    console.log(this.servicioSeleccionado);
    console.log(this.editarServicioForm.value);

    this.serviciosX = Object.assign([], this.servicios);

    var index = this.serviciosX.indexOf(servicio);
    if (index !== -1) this.serviciosX.splice(index, 1);



  }


  async editarServicioModificado() {
    console.log(this.editarServicioForm.value);
    console.log(this.editarServicioForm.valid);

    if (this.editarServicioForm.valid == true) {

      await this.AdmServicios.editarServicio(this.editarServicioForm.value, this.servicioSeleccionado.idServicio);
      document.getElementById("closeEditar").click();
      this.ngOnInit();

    }
  }
  filtrarNombre(filtro: string) {

    this.serviciosFiltrados = this.servicios.filter(o => o.descripcion.toLocaleLowerCase().includes(filtro.toLocaleLowerCase()))

  }

  async seleccionarServicioBorrar(servicio) {
    this.servicioSeleccionado = servicio;
  console.log(servicio);
  
  }


  async borrarServicio(servicio) {

     await this.AdmServicios.eliminarServicio(servicio.idServicio);
     document.getElementById("closeBorrar").click();
     this.ngOnInit();
  }
}
