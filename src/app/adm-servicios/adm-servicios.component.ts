import { Component, OnInit } from '@angular/core';
import { AdmServiciosService } from '../adm-servicios/adm-servicios.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adm-servicios',
  templateUrl: './adm-servicios.component.html',
  styleUrls: ['./adm-servicios.component.scss']
})
export class AdmServiciosComponent implements OnInit {
  constructor(private AdmServicios:AdmServiciosService, private fb: FormBuilder) { }

servicioForm:FormGroup;
servicios:IServicio[]=[];
serviciosFiltrados:IServicio[]=[];
categorias: ICategoria[]=[];

  async ngOnInit() {
    this.servicios = await Object.values(await this.AdmServicios.obtenerServicios());
    this.categorias = await Object.values(await this.AdmServicios.obtenerCategorias());
    this.serviciosFiltrados = this.servicios;
    this.servicioForm = this.fb.group({
      descripcion:['', [Validators.required]],
      valor:['', [Validators.required]],
      categoria:this.fb.group({
        nombre:[''],
        id:['']
      
      }),
   
    })

  }

  async agregarServicios() {
  
    
console.log(this.servicioForm.value);

    }

  filtrarNombre(filtro: string){
console.log(filtro);

    this.serviciosFiltrados = this.servicios.filter(o=>o.descripcion.toLocaleLowerCase().includes(filtro.toLocaleLowerCase( )))

  }

  async borrarServicio(servicio){



await this.AdmServicios.eliminarServicio(servicio.descripcion);

  }

}
