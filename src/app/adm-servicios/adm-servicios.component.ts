import { Component, OnInit } from '@angular/core';
import { AdmServiciosService } from '../adm-servicios/adm-servicios.service'
import { FormBuilder, FormGroup, Validators, 	AbstractControl } from '@angular/forms';
import { forbiddenNameValidator } from './validaciones';
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
    this.AdmServicios.obtenerCategorias().subscribe(o=>this.categorias = o)
    this.serviciosFiltrados = this.servicios;
    this.servicioForm = this.fb.group({
      descripcion:['', [Validators.required, Validators.minLength(2),forbiddenNameValidator(this.servicios) ]],
      valor:['', [Validators.required, Validators.min(99) ]],
      categoria:['Manicure',[Validators.required]]
            })

   
    
   
    
  }

  async agregarServicios() {
  
    if(this.servicioForm.valid == true){
      await this.AdmServicios.agregarServicio(this.servicioForm.value);
      this.ngOnInit();
    }
  
}

  filtrarNombre(filtro: string){
console.log(filtro);

    this.serviciosFiltrados = this.servicios.filter(o=>o.descripcion.toLocaleLowerCase().includes(filtro.toLocaleLowerCase( )))

  }

  async borrarServicio(servicio){



await this.AdmServicios.eliminarServicio(servicio.descripcion);

  }

}
